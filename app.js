// app.js - main application logic
// Keeps behavior same as original but cleaned, accessible and configurable.

const PRODUCTS = [
    {
        id: 'standart',
        name: 'Standart',
        size: '90×90×200 cm',
        icon: '🚿',
        dimsCm: { w: 90, d: 90, h: 200 },
        // Replace these placeholders with your optimized local model files.
        glb: 'models/standart.glb',
        usdz: 'models/standart.usdz'
    },
    {
        id: 'kose',
        name: 'Köşe',
        size: '80×120×200 cm',
        icon: '📐',
        dimsCm: { w: 80, d: 120, h: 200 },
        glb: 'models/kose.glb',
        usdz: 'models/kose.usdz'
    },
    {
        id: 'rayli',
        name: 'Raylı',
        size: '100×100×200 cm',
        icon: '🚪',
        dimsCm: { w: 100, d: 100, h: 200 },
        glb: 'models/rayli.glb',
        usdz: 'models/rayli.usdz'
    },
    {
        id: 'kuvetli',
        name: 'Küvetli',
        size: '120×80×150 cm',
        icon: '🛁',
        dimsCm: { w: 120, d: 80, h: 150 },
        glb: 'models/kuvetli.glb',
        usdz: 'models/kuvetli.usdz'
    }
];

const mv = document.getElementById('mv');
const list = document.getElementById('productList');
const hint = document.getElementById('hint');
const statusEl = document.getElementById('status');
const arBtn = document.getElementById('arBtn');
const resetBtn = document.getElementById('resetBtn');
const infoBtn = document.getElementById('infoBtn');
const iosArLink = document.getElementById('iosArLink');
const iosArImg = document.getElementById('iosArImg');
const iosSafariBanner = document.getElementById('iosSafariBanner');
const copyLinkBtn = document.getElementById('copyLinkBtn');
const howSafariBtn = document.getElementById('howSafariBtn');

let activeId = null;

function setStatus(text) { statusEl.textContent = text || ''; }
function setHint(text) { hint.textContent = text || ''; }

function isIOS() { return /iPad|iPhone|iPod/.test(navigator.userAgent); }
function isSafariOnIOS() {
    const ua = navigator.userAgent;
    const isAppleWebKit = /AppleWebKit/i.test(ua);
    const isSafari = /Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS|DuckDuckGo|Brave/i.test(ua);
    return isAppleWebKit && isSafari;
}

async function copyText(text) {
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch (e) {}
    try { window.prompt('Linki kopyalamak için seçip kopyalayın:', text); } catch (e) {}
    return false;
}

function renderList() {
    list.innerHTML = '';
    for (const p of PRODUCTS) {
        const el = document.createElement('div');
        el.className = 'card' + (p.id === activeId ? ' active' : '');
        el.dataset.id = p.id;
        el.tabIndex = 0;
        el.setAttribute('role', 'button');
        el.innerHTML = `
            <div class="icon">${p.icon}</div>
            <div class="meta">
                <b>${p.name}</b>
                <span>${p.size}</span>
            </div>
        `;
        el.addEventListener('click', () => selectProduct(p.id));
        el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') selectProduct(p.id); });
        list.appendChild(el);
    }
}

function selectProduct(id) {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    activeId = id;
    renderList();

    // Use local model paths; if missing, user will add real GLB/USDZ into /models/
    mv.src = p.glb;
    mv.setAttribute('ios-src', p.usdz);
    mv.alt = `${p.name} duşakabin`;

    iosArLink.href = p.usdz;
    iosArImg.src = p.usdz;
    setStatus('');

    if (p.dimsCm) setStatus(`Seçili ölçü: ${p.dimsCm.w}×${p.dimsCm.d}×${p.dimsCm.h} cm`);

    if (isIOS()) {
        if (isSafariOnIOS()) {
            setHint('iPhone: AR butonuna basınca Quick Look açılacak.');
            iosSafariBanner.style.display = 'none';
            arBtn.disabled = false;
            arBtn.style.opacity = '1';
        } else {
            setHint('iPhone: AR için Safari önerilir.');
            iosSafariBanner.style.display = 'block';
            arBtn.disabled = true;
            arBtn.style.opacity = '.6';
            setStatus('Safari’de açınca AR çalışır.');
        }
    } else {
        setHint('Android: AR butonuna basınca Scene Viewer açılacak.');
        iosSafariBanner.style.display = 'none';
        arBtn.disabled = false;
        arBtn.style.opacity = '1';
    }
}

copyLinkBtn?.addEventListener('click', async () => {
    await copyText(location.href);
    setStatus('Link kopyalandı. Safari’ye yapıştırıp açabilirsiniz.');
});

howSafariBtn?.addEventListener('click', () => {
    alert('Safari’de açmak için:\n\n1) Paylaş (kare+ok) simgesine basın\n2) "Safari’de Aç" seçin\n\nEğer seçenek yoksa linki kopyalayıp Safari’ye yapıştırın.');
});

function openAndroidSceneViewer(glbUrl) {
    const file = encodeURIComponent(glbUrl);
    const intentUrl = `intent://arvr.google.com/scene-viewer/1.0?file=${file}&mode=ar_preferred#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(location.href)};end;`;
    window.location.href = intentUrl;
}

function openIOSQuickLook() { iosArLink.click(); }

arBtn.addEventListener('click', async () => {
    const p = PRODUCTS.find(x => x.id === activeId);
    if (!p) { setStatus('Lütfen bir model seçin.'); return; }
    setStatus('AR açılıyor...');
    if (typeof mv.activateAR === 'function') {
        try { await mv.activateAR(); setStatus(''); return; } catch (e) {}
    }
    if (isIOS()) { setStatus('iPhone: Quick Look açılıyor...'); openIOSQuickLook(); return; }
    setStatus('Android: Scene Viewer açılıyor...'); openAndroidSceneViewer(p.glb);
});

resetBtn.addEventListener('click', () => {
    try { mv.resetTurntableRotation?.(); mv.jumpCameraToGoal?.(); } catch (e) {}
});

infoBtn.addEventListener('click', () => {
    const p = PRODUCTS.find(x => x.id === activeId);
    if (!p) return;
    const dims = p.dimsCm ? `${p.dimsCm.w}×${p.dimsCm.d}×${p.dimsCm.h} cm` : p.size;
    alert(`${p.name}\nÖlçü: ${dims}\n\nGerçek 1:1 AR için lütfen optimize edilmiş GLB & USDZ modellerinizi /models klasörüne ekleyin.`);
});

// Init
selectProduct(PRODUCTS[0].id);
