// popup.js - Enhanced logic for the advanced popup interface

let selectedThemeId = null;
let customTheme = null;
let extractedColors = [];

// ===== UTILITY FUNCTIONS =====

function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

function syncColorInputs(colorInput, textInput) {
    colorInput.addEventListener('input', (e) => {
        textInput.value = e.target.value.toUpperCase();
        updateCustomPreview();
        updateContrastBadges();
    });

    textInput.addEventListener('input', (e) => {
        const value = e.target.value;
        if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
            colorInput.value = value;
            updateCustomPreview();
            updateContrastBadges();
        }
    });
}

function updateContrastBadges() {
    const bgColor = document.getElementById('bg-color').value;
    const textColor = document.getElementById('text-color').value;
    const badge = document.getElementById('text-contrast');

    const wcag = colorUtils.checkWCAG(textColor, bgColor);
    badge.textContent = wcag.level;
    badge.className = 'contrast-badge ' + wcag.level.toLowerCase();
}

function updateCustomPreview() {
    const preview = document.getElementById('custom-preview');
    const content = preview.querySelector('.preview-content');

    const bgColor = document.getElementById('bg-color').value;
    const textColor = document.getElementById('text-color').value;
    const primaryColor = document.getElementById('primary-color').value;
    const accentColor = document.getElementById('accent-color').value;

    if (content) {
        content.style.backgroundColor = bgColor;
        content.style.color = textColor;

        const heading = content.querySelector('h1');
        if (heading) heading.style.color = textColor;

        const para = content.querySelector('p');
        if (para) para.style.color = textColor;

        const btn = content.querySelector('.preview-btn');
        if (btn) {
            btn.style.backgroundColor = primaryColor;
            btn.style.color = colorUtils.isLight(primaryColor) ? '#000' : '#fff';
        }

        const link = content.querySelector('.preview-link');
        if (link) link.style.color = accentColor;
    }
}

// ===== TAB NAVIGATION =====

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabButtons.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked
            btn.classList.add('active');
            const tabId = 'tab-' + btn.dataset.tab;
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
            }
        });
    });
}

// ===== PRESET THEMES =====

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
        <div class="color-box" style="background-color: ${theme.background}" title="Background: ${theme.background}"></div>
        <div class="color-box" style="background-color: ${theme.primary}" title="Primary: ${theme.primary}"></div>
        <div class="color-box" style="background-color: ${theme.secondary}" title="Secondary: ${theme.secondary}"></div>
        <div class="color-box" style="background-color: ${theme.accent}" title="Accent: ${theme.accent}"></div>
      </div>
      <div class="color-labels">
        <span>BG</span>
        <span>Primary</span>
        <span>Secondary</span>
        <span>Accent</span>
      </div>
      <div class="theme-actions">
        <button class="btn btn-primary apply-btn" data-theme-id="${theme.id}">Apply</button>
        <button class="btn btn-success save-btn" data-theme-id="${theme.id}">Save</button>
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
            showToast('✓ Theme applied!');
        });
    });

    document.querySelectorAll('.save-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const themeId = e.target.dataset.themeId;
            saveThemeForCurrentTab(themeId);
            showToast('✓ Theme saved for this website!');
        });
    });

    document.querySelectorAll('.theme-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('btn')) {
                const themeId = card.dataset.themeId;
                applyThemeToCurrentTab(themeId);
                updateSelectedTheme(themeId);
                showToast('✓ Theme applied!');
            }
        });
    });
}

async function applyThemeToCurrentTab(themeId, customThemeObj = null) {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab.url || !tab.url.startsWith('http')) {
            showToast('⚠️ Cannot apply to this page');
            return;
        }

        const theme = customThemeObj || getTheme(themeId);
        if (!theme) return;

        const css = generateThemeCSS(theme);

        // Remove existing
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                const existing = document.getElementById('color-theme-suggester-styles');
                if (existing) existing.remove();
                const highlight = document.getElementById('highlight-styles');
                if (highlight) highlight.remove();
                if (document.body) {
                    document.body.classList.remove('color-theme-suggester-active');
                }
            }
        });

        // Inject new
        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: (css) => {
                const injectStyles = () => {
                    const style = document.createElement('style');
                    style.id = 'color-theme-suggester-styles';
                    style.textContent = css;
                    document.head.appendChild(style);
                    if (document.body) {
                        document.body.classList.add('color-theme-suggester-active');
                    }
                };

                if (document.readyState === 'loading') {
                    window.addEventListener('DOMContentLoaded', injectStyles, { once: true });
                } else {
                    injectStyles();
                }
            },
            args: [css]
        });
    } catch (error) {
        console.error('Error applying theme:', error);
        showToast('❌ Failed to apply theme');
    }
}

