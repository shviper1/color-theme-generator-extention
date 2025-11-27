// background.js - Service Worker for Manifest V3

// Handle extension installation
chrome.runtime.onInstalled.addListener(() => {
    console.log('Color Theme Suggester extension installed');
});

// This service worker can be extended for additional background tasks if needed
// For now, it's minimal as the main logic is in popup and content scripts