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

// Ensure buttons exist before adding listeners
if (!arBtn || !resetBtn || !infoBtn) {
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
  
  // Enable AR button
  if (arBtn) {
    arBtn.disabled = false;
    arBtn.classList.remove('disabled');
    arBtn.focus();
  }
  
  // Auto-activate AR for iOS on model load
  if (isIOS() && mv) {
    const loadHandler = async () => {
      try {
        if (mv.canActivateAR && await mv.canActivateAR()) {
          await mv.activateAR();
        }
      } catch (e) {
        console.warn('Auto AR activation failed:', e);
      }
      mv.removeEventListener('load', loadHandler);
    };
    mv.addEventListener('load', loadHandler);
  }
}

// Attach event listeners only if buttons exist
if (arBtn) {
  arBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    if (!active) { setStatus('Lütfen soldan bir model seçin.'); return; }
    
    try {
      // First priority: Try model-viewer's native WebXR/AR (works on iOS Safari 15+ and Android Chrome)
      if (mv && typeof mv.canActivateAR === 'function') {
        const canAR = await mv.canActivateAR();
        if (canAR) {
          setStatus('AR açılıyor...');
          await mv.activateAR();
          setStatus('');
          return;
        }
      }
    } catch (err) {
      console.warn('WebXR activation failed:', err);
    }
    
    // Fallback: Show message for mobile testing
    if (isIOS()) {
      setStatus('⚠️ iOS AR Safari 15+ gerekli. Lütfen cihazda deneyiniz.');
    } else {
      setStatus('⚠️ Android AR için Chrome uygulaması ve Google Play Services gerekli.');
      // Try to open Play Store for Google Play Services
      setTimeout(() => {
        const androidUrl = 'https://play.google.com/store/apps/details?id=com.google.android.googlequicksearchbox';
        window.open(androidUrl, '_blank');
      }, 500);
    }
  });
}

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
