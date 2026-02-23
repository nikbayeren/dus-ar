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


# Duşakabin AR — Yeniden oluşturuldu (sıfırdan)

Bu repo tamamen sıfırdan yeniden oluşturuldu: temiz, üretime hazır, statik bir web AR deneyimi için minimal bir iskelet sağlanmıştır.

Özellikler bu sürümde:
- Modern tek sayfa arayüz (`index.html`, `styles.css`, `app.js`)
- `model-viewer` ile AR deneyimi (iOS Quick Look, Android Scene Viewer desteği)
- Yer tutucu GLB / USDZ modelleri (remote demo kaynakları)
- Kolayca değiştirilebilir `PRODUCTS` listesi — kendi GLB/USDZ dosyalarınızı ekleyin

Hemen denemek için (yerel):

```powershell
python -m http.server 8000
# Aç: http://localhost:8000
```

GitHub Pages (canlı):
- Repo'nun `gh-pages` dalına push yaptım. Site adresiniz: `https://nikbayeren.github.io/du-s` (GitHub Pages ayarlarına bağlı olarak birkaç dakika içinde aktif olur).

Model yerleştirme:
- Gerçek model dosyalarınızı `models/` klasörüne `standart.glb` / `standart.usdz` gibi isimlerle koyun veya `app.js` içindeki `PRODUCTS` listesinde URL'leri güncelleyin.

Deploy süreçleri:
- Eğer Netlify kullanıyorsanız, deploy branch olarak `main`/`master` veya `gh-pages`'i seçin.
- Otomatik CI/CD isterseniz GitHub Actions ile `gh-pages` publish adımı oluşturabilirim.

Sonraki adımlar önerebilirim:
1. 3D modellerinizi optimize edin (glb draco sıkıştırma, texture atlasing).
2. Model önizleme görselleri ekleyin (`preview.png`) ve SEO meta güncelleyin.
3. Netlify veya GitHub Actions ile otomatik deploy kurulumunu ekleyeyim.

İleri gitmek için hangi adımı istersiniz? (ör: GitHub Pages doğrula, Netlify ayarla, gerçek modeller eklemede yardım)
### Köşe Model (80x120 cm)
