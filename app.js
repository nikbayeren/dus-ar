// Clean, minimal app.js for the rebuilt Duşakabin AR demo
const GITHUB_RAW = 'https://raw.githubusercontent.com/nikbayeren/dus-ar/main';
const PRODUCTS = [
  { id: 'kabina-6-90', name: 'Kabina 6-90', icon: '🚿', size: '90×90×200 cm', glb: GITHUB_RAW + '/models/kabina-polokragla-geo-6-90.glb', usdz: GITHUB_RAW + '/models/kabina-polokragla-geo-6-90.usdz' }
];

const mv = document.getElementById('mv');
const productList = document.getElementById('productList');
const statusEl = document.getElementById('status');
const arBtn = document.getElementById('arBtn');
const resetBtn = document.getElementById('resetBtn');
const infoBtn = document.getElementById('infoBtn');
const iosArLink = document.getElementById('iosArLink');

let active = null;

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
  
  // Set model source (model-viewer will handle AR modes automatically)
  mv.src = p.glb;
  if (p.usdz) mv.setAttribute('ios-src', p.usdz);
  mv.setAttribute('model-scale', '100% 100% 100%');
  mv.alt = p.name;
  
  setStatus(`Seçili: ${p.name} — ${p.size}`);
  arBtn.disabled = false; 
  arBtn.focus();
}

arBtn.addEventListener('click', async () => {
  if (!active) { setStatus('Lütfen soldan bir model seçin.'); return; }
  setStatus('AR açılıyor...');
  
  try {
    // Try model-viewer's native AR (works on iOS 15+ and Android)
    if (mv.canActivateAR && await mv.canActivateAR()) {
      await mv.activateAR();
      setStatus('');
      return;
    }
  } catch (e) {
    console.warn('WebXR AR failed:', e);
  }
  
  // Fallback for iOS: use Quick Look
  if (isIOS()) {
    const p = PRODUCTS.find(x => x.id === active);
    if (!p) return;
    
    // Try both USDZ (preferred) and GLB
    const modelUrl = p.usdz || p.glb;
    const fileUrl = new URL(modelUrl, 'https://raw.githubusercontent.com/nikbayeren/dus-ar/main').href;
    
    // Create and trigger download link (which iOS will open in Quick Look)
    const link = document.createElement('a');
    link.rel = 'ar';
    link.href = fileUrl;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => document.body.removeChild(link), 100);
    setStatus('');
    return;
  }
  
  // Fallback for Android: Scene Viewer intent
  const p = PRODUCTS.find(x => x.id === active);
  if (p) {
    const fileUrl = new URL(p.glb, 'https://raw.githubusercontent.com/nikbayeren/dus-ar/main').href;
    const file = encodeURIComponent(fileUrl);
    window.location.href = `intent://arvr.google.com/scene-viewer/1.0?file=${file}&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;end;`;
  }
});

resetBtn.addEventListener('click', () => { try { mv.jumpCameraToGoal?.(); } catch (e) { } });
infoBtn.addEventListener('click', () => { const p = PRODUCTS.find(x => x.id === active); if (p) alert(`${p.name}\nÖlçü: ${p.size}`); });

// init
select(PRODUCTS[0].id);
