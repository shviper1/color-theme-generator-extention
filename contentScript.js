// contentScript.js - Content script to inject styles and handle theme application

// Function to apply a theme to the current page
function applyTheme(themeId) {
    const theme = getTheme(themeId);
    if (!theme) return;

    const css = generateThemeCSS(theme);

    const applyStyles = () => {
        removeThemeStyles();

        const style = document.createElement('style');
        style.id = 'color-theme-suggester-styles';
        style.textContent = css;
        document.head.appendChild(style);

        if (document.body) {
            document.body.classList.add('color-theme-suggester-active');
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyStyles, { once: true });
    } else {
        applyStyles();
    }

    console.log(`Applied theme: ${theme.name}`);
}

// Function to remove theme styles
function removeThemeStyles() {
    const existingStyle = document.getElementById('color-theme-suggester-styles');
    if (existingStyle) {
        existingStyle.remove();
    }

    const highlightStyle = document.getElementById('highlight-styles');
    if (highlightStyle) {
        highlightStyle.remove();
    }

    if (document.body) {
        document.body.classList.remove('color-theme-suggester-active');
    }
}

// Function to reset to original theme
function resetTheme() {
    removeThemeStyles();
    console.log('Reset to original theme');
}

// Auto-load saved theme on page load
async function autoLoadTheme() {
    try {
        const result = await chrome.storage.sync.get([window.location.hostname]);
        const savedTheme = result[window.location.hostname];
        if (savedTheme) {
            applyTheme(savedTheme);
        }
    } catch (error) {
        console.error('Error loading saved theme:', error);
    }
}

// Auto-load theme when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoLoadTheme);
} else {
    autoLoadTheme();
}