async function saveThemeForCurrentTab(themeId) {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab.url || !tab.url.startsWith('http')) {
            showToast('⚠️ Cannot save for this page');
            return;
        }
        const hostname = new URL(tab.url).hostname;
        await chrome.storage.sync.set({ [hostname]: themeId });
    } catch (error) {
        console.error('Error saving theme:', error);
    }
}

async function resetTheme() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab.url || !tab.url.startsWith('http')) {
            showToast('⚠️ Cannot reset this page');
            return;
        }

        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                const existing = document.getElementById('color-theme-suggester-styles');
                if (existing) existing.remove();
                const highlight = document.getElementById('highlight-styles');
                if (highlight) highlight.remove();
            }
        });

        updateSelectedTheme(null);
        showToast('✓ Theme reset!');
    } catch (error) {
        console.error('Error resetting theme:', error);
        showToast('❌ Failed to reset');
    }
}

async function highlightElements(themeId) {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab.url || !tab.url.startsWith('http')) return;

        const theme = customTheme || getTheme(themeId);
        if (!theme) return;

        const selectors = [
            'body', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'span', 'section', 'article', 'header',
            'footer', 'nav', 'aside', 'main', 'a', 'button', '.btn', 'input', 'textarea', 'select'
        ];

        const highlightCSS = selectors
            .map(sel => `${sel} { outline: 2px solid ${hexToRgba(theme.accent, 0.6)} !important; outline-offset: 0 !important; }`)
            .join('\n');

        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                const existing = document.getElementById('highlight-styles');
                if (existing) existing.remove();
            }
        });

        await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: (css) => {
                const style = document.createElement('style');
                style.id = 'highlight-styles';
                style.textContent = css;
                document.head.appendChild(style);
            },
            args: [highlightCSS]
        });

        showToast('👁️ Elements highlighted!');
    } catch (error) {
        console.error('Error highlighting:', error);
    }
}

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

// ===== CUSTOM THEME CREATOR =====

function initCustomCreator() {
    // Sync color and text inputs
    syncColorInputs(document.getElementById('bg-color'), document.getElementById('bg-color-text'));
    syncColorInputs(document.getElementById('text-color'), document.getElementById('text-color-text'));
    syncColorInputs(document.getElementById('primary-color'), document.getElementById('primary-color-text'));
    syncColorInputs(document.getElementById('secondary-color'), document.getElementById('secondary-color-text'));
    syncColorInputs(document.getElementById('accent-color'), document.getElementById('accent-color-text'));

    // Harmony buttons
    document.querySelectorAll('.btn-harmony').forEach(btn => {
        btn.addEventListener('click', () => {
            const harmony = btn.dataset.harmony;
            const primaryColor = document.getElementById('primary-color').value;
            const palette = aiEngine.generatePaletteFromColor(primaryColor, harmony);

            // Apply palette colors
            if (palette.length >= 2) {
                document.getElementById('primary-color').value = palette[0];
                document.getElementById('primary-color-text').value = palette[0];
                document.getElementById('accent-color').value = palette[1];
                document.getElementById('accent-color-text').value = palette[1];
            }
            if (palette.length >= 3) {
                document.getElementById('secondary-color').value = palette[2];
                document.getElementById('secondary-color-text').value = palette[2];
            }

            updateCustomPreview();
            updateContrastBadges();
            showToast(`✓ ${harmony} colors applied!`);
        });
    });

    // Apply custom theme
    document.getElementById('apply-custom-btn').addEventListener('click', () => {
        customTheme = {
            name: 'Custom',
            background: document.getElementById('bg-color').value,
            text: document.getElementById('text-color').value,
            primary: document.getElementById('primary-color').value,
            secondary: document.getElementById('secondary-color').value,
            accent: document.getElementById('accent-color').value
        };

        applyThemeToCurrentTab(null, customTheme);
        showToast('✓ Custom theme applied!');
    });

    // Save custom theme
    document.getElementById('save-custom-btn').addEventListener('click', async () => {
        customTheme = {
            name: 'Custom',
            background: document.getElementById('bg-color').value,
            text: document.getElementById('text-color').value,
            primary: document.getElementById('primary-color').value,
            secondary: document.getElementById('secondary-color').value,
            accent: document.getElementById('accent-color').value
        };

        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            if (tab.url && tab.url.startsWith('http')) {
                const hostname = new URL(tab.url).hostname;
                await chrome.storage.sync.set({
                    [hostname]: 'custom',
                    'custom_theme': customTheme
                });
                showToast('✓ Custom theme saved!');
            }
        } catch (error) {
            console.error('Error saving custom theme:', error);
        }
    });

    // Initial update
    updateCustomPreview();
    updateContrastBadges();
}

