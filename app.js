// Clean, minimal app.js for the rebuilt Duşakabin AR demo
const GITHUB_RAW = 'https://raw.githubusercontent.com/nikbayeren/dus-ar/main';
const PRODUCTS = [
  { id: 'kabina-6-90', name: 'Kabina 6-90', icon: '🚿', size: '90×90×200 cm', glb: GITHUB_RAW + '/models/kabina-polokragla-geo-6-90.glb', usdz: GITHUB_RAW + '/models/kabina-polokragla-geo-6-90.usdz' }
];

const mv = document.getElementById('mv');
const productList = document.getElementById('productList');
const statusEl = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const infoBtn = document.getElementById('infoBtn');

let active = null;

// Ensure buttons exist before adding listeners
if (!resetBtn || !infoBtn) {
  console.error('ERROR: Button elements not found in DOM!');
}

function setStatus(text) { if (statusEl) statusEl.textContent = text || ''; }

function isIOS() { return /iPad|iPhone|iPod/.test(navigator.userAgent); }

function render() {
  productList.innerHTML = '';
  for (const p of PRODUCTS) {
    const el = document.createElement('div');
    el.className = 'product' + (active === p.id ? ' active' : '');
    el.tabIndex = 0;
    el.innerHTML = `<div class="icon">${p.icon}</div><div class="meta"><b>${p.name}</b><small>${p.size}</small></div>`;
    el.addEventListener('click', () => select(p.id));
    el.addEventListener('keydown', e => { if (e.key === 'Enter') select(p.id); });
    productList.appendChild(el);
  }
}

function select(id) {
  const p = PRODUCTS.find(x => x.id === id); 
  if (!p) return;
  
  active = id; 
  render();
  
  // Set model source
  mv.src = p.glb;
  if (p.usdz) mv.setAttribute('ios-src', p.usdz);
  mv.setAttribute('model-scale', '100% 100% 100%');
  mv.alt = p.name;
  
  setStatus(`Seçili: ${p.name} — ${p.size}`);
}

// Attach event listeners only if buttons exist

if (resetBtn) {
  resetBtn.addEventListener('click', (e) => { 
    e.preventDefault();
    try { if (mv) mv.jumpCameraToGoal?.(); } catch (error) { } 
  });
}

if (infoBtn) {
  infoBtn.addEventListener('click', (e) => { 
    e.preventDefault();
    const p = PRODUCTS.find(x => x.id === active); 
    if (p) alert(`${p.name}\nÖlçü: ${p.size}`); 
  });
}

// Debug: Log element status
console.log('Elements loaded:', { 
  mv: !!mv, 
  arBtn: !!arBtn, 
  resetBtn: !!resetBtn, 
  infoBtn: !!infoBtn, 
  productList: !!productList, 
  statusEl: !!statusEl 
});

// Init
select(PRODUCTS[0].id);
