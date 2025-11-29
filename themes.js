// themes.js - Theme generator logic

// Predefined aesthetic palettes inspired by Material Design, Dribbble, and modern UI trends
const THEMES = {
  light: {
    name: "Light & Fresh",
    background: "#ffffff",
    text: "#333333",
    primary: "#4a90e2",
    secondary: "#f5f5f5",
    accent: "#ff6b6b"
  },
  dark: {
    name: "Dark & Modern",
    background: "#1a1a1a",
    text: "#ffffff",
    primary: "#bb86fc",
    secondary: "#333333",
    accent: "#03dac6"
  },
  pastel: {
    name: "Pastel Dream",
    background: "#fef7ff",
    text: "#4a4a4a",
    primary: "#ffb3ba",
    secondary: "#bae1ff",
    accent: "#ffffba"
  },
  modern: {
    name: "Modern Minimal",
    background: "#f8f9fa",
    text: "#212529",
    primary: "#007bff",
    secondary: "#6c757d",
    accent: "#28a745"
  },
  vibrant: {
    name: "Vibrant Energy",
    background: "#fff3cd",
    text: "#495057",
    primary: "#fd7e14",
    secondary: "#e83e8c",
    accent: "#20c997"
  },
  ocean: {
    name: "Ocean Breeze",
    background: "#e0f7fa",
    text: "#006064",
    primary: "#00acc1",
    secondary: "#b2ebf2",
    accent: "#0097a7"
  },
  sunset: {
    name: "Sunset Glow",
    background: "#fff3e0",
    text: "#bf360c",
    primary: "#ff6f00",
    secondary: "#ffe0b2",
    accent: "#f4511e"
  },
  forest: {
    name: "Forest Green",
    background: "#f1f8e9",
    text: "#1b5e20",
    primary: "#558b2f",
    secondary: "#dcedc8",
    accent: "#7cb342"
  },
  neon: {
    name: "Neon Nights",
    background: "#0d0d0d",
    text: "#ffffff",
    primary: "#00ff41",
    secondary: "#1a1a1a",
    accent: "#ff00ff"
  },
  royal: {
    name: "Royal Purple",
    background: "#f3e5f5",
    text: "#4a148c",
    primary: "#7b1fa2",
    secondary: "#e1bee7",
    accent: "#9c27b0"
  },
  cherry: {
    name: "Cherry Blossom",
    background: "#fce4ec",
    text: "#880e4f",
    primary: "#c2185b",
    secondary: "#f8bbd0",
    accent: "#e91e63"
  },
  midnight: {
    name: "Midnight Blue",
    background: "#1a237e",
    text: "#e8eaf6",
    primary: "#3f51b5",
    secondary: "#283593",
    accent: "#5c6bc0"
  },
  arctic: {
    name: "Arctic Frost",
    background: "#e1f5fe",
    text: "#01579b",
    primary: "#0277bd",
    secondary: "#b3e5fc",
    accent: "#0288d1"
  },
  autumn: {
    name: "Autumn Maple",
    background: "#fff8e1",
    text: "#e65100",
    primary: "#ff6f00",
    secondary: "#ffecb3",
    accent: "#ff9800"
  },
  cyber: {
    name: "Cyberpunk",
    background: "#212121",
    text: "#00ffff",
    primary: "#ff00ff",
    secondary: "#424242",
    accent: "#ffff00"
  },
  lavender: {
    name: "Lavender Dreams",
    background: "#f3e5f5",
    text: "#4a148c",
    primary: "#9c27b0",
    secondary: "#e1bee7",
    accent: "#ba68c8"
  }
};

// Function to convert hex to rgba
function hexToRgba(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Function to get all available themes
function getAvailableThemes() {
  return Object.keys(THEMES).map(key => ({
    id: key,
    ...THEMES[key]
  }));
}

// Function to get a specific theme by ID
function getTheme(themeId) {
  return THEMES[themeId] || null;
}

// Function to generate CSS variables for a theme
function generateThemeCSS(theme) {
  const accentGlow = hexToRgba(theme.accent, 0.35);
  const primarySoft = hexToRgba(theme.primary, 0.25);
  const backgroundSoft = theme.background;
  const secondarySoft = hexToRgba(theme.secondary, 0.9);

  return `
    :root {
      --theme-background: ${theme.background};
      --theme-text: ${theme.text};
      --theme-primary: ${theme.primary};
      --theme-secondary: ${theme.secondary};
      --theme-accent: ${theme.accent};
    }

    * {
      transition: color 0.3s ease, background-color 0.3s ease, border-color 0.3s ease !important;
    }

    body.color-theme-suggester-active {
      background-color: var(--theme-background) !important;
      color: var(--theme-text) !important;
    }

    body.color-theme-suggester-active h1,
    body.color-theme-suggester-active h2,
    body.color-theme-suggester-active h3,
    body.color-theme-suggester-active h4,
    body.color-theme-suggester-active h5,
    body.color-theme-suggester-active h6,
    body.color-theme-suggester-active p,
    body.color-theme-suggester-active span,
    body.color-theme-suggester-active li,
    body.color-theme-suggester-active label,
    body.color-theme-suggester-active legend,
    body.color-theme-suggester-active strong,
    body.color-theme-suggester-active em,
    body.color-theme-suggester-active blockquote,
    body.color-theme-suggester-active code,
    body.color-theme-suggester-active pre,
    body.color-theme-suggester-active td,
    body.color-theme-suggester-active th {
      color: var(--theme-text) !important;
    }

    body.color-theme-suggester-active a {
      color: var(--theme-primary) !important;
    }

    body.color-theme-suggester-active a:hover,
    body.color-theme-suggester-active a:focus {
      color: var(--theme-accent) !important;
    }

    body.color-theme-suggester-active :is(header, main, section, article, aside, nav, footer) {
      background-color: ${backgroundSoft} !important;
    }

    body.color-theme-suggester-active :is(div, ul, ol, li, table, tbody, thead, tr, td, th, blockquote, pre, code, form, fieldset) {
      background-color: ${secondarySoft} !important;
    }

    body.color-theme-suggester-active :is(button, .btn, input[type="submit"], input[type="button"], input[type="reset"]) {
      background-color: var(--theme-primary) !important;
      color: #ffffff !important;
      border-color: var(--theme-primary) !important;
    }

    body.color-theme-suggester-active :is(button, .btn, input[type="submit"], input[type="button"], input[type="reset"]):hover {
      background-color: var(--theme-accent) !important;
      border-color: var(--theme-accent) !important;
      color: #ffffff !important;
    }

    body.color-theme-suggester-active :is(input, textarea, select) {
      background-color: ${backgroundSoft} !important;
      color: var(--theme-text) !important;
      border: 1px solid ${primarySoft} !important;
    }

    body.color-theme-suggester-active :is(input, textarea, select):focus {
      outline: 2px solid var(--theme-accent) !important;
      box-shadow: 0 0 0 3px ${accentGlow} !important;
    }

    body.color-theme-suggester-active hr {
      border-color: ${primarySoft} !important;
    }

    body.color-theme-suggester-active :is(.card, .panel) {
      background-color: var(--theme-secondary) !important;
      border-color: ${primarySoft} !important;
    }
  `;
}

// Make functions globally available
window.getAvailableThemes = getAvailableThemes;
window.getTheme = getTheme;
window.generateThemeCSS = generateThemeCSS;
window.hexToRgba = hexToRgba;