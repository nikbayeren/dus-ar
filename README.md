# 🚿 Duşakabin AR - Artırılmış Gerçeklik Uygulaması

Müşterilerinizin duşakabinlerinizi artırılmış gerçeklikle banyolarında görmesini sağlayan web tabanlı AR uygulaması.

## ✨ Özellikler

- 🌐 **Web Tabanlı** - Uygulama indirme gerekmez
- 📱 **Mobil Uyumlu** - Tüm telefon ve tabletlerde çalışır
- 🎨 **4 Farklı Model** - Standart, köşe, raylı, küvetli
- 🎛️ **Tam Kontrol** - Hareket, döndürme, ölçeklendirme
- 📷 **Fotoğraf Çekme** - Beğenilen görüntüleri kaydetme
- 🔄 **Gerçekçi** - 1:1 ölçeklerde

## 🚀 Hızlı Başlangıç

### 1. Uygulamayı Test Et
```bash
# Proje klasöründe
python -m http.server 8000
# Tarayıcıda aç: http://localhost:8000
```

## 📦 Repository - Hızlı GitHub Güncelleme

Bu repo yerelde değiştirildi (CSS/JS ayrıldı, `app.js` eklendi, `models/` klasörü oluşturuldu). Aşağıdaki adımları izleyerek değişiklikleri GitHub'a gönderebilirsiniz.

1. Değişiklikleri gözden geçirin:

```powershell
git status
git diff
```

2. Basit commit ve push (varsayılan dal `main`):

```powershell
git add -A
git commit -m "chore: refactor CSS/JS, add models placeholders, pin model-viewer"
git push origin main
```

3. Eğer uzaktan (`origin`) ayarlı değilse, uzantıyı ekleyin:

```powershell
git remote add origin https://github.com/<kullanici>/<repo>.git
git push -u origin main
```

Not: Repo üzerinde branch koruması veya farklı ana branch (`master`/`main`) varsa uygun dalı kullanın.

### Otomatik Yardımcı Script
Projeye bir PowerShell scripti eklendi: `git-push.ps1` — bu script size commit mesajını sorar ve belirtilen dala push yapar. Kullanım:

```powershell
# İletilen mesaj ile
.\git-push.ps1 -Message "chore: cleanup and deploy" -Branch main

# Veya interaktif (varsayılan branch: main)
.\git-push.ps1
```

Script çalışması için yerel bilgisayarınızda `git` kurulu ve remote erişiminizin (SSH veya HTTPS) yapılandırılmış olması gerekir.


### 2. QR Kod ile Erişim
- `qr.html` dosyasını aç
- QR kodu telefonla tara
- AR deneyimini başlat

### 3. Direkt Erişim
- `index.html` dosyasını tarayıcıda aç
- Kamera izni ver
- Hiro marker ile test et

## 📋 Kullanım Talimatları

### Müşteriler İçin:
1. **QR Kodu Tara** - Telefon kamerası ile
2. **Kamera İzni Ver** - Gerekli
3. **Düz Yüzey** - Zemin veya duvara odakla
4. **Model Görünür** - Otomatik tespit
5. **Kontrol Et** - Dokunmatik hareketlerle
6. **Fotoğraf Çek** - Paylaşmak için

### Teknik Özellikler:
- **Teknoloji**: A-Frame + AR.js + Three.js
- **Destek**: iOS 11+, Android 7+
- **Kamera**: WebRTC API
- **Performans**: 60 FPS hedef

## 🎯 Modeller ve Özellikler

### Standart Model (90x90 cm)
- Klasik dikdörtgen tasarım
- Cam çerçeve seçenekleri
- En popüler model

### Köşe Model (80x120 cm)
- Köşe montaj için
- Alan tasarrufu
- Modern görünüm

### Raylı Model (100x100 cm)
- Kayar kapı sistemi
- Geniş iç alan
- Kolay kullanım

