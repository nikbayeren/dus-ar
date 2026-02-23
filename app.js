// Clean, minimal app.js for the rebuilt Duşakabin AR demo
const PRODUCTS = [
  { id: 'standart', name: 'Standart', icon: '🚿', size: '90×90×200 cm', glb: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', usdz: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz' },
  { id: 'kose', name: 'Köşe', icon: '📐', size: '80×120×200 cm', glb: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.glb', usdz: 'https://modelviewer.dev/shared-assets/models/RobotExpressive.usdz' },
  { id: 'rayli', name: 'Raylı', icon: '🚪', size: '100×100×200 cm', glb: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb', usdz: 'https://modelviewer.dev/shared-assets/models/Astronaut.usdz' }
];

const mv = document.getElementById('mv');
const productList = document.getElementById('productList');
const statusEl = document.getElementById('status');
const arBtn = document.getElementById('arBtn');
const resetBtn = document.getElementById('resetBtn');
const infoBtn = document.getElementById('infoBtn');
const iosArLink = document.getElementById('iosArLink');

let active = null;

function setStatus(text){ if(statusEl) statusEl.textContent = text || ''; }

function isIOS(){ return /iPad|iPhone|iPod/.test(navigator.userAgent); }

function render(){
  productList.innerHTML = '';
  for(const p of PRODUCTS){
    const el = document.createElement('div');
    el.className = 'product'+(active===p.id?' active':'');
    el.tabIndex = 0;
    el.innerHTML = `<div class="icon">${p.icon}</div><div class="meta"><b>${p.name}</b><small>${p.size}</small></div>`;
    el.addEventListener('click', ()=>select(p.id));
    el.addEventListener('keydown', e=>{ if(e.key==='Enter') select(p.id); });
    productList.appendChild(el);
  }
}

function select(id){
  const p = PRODUCTS.find(x=>x.id===id); if(!p) return;
  active = id; render();
  mv.src = p.glb; mv.setAttribute('ios-src', p.usdz); mv.alt = p.name;
  iosArLink.href = p.usdz; setStatus(`Seçili: ${p.name} — ${p.size}`);
  arBtn.disabled = false; arBtn.focus();
}

arBtn.addEventListener('click', async ()=>{
  if(!active){ setStatus('Lütfen soldan bir model seçin.'); return; }
  setStatus('AR açılıyor...');
  try{ if(typeof mv.activateAR==='function'){ await mv.activateAR(); setStatus(''); return; } }catch(e){}
  if(isIOS()){ iosArLink.click(); return; }
  const p = PRODUCTS.find(x=>x.id===active); if(p){
    const file = encodeURIComponent(p.glb);
    window.location.href = `intent://arvr.google.com/scene-viewer/1.0?file=${file}&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;end;`;
  }
});

resetBtn.addEventListener('click', ()=>{ try{ mv.jumpCameraToGoal?.(); }catch(e){} });
infoBtn.addEventListener('click', ()=>{ const p = PRODUCTS.find(x=>x.id===active); if(p) alert(`${p.name}\nÖlçü: ${p.size}`); });

// init
select(PRODUCTS[0].id);
