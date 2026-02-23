# Models

Bu klasörde gerçek GLB / USDZ model dosyalarınızı saklayın. Şimdilik demo uzak modeller kullanılıyor.

Dosya önerileri:
- `standart.glb`, `standart.usdz`
- `kose.glb`, `kose.usdz`

Optimaze rehberi:
- GLB için Draco sıkıştırma kullanın.
- Texture çözünürlüğünü 1k/2k aralığında tutun.
- PBR materyallerde gereksiz haritaları kaldırın (ör. unused normal maps).
# 3D Model Dosyaları

Bu klasöre gerçek duşakabin modellerinizi (GLB ve USDZ) ekleyin. Dosya isimleri `app.js` içindeki `PRODUCTS` tanımıyla eşleşmelidir:

- `standart.glb` ve `standart.usdz`
- `kose.glb` ve `kose.usdz`
- `rayli.glb` ve `rayli.usdz`
- `kuvetli.glb` ve `kuvetli.usdz`

Optimizasyon önerileri:
- GLB için Draco sıkıştırma kullanın.
- PBR texture'ları 2k veya 1k ile sınırlandırın.
- USDZ paketlerini küçültün ve test edin.

Yerel test için Python HTTP server çalıştırın:

```powershell
python -m http.server 8000
# Aç: http://localhost:8000/index.html
```
