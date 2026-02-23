const mv = document.getElementById('mv');
const arBtn = document.getElementById('arBtn');

// MODEL YOLLARI BURADA
const MODEL_GLB = 'models/kabina-polokragla-geo-6-90.glb';
const MODEL_USDZ = 'models/kabina-polokragla-geo-6-90.usdz';

// Modeli yükle
mv.src = MODEL_GLB;
mv.setAttribute('ios-src', MODEL_USDZ);

// AR butonu
arBtn.addEventListener('click', () => {
  if (mv.activateAR) {
    mv.activateAR();
  }
});