# 🚀 Advanced Discord Bot - Landing Page

A modern, interactive landing page for the Advanced Discord Bot featuring a 3D technology stack sphere, horizontal scrolling features gallery, and responsive design built with React and Tailwind CSS.

## ✨ Features

- **🌐 3D Interactive Icon Cloud**: Technology stack displayed in a rotating 3D sphere with mouse interaction
- **🎨 Features Gallery**: Horizontal scrolling gallery with modal details
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **⚡ Modern UI/UX**: Built with React 19, Tailwind CSS, and smooth animations
- **🎯 Interactive Elements**: Hover effects, smooth transitions, and dynamic content

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS 4.0
- **Icons**: Lucide React, React Icons
- **Animations**: Framer Motion
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download here](https://git-scm.com/)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/harshendram/Advanced-Discord-Bot.git
cd Advanced-Discord-Bot
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build for Production

```bash
npm run build
```

Built files will be in the `dist/` directory.

## 🌐 GitHub Pages Deployment

### Automatic Deployment (GitHub Actions)

The repository includes automated GitHub Actions workflow. Simply push to `website-branch`:

```bash
git add .
git commit -m "Deploy to GitHub Pages"
git push origin website-branch
```

The site will automatically deploy to: `https://harshendram.github.io/Advanced-Discord-Bot/`

### GitHub Pages Settings

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **GitHub Actions**
4. The workflow will deploy from `website-branch` to root directory (`/`)

### Manual Trigger

You can also manually trigger deployment from GitHub:
1. Go to **Actions** tab in your repository
2. Click on **Deploy to GitHub Pages** workflow
3. Click **Run workflow** → **Run workflow**

## 📁 Project Structure

```
├── public/                     # Static assets
├── src/
│   ├── components/            # React components
│   │   ├── magicui/          # Magic UI components
│   │   │   └── icon-cloud.jsx # 3D Icon Cloud
│   │   ├── FeaturesGallery.jsx # Features showcase
│   │   ├── About.jsx          # Hero section
│   │   ├── Installation.jsx   # Setup guide
│   │   ├── TechStack.jsx      # Technology showcase
│   │   └── ...               # Other components
│   ├── constants.js          # App constants
│   ├── index.css            # Global styles
│   ├── App.jsx              # Main application
│   └── main.jsx             # Entry point
├── .github/workflows/        # GitHub Actions
├── package.json             # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## 🎨 Customization

### Adding New Technologies to Icon Cloud

Edit `src/components/TechStack.jsx`:

```javascript
const slugs = [
  "typescript",
  "javascript",
  "react",
  // Add your technology slugs here
  "your-new-tech",
];
```

### Modifying Features Gallery

Edit `src/components/FeaturesGallery.jsx`:

```javascript
const galleryFeatures = [
  {
    id: 1,
    title: "Your Feature",
    image: "path/to/image",
    description: "Feature description",
    details: "Detailed explanation",
    highlights: ["Feature 1", "Feature 2"],
  },
];
```

### Updating Images

Place images in `public/assets/` and reference them in `src/constants.js`:

```javascript
export const featureImages = {
  yourFeature: "/assets/your-image.png",
};
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages

## 🎯 Performance Optimization

- **Code Splitting**: Automatic with Vite
- **Image Optimization**: WebP format recommended
- **Bundle Analysis**: Use `npm run build` and check `dist/` size
- **Lazy Loading**: Components load on demand

## 🐛 Troubleshooting

### Common Issues

**Build Errors:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Icons Not Loading:**

- Check network connectivity
- Verify Simple Icons URLs in browser
- Ensure correct technology slugs

**Deployment Fails:**

- Check GitHub repository permissions
- Verify GitHub Pages settings
- Ensure `gh-pages` branch exists

### Development Tips

1. **Hot Reload**: Changes auto-reload in development
2. **CSS Classes**: Use Tailwind CSS IntelliSense extension
3. **Component Structure**: Follow React best practices
4. **State Management**: Use React hooks for local state

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Vite](https://vitejs.dev/) - Build tool
- [Simple Icons](https://simpleicons.org/) - Technology icons
- [Lucide](https://lucide.dev/) - Icon library

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/harshendram/Advanced-Discord-Bot/issues) page
2. Create a new issue with detailed description
3. Join our Discord server for community support

---

**Made with ❤️ for the Discord community**
