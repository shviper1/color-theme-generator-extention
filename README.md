# Color Theme Suggester Chrome Extension

A beautiful Chrome extension that automatically suggests stunning color themes for any website and allows users to preview them live without breaking the site's layout.

## Features

🎨 **Color Theme Generator**

- 5 beautiful theme palettes: Light & Fresh, Dark & Modern, Pastel Dream, Modern Minimal, Vibrant Energy
- Each palette includes background, text, primary, secondary, and accent colors

🔄 **Live Preview Mode**

- Instantly apply themes to the current website using CSS injection
- Preserves website layout - only colors change
- Smooth transitions and animations

🎯 **Color Picker Panel**

- Elegant popup interface with theme cards
- Color preview boxes for each theme
- Apply, Save, and Reset functionality

💾 **Save & Auto-load**

- Save selected themes for specific websites using Chrome storage
- Automatically applies saved themes when visiting saved websites

## Installation

1. Download or clone this repository
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `color-theme-extension` folder
5. The extension should now appear in your extensions list

## How It Works

1. **Theme Generation**: The extension uses predefined aesthetic color palettes inspired by Material Design and modern web trends.

2. **Live Preview**: When you click "Apply Theme" in the popup, the extension injects CSS variables and styles into the current webpage using `chrome.scripting` API.

3. **Saving Themes**: Themes are saved per domain using `chrome.storage.sync`, allowing cross-device synchronization.

4. **Auto-loading**: On page load, the content script checks for saved themes and applies them automatically.

## Permissions

The extension requires the following permissions:

- `activeTab`: To access and modify the current tab's content
- `storage`: To save and retrieve theme preferences
- `scripting`: To inject CSS styles into web pages

## File Structure

```
color-theme-extension/
├── manifest.json          # Extension manifest (Manifest V3)
├── popup.html             # Popup interface HTML
├── popup.css              # Popup styling (Tailwind-inspired)
├── popup.js               # Popup logic and event handlers
├── background.js          # Service worker (minimal for MV3)
├── contentScript.js       # Content script for style injection
├── themes.js              # Theme generation and CSS logic
└── README.md              # This file
```

## Usage

1. Click the extension icon in your Chrome toolbar
2. Browse the available theme cards
3. Click "Apply Theme" to preview a theme on the current page
4. Click "Save Theme" to remember the theme for this website
5. Use "Reset to Original" to remove applied themes

## Development

To modify the extension:

1. Make changes to the source files
2. Go to `chrome://extensions/`
3. Click the refresh button on the extension card
4. Test your changes on a webpage

## Browser Compatibility

- Chrome 88+ (Manifest V3 support)
- Edge 88+ (Chromium-based)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the [MIT License](LICENSE).
