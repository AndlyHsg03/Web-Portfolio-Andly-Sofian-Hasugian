# 🚀 Portfolio Website — Next.js

Website portfolio profesional dengan tema **Navy Biru × Orange × Putih** dan animasi keren.

## ✨ Fitur

- **Hero Section** — Particle animation, typing effect, dan avatar floating
- **About** — Timeline karir + stats counter
- **Skills** — Animated skill bars + tech stack badges  
- **Projects** — Filter kategori + hover overlay dengan link GitHub & Live Demo
- **Certificates** — Grid sertifikat dengan badge interaktif
- **Contact** — Form kontak + info kontak
- **Navbar** — Sticky dengan active section detection + mobile menu

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS + Custom CSS animations
- **Font:** Bebas Neue (display) + Space Grotesk (body) + JetBrains Mono
- **Animasi:** CSS keyframes + IntersectionObserver + Canvas API

## 🚀 Cara Menjalankan

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Buka di browser
# http://localhost:3000
```

## ✏️ Cara Kustomisasi

### Ubah Nama & Informasi Pribadi
1. Edit `components/Hero.tsx` — Ubah nama, deskripsi, sosial media
2. Edit `components/About.tsx` — Ubah bio, timeline karir, stats
3. Edit `app/layout.tsx` — Ubah title & description meta

### Tambah Proyek Baru
Edit array `projects` di `components/Projects.tsx`:
```ts
{
  id: 7,
  title: 'Nama Proyek',
  category: 'Web App',  // Web App | Mobile | AI/ML | Dashboard
  tags: ['React', 'Node.js'],
  description: 'Deskripsi singkat proyek...',
  github: 'https://github.com/...',
  live: 'https://...',
  featured: false,
}
```

### Tambah Sertifikat
Edit array `certificates` di `components/Certificates.tsx`:
```ts
{
  id: 7,
  title: 'Nama Sertifikat',
  issuer: 'Penerbit',
  date: 'Jan 2024',
  credentialId: 'ID-CERT-001',
  icon: '🏆',
  category: 'Cloud',
  url: 'https://link-verifikasi.com',
}
```

### Tambah Foto Profil
Letakkan foto di `public/avatar.jpg` lalu edit `components/Hero.tsx`:
```tsx
// Ganti div placeholder dengan:
<Image src="/avatar.jpg" alt="Your Name" fill className="object-cover" />
```

## 🎨 Kustomisasi Tema

Edit `tailwind.config.js` untuk mengubah warna:
- `navy` → Warna biru tua utama
- `orange` → Warna aksen orange

## 📁 Struktur Project

```
portfolio/
├── app/
│   ├── globals.css     # Global styles & animations
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main page
├── components/
│   ├── Navbar.tsx      # Navigation
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About & timeline
│   ├── Skills.tsx      # Skills & tech stack
│   ├── Projects.tsx    # Portfolio projects
│   ├── Certificates.tsx # Certificates
│   ├── Contact.tsx     # Contact form
│   └── Footer.tsx      # Footer
└── public/             # Static files (foto, CV, dll)
```

## 📝 Deploy ke Vercel

```bash
npm i -g vercel
vercel
```

---
Dibuat dengan ❤️ menggunakan Next.js & Tailwind CSS
