# Tugas Penundaan Imbalan

Aplikasi eksperimen *delay of gratification* (tugas penundaan imbalan). Tersedia sebagai **aplikasi desktop** (Windows / macOS / Linux) dan **versi web**.

## Struktur

```
src/index.html              # seluruh aplikasi (HTML + CSS + JS)
main.js                     # entry point Electron
package.json                # dependensi & konfigurasi build
.github/workflows/build.yml # build installer otomatis + GitHub Release
.github/workflows/pages.yml # deploy versi web ke GitHub Pages
```

## Menjalankan

Butuh [Node.js](https://nodejs.org) 18+.

```bash
npm install
npm start        # jalankan sebagai aplikasi desktop
npm run web      # jalankan sebagai web lokal (http://localhost:3000)
```

## Build installer

```bash
npm run dist:win     # .exe (installer + portable)
npm run dist:mac     # .dmg   (harus di macOS)
npm run dist:linux   # .AppImage (harus di Linux)
```

Hasil ada di folder `dist/`.

## Rilis otomatis lewat GitHub

```bash
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions akan build untuk 3 OS dan melampirkan installer ke halaman **Releases**.

## Versi web (GitHub Pages)

Di repo: **Settings → Pages → Source: GitHub Actions**. Setiap push ke `main` otomatis ter-deploy.

## Catatan

- Data sesi dikirim ke endpoint Google Apps Script (`ENDPOINT` di `src/index.html`). Kalau repo dibuat publik, URL itu ikut terlihat. Pastikan script-nya hanya menerima data (bukan mengekspos data peserta).
- Installer belum ditandatangani (code signing), jadi Windows SmartScreen / macOS Gatekeeper bisa menampilkan peringatan saat pertama dibuka.
- Tekan `F11` untuk fullscreen, `Ctrl+Shift+I` untuk DevTools.

## Lisensi

MIT
