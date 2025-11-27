// themes.js - Theme generator logic

// Predefined aesthetic palettes inspired by Material Design and Dribbble
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
    }
};

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
    return `
    :root {
      --theme-background: ${theme.background};
      --theme-text: ${theme.text};
      --theme-primary: ${theme.primary};
      --theme-secondary: ${theme.secondary};
      --theme-accent: ${theme.accent};
    }

    body {
      background-color: var(--theme-background) !important;
      color: var(--theme-text) !important;
    }

    /* Apply to common elements */
    h1, h2, h3, h4, h5, h6 {
      color: var(--theme-text) !important;
    }

    a {
      color: var(--theme-primary) !important;
    }

    button, .btn, input[type="submit"], input[type="button"] {
      background-color: var(--theme-primary) !important;
      color: white !important;
      border-color: var(--theme-primary) !important;
    }

    /* Subtle secondary styling */
    .card, .panel, .section {
      background-color: var(--theme-secondary) !important;
    }
  `;
}

// Make functions globally available
window.getAvailableThemes = getAvailableThemes;
window.getTheme = getTheme;
window.generateThemeCSS = generateThemeCSS;