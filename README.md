# 🎨 Advanced Color Theme Studio

An AI-powered Chrome extension that revolutionizes web color theming with advanced features, accessibility tools, and beautiful visual design.

![Version](https://img.shields.io/badge/version-2.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Chrome](https://img.shields.io/badge/Chrome-Extension-yellow.svg)

## ✨ Features

### 🎯 Core Features

- **16+ Beautiful Preset Themes**: Curated color palettes including Ocean Breeze, Sunset Glow, Neon Nights, Cyberpunk, and more
- **Custom Theme Creator**: Build your own themes with an intuitive color picker interface
- **Live Preview**: See changes in real-time before applying
- **One-Click Application**: Apply themes instantly to any website
- **Persistent Themes**: Save your favorite themes per website

### 🤖 AI-Powered Features

#### Smart Theme Generator
- **Mood-Based Generation**: Choose from 6 moods (Professional, Energetic, Calm, Playful, Elegant, Bold)
- **Description-to-Theme**: Describe your desired theme in plain text and let AI create it
- **Auto-Generated Palettes**: AI analyzes and creates harmonious color combinations

#### Accessibility Optimizer
- **WCAG Compliance Checker**: Automatically checks contrast ratios
- **Auto-Fix Contrast**: One-click solution to meet AA/AAA standards
- **Detailed Reports**: See contrast ratios and accessibility scores
- **Real-time Validation**: Live contrast checking while you design

### 🌈 Color Tools

#### Color Harmony Generator
- **Complementary**: Create classic opposite color schemes
- **Analogous**: Generate harmonious adjacent colors
- **Triadic**: Build balanced three-color palettes
- **Tetradic**: Create rich four-color combinations
- **Monochromatic**: Generate variations of a single hue

#### Color Extractor
- **Website Analysis**: Extract dominant colors from any webpage
- **Smart Sampling**: Analyzes background, text, and accent colors
- **Instant Application**: Convert extracted colors into a complete theme
- **Frequency-based Sorting**: Shows most-used colors first

#### Smart Gradient Generator
- **AI-Assisted**: Creates beautiful gradients from your theme
- **Multiple Directions**: Diagonal, horizontal, vertical options
- **Smooth Transitions**: Professional-quality color interpolation

### 🎨 Visual Features

- **Premium Design**: Modern, glassmorphic UI with smooth animations
- **Micro-interactions**: Delightful hover effects and transitions
- **Color Visualizations**: Interactive color boxes with hover previews
- **Live Contrast Badges**: Real-time accessibility feedback
- **Responsive Layout**: Works perfectly at any size

### 🛠️ Advanced Tools

- **Import/Export**: Share themes via JSON
- **Element Highlighting**: Visualize which elements will be affected
- **Toast Notifications**: Clear feedback for every action
- **Color Name Detection**: AI-powered color naming (e.g., "Vibrant Blue")
- **Copy to Clipboard**: Quick copy of color codes

## 🚀 Installation

### From Source

1. Clone or download this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the extension directory
6. The Advanced Color Theme Studio icon will appear in your toolbar

### From Chrome Web Store

*Coming soon*

## 📖 Usage Guide

### Quick Start

1. **Click the extension icon** in your Chrome toolbar
2. **Choose a preset theme** from the Presets tab
3. **Click "Apply"** to see it on the current webpage
4. **Click "Save"** to make it permanent for that website

### Creating Custom Themes

1. Go to the **Custom** tab
2. Use color pickers to choose your colors
3. Use **Harmony Generator** for instant color combinations
4. Watch the **Live Preview** update
5. Check **Contrast Badges** for accessibility
6. Click **Apply Custom Theme**

### Extracting Colors

1. Navigate to any website
2. Go to the **Extract** tab
3. Click **Extract Colors**
4. Browse the extracted palette
5. Click **Apply Extracted Theme** to use them

### AI Studio

1. Go to the **AI Studio** tab
2. Choose from multiple AI features:
   - Select a **mood** for instant generation
   - **Optimize contrast** for better accessibility
   - Describe your theme in **natural language**
   - Generate **smart gradients**

## 🎨 Available Preset Themes

| Theme | Description |
|-------|-------------|
| Light & Fresh | Clean white background with blue accents |
| Dark & Modern | Sleek dark theme with purple highlights |
| Pastel Dream | Soft, gentle colors for comfort |
| Modern Minimal | Professional and clean design |
| Vibrant Energy | Bold, energetic color scheme |
| Ocean Breeze | Calming blues and aquas |
| Sunset Glow | Warm oranges and ambers |
| Forest Green | Natural earth tones |
| Neon Nights | Futuristic neon colors on dark |
| Royal Purple | Elegant purple palette |
| Cherry Blossom | Soft pink romantic theme |
| Midnight Blue | Deep blue professional theme |
| Arctic Frost | Cool blue and white |
| Autumn Maple | Warm autumn colors |
| Cyberpunk | High-contrast neon theme |
| Lavender Dreams | Soft purple tones |

## 🔧 Technical Details

### Architecture

```
color-theme-extension/
├── popup.html          # Main UI structure
├── popup.css           # Premium styling with animations
├── popup.js            # Main application logic
├── colorUtils.js       # Color manipulation utilities
├── aiEngine.js         # AI-powered generation
├── themes.js           # Preset theme definitions
├── contentScript.js    # Page injection logic
├── background.js       # Service worker
└── manifest.json       # Extension configuration
```

### Color Utilities

- **RGB/HSL/Hex Conversions**: Complete color space transformations
- **WCAG Calculation**: Precise contrast ratio computation
- **Luminance Detection**: Relative luminance for accessibility
- **Color Manipulation**: Lighten, darken, saturate, desaturate
- **Harmony Algorithms**: Mathematical color theory implementation

### AI Engine

- **Keyword Analysis**: Natural language processing for theme description
- **Mood Mapping**: Pre-defined mood-to-palette associations
- **Accessibility Fixing**: Iterative contrast optimization
- **Gradient Generation**: HSL-based smooth interpolation
- **Variation Suggestions**: Algorithmic theme variations

## 🎯 Accessibility

This extension prioritizes web accessibility:

- ✅ **WCAG 2.1 Compliant**: All tools follow WCAG guidelines
- ✅ **Contrast Checker**: Real-time AA/AAA validation
- ✅ **Auto-Fix**: One-click accessibility improvements
- ✅ **Color Blind Friendly**: Considers various color vision types
- ✅ **Semantic HTML**: Proper structure for screen readers

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/color-theme-extension.git

# Load the extension in Chrome
# 1. Open chrome://extensions/
# 2. Enable Developer mode
# 3. Click "Load unpacked"
# 4. Select the project directory
```

## 📝 Changelog

### Version 2.0 (Latest)
- ✨ Added AI-powered theme generation
- ✨ Implemented mood-based color palettes
- ✨ Added color harmony generator (Complementary, Analogous, Triadic, etc.)
- ✨ Implemented WCAG accessibility checker
- ✨ Added auto-contrast fix feature
- ✨ Added color extraction from webpages
- ✨ Implemented gradient generator
- ✨ Added 11 new preset themes (total 16)
- 🎨 Completely redesigned UI with premium animations
- 🎨 Added glassmorphic design elements
- 🎨 Improved color picker interface
- 🛠️ Added import/export functionality
- 🛠️ Added element highlighting
- 🛠️ Implemented toast notifications

### Version 1.0
- Initial release with 5 preset themes
- Basic color application
- Theme saving per website

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- Color theory based on modern design principles
- WCAG guidelines from W3C
- Inspired by Material Design, Dribbble, and modern UI trends
- Built with passion for great design and accessibility

## 📧 Support

Having issues? Want to suggest a feature?

- Create an issue on GitHub
- Email: support@example.com

## 🌟 Show Your Support

If you find this extension useful, please:
- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest new features
- 📢 Share with others

---


Enjoy creating beautiful, accessible color themes! 🚀
