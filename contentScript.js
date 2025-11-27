// contentScript.js - Content script to inject styles and handle theme application

// Import theme functions (since it's a content script, we can use importScripts)
importScripts('themes.js');

// Function to apply a theme to the current page
function applyTheme(themeId) {
    const theme = getTheme(themeId);
    if (!theme) return;

    const css = generateThemeCSS(theme);

    // Remove existing theme styles
    removeThemeStyles();

    // Inject new styles
    const style = document.createElement('style');
    style.id = 'color-theme-suggester-styles';
    style.textContent = css;
    document.head.appendChild(style);

    console.log(`Applied theme: ${theme.name}`);
}

// Function to remove theme styles
function removeThemeStyles() {
    const existingStyle = document.getElementById('color-theme-suggester-styles');
    if (existingStyle) {
        existingStyle.remove();
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

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'applyTheme') {
        applyTheme(request.themeId);
        sendResponse({ success: true });
    } else if (request.action === 'resetTheme') {
        resetTheme();
        sendResponse({ success: true });
    } else if (request.action === 'saveTheme') {
        // Save theme for this URL
        chrome.storage.sync.set({ [window.location.hostname]: request.themeId }, () => {
            sendResponse({ success: true });
        });
        return true; // Keep message channel open for async response
    }
});

// Auto-load theme when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoLoadTheme);
} else {
    autoLoadTheme();
}