// ===== COLOR EXTRACTION =====

async function extractColorsFromPage() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab.url || !tab.url.startsWith('http')) {
            showToast('⚠️ Cannot extract from this page');
            return;
        }

        const btn = document.getElementById('extract-colors-btn');
        btn.classList.add('loading');
        btn.textContent = 'Extracting...';

        // Extract colors from page
        const colors = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => {
                const colorMap = {};

                // Get all elements
                const elements = document.querySelectorAll('*');

                elements.forEach(el => {
                    const style = window.getComputedStyle(el);

                    // Background color
                    const bg = style.backgroundColor;
                    if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
                        colorMap[bg] = (colorMap[bg] || 0) + 1;
                    }

                    // Text color
                    const color = style.color;
                    if (color) {
                        colorMap[color] = (colorMap[color] || 0) + 1;
                    }
                });

                // Convert to array and sort by frequency
                return Object.entries(colorMap)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 10)
                    .map(([color]) => {
                        // Convert rgb to hex
                        const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
                        if (match) {
                            const r = parseInt(match[1]);
                            const g = parseInt(match[2]);
                            const b = parseInt(match[3]);
                            return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                        }
                        return color;
                    });
            }
        });

        extractedColors = colors[0].result || [];
        displayExtractedColors(extractedColors);

        btn.classList.remove('loading');
        btn.textContent = '🔍 Extract Colors';
        showToast('✓ Colors extracted!');

    } catch (error) {
        console.error('Error extracting colors:', error);
        showToast('❌ Extraction failed');
        const btn = document.getElementById('extract-colors-btn');
        btn.classList.remove('loading');
        btn.textContent = '🔍 Extract Colors';
    }
}

function displayExtractedColors(colors) {
    const container = document.getElementById('extracted-colors');
    container.innerHTML = '';

    colors.forEach(color => {
        const box = document.createElement('div');
        box.className = 'extracted-color-box';
        box.style.backgroundColor = color;
        box.title = color;

        const value = document.createElement('div');
        value.className = 'color-value';
        value.textContent = color;
        box.appendChild(value);

        box.addEventListener('click', () => {
            navigator.clipboard.writeText(color);
            showToast(`✓ Copied ${color}`);
        });

        container.appendChild(box);
    });

    // Show apply button
    document.getElementById('apply-extracted-btn').style.display = 'block';

    // Generate theme from extracted colors
    if (colors.length >= 3) {
        const theme = {
            name: 'Extracted',
            background: colors[0],
            text: colorUtils.isDark(colors[0]) ? '#ffffff' : '#333333',
            primary: colors[1],
            secondary: colors[2],
            accent: colors[3] || colors[1]
        };

        // Ensure accessibility
        const fixedTheme = aiEngine.ensureAccessibility(theme);

        document.getElementById('apply-extracted-btn').addEventListener('click', () => {
            applyThemeToCurrentTab(null, fixedTheme);
            showToast('✓ Extracted theme applied!');
        });
    }
}

// ===== AI FEATURES =====

