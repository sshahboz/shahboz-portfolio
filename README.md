# Shahboz Safoyev — Portfolio Website

A premium, editorial-style graphic design portfolio. Clean, fast, GitHub Pages compatible.

## Folder Structure
```
portfolio-site/
├── index.html          ← Main page
├── style.css           ← All styles
├── script.js           ← Interactions + portfolio data
├── images/
│   ├── profile.jpg     ← YOUR PROFILE PHOTO (add this)
│   └── cv.pdf          ← YOUR CV (for download button)
├── portfolio/
│   ├── project1.pdf    ← Portfolio PDFs
│   ├── project2.pdf
│   └── ...
└── thumbnails/
    ├── project1.jpg    ← Preview images (16:10 ratio recommended)
    ├── project2.jpg
    └── ...
```

## Setup Steps

### 1. Add Your Photo
Place your photo at: `images/profile.jpg`

### 2. Add Your Portfolio PDFs
Place PDF files in the `/portfolio/` folder as:
- `portfolio/project1.pdf`
- `portfolio/project2.pdf`
- etc.

### 3. Add Thumbnail Images
Place preview images (JPG, 16:10 ratio, ~800x500px) in `/thumbnails/`:
- `thumbnails/project1.jpg`
- `thumbnails/project2.jpg`
- etc.

### 4. Update Project Data
Open `script.js` and edit the `portfolioData` array at the top:

```js
const portfolioData = [
  {
    id: 1,
    title: "Your Project Title",
    desc: "Short description of the project.",
    category: "branding",   // branding | posters | social | ui | illustration | other
    pdf: "portfolio/project1.pdf",
    thumb: "thumbnails/project1.jpg"
  },
  // Add more...
];
```

### 5. Update Contact Info
In `index.html`, update:
- Email address (search: `shahboz@example.com`)
- Telegram link
- Instagram link
- Behance link
- LinkedIn link

### 6. Update CV Link
Replace `images/cv.pdf` with your actual CV file.

## Deploy to GitHub Pages

1. Create a new GitHub repository
2. Upload all files (keeping folder structure)
3. Go to Settings → Pages
4. Set Source to `main` branch, root `/`
5. Your site will be live at `https://yourusername.github.io/repo-name`

## Features
- ✅ Dark / Light mode (saved to localStorage)
- ✅ PDF portfolio with filter by category
- ✅ Smooth scroll animations
- ✅ Custom cursor (desktop)
- ✅ Fully responsive (mobile/tablet/desktop)
- ✅ Lazy loading images
- ✅ SEO meta tags
- ✅ GitHub Pages compatible
- ✅ No dependencies — pure HTML/CSS/JS
