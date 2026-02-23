// Clean, minimal app.js for the rebuilt Duşakabin AR demo
const PRODUCTS = [
  { id: 'kabina-6-90', name: 'Kabina 6-90', icon: '🚿', size: '90×90×200 cm', glb: 'models/kabina-polokragla-geo-6-90.glb', usdz: 'models/kabina-polokragla-geo-6-90.usdz' }
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
  const p = PRODUCTS.find(x => x.id === id); if (!p) return;
  active = id; render();
  mv.src = p.glb; 
  mv.setAttribute('ios-src', p.usdz); 
  mv.setAttribute('model-scale', '100% 100% 100%');
  mv.alt = p.name;
  iosArLink.href = p.usdz; 
  setStatus(`Seçili: ${p.name} — ${p.size}`);
  arBtn.disabled = false; 
  arBtn.focus();
}

arBtn.addEventListener('click', async () => {
  if (!active) { setStatus('Lütfen soldan bir model seçin.'); return; }
  setStatus('AR açılıyor...');
  
  // Try WebXR first (if available)
  try { 
    if (typeof mv.activateAR === 'function') { 
      await mv.activateAR(); 
      setStatus(''); 
      return; 
    } 
  } catch (e) { 
    console.warn('WebXR failed:', e);
  }
  
  const p = PRODUCTS.find(x => x.id === active); 
  if (!p) return;
  
  if (isIOS()) {
    // iOS: Quick Look (requires USDZ or glb with scale hints)
    const fileUrl = new URL(p.usdz || p.glb, location.href).href;
    const link = document.createElement('a');
    link.rel = 'ar';
    link.href = fileUrl;
    // Trigger the link programmatically
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setStatus('');
  } else {
    // Android: Scene Viewer intent
    const fileUrl = new URL(p.glb, location.href).href;
    const file = encodeURIComponent(fileUrl);
    // Scene Viewer intent: file, mode, and model-scale
    const intent = `intent://arvr.google.com/scene-viewer/1.0?file=${file}&mode=ar_preferred&model-scale=1.0#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;end;`;
    window.location.href = intent;
  }
});

resetBtn.addEventListener('click', () => { try { mv.jumpCameraToGoal?.(); } catch (e) { } });
infoBtn.addEventListener('click', () => { const p = PRODUCTS.find(x => x.id === active); if (p) alert(`${p.name}\nÖlçü: ${p.size}`); });

// init
select(PRODUCTS[0].id);