function initAIFeatures() {
    // Mood selector
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const mood = btn.dataset.mood;
            const theme = aiEngine.generateThemeFromMood(mood);

            if (theme) {
                applyThemeToCurrentTab(null, theme);
                showToast(`✓ ${mood} theme applied!`);
            }
        });
    });

    // Optimize contrast
    document.getElementById('optimize-contrast-btn').addEventListener('click', () => {
        if (!customTheme && !selectedThemeId) {
            showToast('⚠️ Please select a theme first');
            return;
        }

        const theme = customTheme || getTheme(selectedThemeId);
        const optimized = aiEngine.ensureAccessibility(theme, 4.5);
        const analysis = aiEngine.analyzeAccessibility(optimized);

        // Display report
        const report = document.getElementById('accessibility-report');
        report.innerHTML = `
      <div class="report-item">
        <span class="label">Text Contrast:</span>
        <span class="value">${analysis.text.ratio}:1 (${analysis.text.level})</span>
      </div>
      <div class="report-item">
        <span class="label">Primary Contrast:</span>
        <span class="value">${analysis.primary.ratio}:1 (${analysis.primary.level})</span>
      </div>
      <div class="report-item">
        <span class="label">Accent Contrast:</span>
        <span class="value">${analysis.accent.ratio}:1 (${analysis.accent.level})</span>
      </div>
      <div class="report-item">
        <span class="label">Overall:</span>
        <span class="value">${analysis.overall}</span>
      </div>
    `;
        report.classList.add('show');

        applyThemeToCurrentTab(null, optimized);
        showToast('✓ Contrast optimized!');
    });

    // Generate from description
    document.getElementById('generate-from-description-btn').addEventListener('click', () => {
        const description = document.getElementById('theme-description').value;
        if (!description) {
            showToast('⚠️ Please enter a description');
            return;
        }

        const theme = aiEngine.generateThemeFromDescription(description);
        applyThemeToCurrentTab(null, theme);
        showToast('✓ AI theme generated!');
    });

    // Gradient generator
    document.getElementById('generate-gradient-btn').addEventListener('click', () => {
        const direction = document.getElementById('gradient-direction').value;
        const theme = customTheme || (selectedThemeId ? getTheme(selectedThemeId) : null);

        if (!theme) {
            showToast('⚠️ Please select a theme first');
            return;
        }

        const gradient = aiEngine.generateSmartGradient(theme, direction);
        const preview = document.getElementById('gradient-preview');
        preview.style.background = gradient;
        showToast('✓ Gradient generated!');
    });
}

// ===== IMPORT/EXPORT =====

async function exportTheme() {
    const theme = customTheme || (selectedThemeId ? getTheme(selectedThemeId) : null);
    if (!theme) {
        showToast('⚠️ No theme selected');
        return;
    }

    const themeJSON = JSON.stringify(theme, null, 2);

    try {
        await navigator.clipboard.writeText(themeJSON);
        showToast('✓ Theme copied to clipboard!');
    } catch (error) {
        console.error('Export error:', error);
        showToast('❌ Export failed');
    }
}

async function importTheme() {
    try {
        const text = await navigator.clipboard.readText();
        const theme = JSON.parse(text);

        if (theme.background && theme.text && theme.primary) {
            customTheme = theme;
            applyThemeToCurrentTab(null, theme);
            showToast('✓ Theme imported!');
        } else {
            showToast('❌ Invalid theme format');
        }
    } catch (error) {
        console.error('Import error:', error);
        showToast('❌ Import failed');
    }
}

// ===== INITIALIZATION =====

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    renderThemes();
    initCustomCreator();
    initAIFeatures();

    // Global actions
    document.getElementById('reset-btn').addEventListener('click', resetTheme);

    document.getElementById('highlight-btn').addEventListener('click', () => {
        if (selectedThemeId || customTheme) {
            highlightElements(selectedThemeId);
        } else {
            showToast('⚠️ Please select a theme first');
        }
    });

    document.getElementById('export-btn').addEventListener('click', exportTheme);
    document.getElementById('import-btn').addEventListener('click', importTheme);

    document.getElementById('extract-colors-btn').addEventListener('click', extractColorsFromPage);
});