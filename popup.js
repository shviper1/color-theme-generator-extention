// popup.js - Logic for the popup interface

let selectedThemeId = null;

// Function to render theme cards
function renderThemes() {
  const themeGrid = document.getElementById('theme-grid');
  const themes = getAvailableThemes();

  themeGrid.innerHTML = '';

  themes.forEach(theme => {
    const card = document.createElement('div');
    card.className = 'theme-card';
    card.dataset.themeId = theme.id;

    card.innerHTML = `
      <div class="theme-name">${theme.name}</div>
      <div class="color-preview">
        <div class="color-box" style="background-color: ${theme.background}" title="Background"></div>
        <div class="color-box" style="background-color: ${theme.primary}" title="Primary"></div>
        <div class="color-box" style="background-color: ${theme.secondary}" title="Secondary"></div>
        <div class="color-box" style="background-color: ${theme.accent}" title="Accent"></div>
      </div>
      <div class="color-labels">
        <span>BG</span>
        <span>Primary</span>
        <span>Secondary</span>
        <span>Accent</span>
      </div>
      <div class="theme-actions">
        <button class="btn btn-primary apply-btn" data-theme-id="${theme.id}">Apply Theme</button>
        <button class="btn btn-success save-btn" data-theme-id="${theme.id}">Save Theme</button>
      </div>
    `;

    themeGrid.appendChild(card);
  });

  // Add event listeners
  document.querySelectorAll('.apply-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const themeId = e.target.dataset.themeId;
      applyThemeToCurrentTab(themeId);
      updateSelectedTheme(themeId);
    });
  });

  document.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const themeId = e.target.dataset.themeId;
      saveThemeForCurrentTab(themeId);
    });
  });

  document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.classList.contains('btn')) {
        const themeId = card.dataset.themeId;
        applyThemeToCurrentTab(themeId);
        updateSelectedTheme(themeId);
      }
    });
  });
}

// Function to apply theme to current tab
async function applyThemeToCurrentTab(themeId) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab.url || !tab.url.startsWith('http')) {
      alert('Cannot apply theme to this page. Please navigate to a website.');
      return;
    }
    await chrome.tabs.sendMessage(tab.id, { action: 'applyTheme', themeId });
  } catch (error) {
    console.error('Error applying theme:', error);
    alert('Failed to apply theme. Please try again.');
  }
}

// Function to save theme for current tab's URL
async function saveThemeForCurrentTab(themeId) {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab.url || !tab.url.startsWith('http')) {
      alert('Cannot save theme for this page. Please navigate to a website.');
      return;
    }
    await chrome.tabs.sendMessage(tab.id, { action: 'saveTheme', themeId });
    alert('Theme saved for this website!');
  } catch (error) {
    console.error('Error saving theme:', error);
    alert('Failed to save theme. Please try again.');
  }
}

// Function to reset theme
async function resetTheme() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab.url || !tab.url.startsWith('http')) {
      alert('Cannot reset theme on this page. Please navigate to a website.');
      return;
    }
    await chrome.tabs.sendMessage(tab.id, { action: 'resetTheme' });
    updateSelectedTheme(null);
  } catch (error) {
    console.error('Error resetting theme:', error);
    alert('Failed to reset theme. Please try again.');
  }
}

// Function to update selected theme visual
function updateSelectedTheme(themeId) {
  document.querySelectorAll('.theme-card').forEach(card => {
    card.classList.remove('selected');
  });

  if (themeId) {
    const selectedCard = document.querySelector(`[data-theme-id="${themeId}"]`);
    if (selectedCard) {
      selectedCard.classList.add('selected');
    }
  }

  selectedThemeId = themeId;
}

// Event listeners
document.getElementById('reset-btn').addEventListener('click', resetTheme);

// Initialize popup
document.addEventListener('DOMContentLoaded', () => {
  renderThemes();
});