### Küvetli Model (120x85 cm)
- Küvet üstü montaj
- Lüks tasarım
- Ekstra depolama

## 🔧 Özelleştirme

### Renk Seçenekleri:
- **Cam**: Mavi, şeffaf, buzlu, bronz
- **Çerçeve**: Gümüş, altın, siyah, beyaz
- **Profil**: Mat, parlak, fırçalanmış

### Ölçüler:
- Genişlik: 70-140 cm
- Yükseklik: 190-220 cm  
- Derinlik: 80-120 cm

## 📱 Mobil Kontroller

### Dokunmatik Hareketler:
- **Tek Parmak** - Modeli hareket ettirme
- **Sürükleme** - Döndürme
- **İki Parmak** - Büyütme/küçültme
- **Pinch** - Zoom

### Buton Kontrolleri:
- **🔄 Sıfırla** - Başlangıç pozisyonu
- **🎨 Renk** - Cam rengi değiştir
- **📷 Fotoğraf** - Görüntü kaydet
- **📱 AR** - Kamera aç/kapa

## 🌐 Yayınlama

### Hosting Seçenekleri:
1. **GitHub Pages** - Ücretsiz
2. **Netlify** - Otomatik deploy
3. **Vercel** - Performanslı
4. **Firebase Hosting** - Google altyapısı

### Domain Ayarları:
```
DNS: A-record -> IP
SSL: Otomatik kurulum
CDN: Global dağıtım
```

## 📈 Performans Optimizasyonu

### Hız İyileştirmeleri:
- **Lazy Loading** - Modeller geç yüklenir
- **Compression** - Dosyalar sıkıştırılır
- **CDN** - Hızlı erişim
- **Cache** - Tekrar ziyaretler hızlı

### Mobil Optimizasyon:
- **Responsive** - Ekran boyutuna uyum
- **Touch Events** - Dokunmatik kontrol
- **Battery** - Düşük güç tüketimi
- **Memory** - Verimli kullanım

## 🔍 Hata Ayıklama

### Yaygın Sorunlar:
- **Kamera izni** - Ayarlardan etkinleştir
- **HTTPS** - Güvenli bağlantı gerekli
- **Marker** - Hiro marker basılı
- **Lighting** - Yeterli ışık

### Tarayıcı Desteği:
- ✅ Chrome 60+
- ✅ Safari 11+
- ✅ Firefox 55+
- ❌ Internet Explorer

## 🛠️ Geliştirme

### Proje Yapısı:
```
banyo app/
├── index.html      # Ana AR uygulaması
├── qr.html         # QR kod ve yönlendirme
├── README.md       # Dokümantasyon
└── models/         # 3D model dosyaları
```

### API Kullanımı:
```javascript
// Model değiştir
updateShowerCabin('standart');

// Renk değiştir
changeColor('#87CEEB');

// Sıfırla
resetPosition();
```

## 📞 Destek

### İletişim:
- **E-posta**: destek@banyo-ar.com
- **Telefon**: +90 555 123 4567
- **Adres**: İstanbul, Türkiye

### SSS:
- **Ücretsiz mi?** - Evet, web versiyonu ücretsiz
- **Telefon gerekir mi?** - Evet, kamera için
- **İnternet gerekir mi?** - Evet, ilk yükleme için
- **Reklam var mı?** - Hayır, temiz deneyim

## 🚀 Gelecek Özellikler

### Yakında:
- [ ] Gerçek 3D modeller
- [ ] Sesli komutlar  
- [ ] Video kayıt
- [ ] Sosyal medya paylaş
- [ ] Fiyat hesaplama
- [ ] Montaj talimatları

### Uzun Vade:
- [ ] AI iç tasarım
- [ ] Sanal satış danışmanı
- [ ] ERP entegrasyonu
- [ ] Mobil uygulama

---

**© 2024 Duşakabin AR** - Banyonuzdaki gelecek
