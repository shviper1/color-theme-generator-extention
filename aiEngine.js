// aiEngine.js - AI-powered color generation and analysis

/**
 * Mood-based color palettes (AI-inspired presets)
 */
const MOOD_PALETTES = {
    professional: {
        palettes: [
            { bg: '#FFFFFF', text: '#1F2937', primary: '#3B82F6', secondary: '#F3F4F6', accent: '#10B981' },
            { bg: '#F9FAFB', text: '#111827', primary: '#6366F1', secondary: '#E5E7EB', accent: '#8B5CF6' },
            { bg: '#FFFFFF', text: '#374151', primary: '#0EA5E9', secondary: '#F1F5F9', accent: '#06B6D4' }
        ]
    },
    energetic: {
        palettes: [
            { bg: '#FEF3C7', text: '#92400E', primary: '#F59E0B', secondary: '#FDE68A', accent: '#EF4444' },
            { bg: '#FFF7ED', text: '#9A3412', primary: '#F97316', secondary: '#FFEDD5', accent: '#DC2626' },
            { bg: '#FFEDD5', text: '#7C2D12', primary: '#EA580C', secondary: '#FED7AA', accent: '#F97316' }
        ]
    },
    calm: {
        palettes: [
            { bg: '#F0F9FF', text: '#0C4A6E', primary: '#0284C7', secondary: '#E0F2FE', accent: '#06B6D4' },
            { bg: '#ECFDF5', text: '#065F46', primary: '#059669', secondary: '#D1FAE5', accent: '#10B981' },
            { bg: '#F5F3FF', text: '#5B21B6', primary: '#7C3AED', secondary: '#EDE9FE', accent: '#A78BFA' }
        ]
    },
    playful: {
        palettes: [
            { bg: '#FDF4FF', text: '#86198F', primary: '#D946EF', secondary: '#FAE8FF', accent: '#F0ABFC' },
            { bg: '#FFF1F2', text: '#9F1239', primary: '#F43F5E', secondary: '#FFE4E6', accent: '#FB7185' },
            { bg: '#FEF2F2', text: '#991B1B', primary: '#EF4444', secondary: '#FEE2E2', accent: '#F87171' }
        ]
    },
    elegant: {
        palettes: [
            { bg: '#FAFAF9', text: '#1C1917', primary: '#78716C', secondary: '#F5F5F4', accent: '#A8A29E' },
            { bg: '#FAFAFA', text: '#171717', primary: '#737373', secondary: '#F5F5F5', accent: '#A3A3A3' },
            { bg: '#F8FAFC', text: '#0F172A', primary: '#475569', secondary: '#F1F5F9', accent: '#64748B' }
        ]
    },
    bold: {
        palettes: [
            { bg: '#18181B', text: '#FAFAFA', primary: '#A855F7', secondary: '#27272A', accent: '#C026D3' },
            { bg: '#0F172A', text: '#F8FAFC', primary: '#3B82F6', secondary: '#1E293B', accent: '#06B6D4' },
            { bg: '#1E1B4B', text: '#E0E7FF', primary: '#818CF8', secondary: '#312E81', accent: '#A78BFA' }
        ]
    }
};

/**
 * Generate theme from description using keyword matching
 */
function generateThemeFromDescription(description) {
    const lowerDesc = description.toLowerCase();

    // Keywords for different moods
    const keywords = {
        dark: ['dark', 'night', 'black', 'midnight'],
        light: ['light', 'bright', 'white', 'clean'],
        blue: ['blue', 'ocean', 'sky', 'water'],
        green: ['green', 'nature', 'forest', 'earth'],
        purple: ['purple', 'violet', 'lavender'],
        red: ['red', 'fire', 'passion', 'warm'],
        orange: ['orange', 'sunset', 'autumn'],
        pink: ['pink', 'rose', 'romantic'],
        professional: ['professional', 'business', 'corporate'],
        playful: ['playful', 'fun', 'vibrant', 'colorful'],
        elegant: ['elegant', 'sophisticated', 'minimal', 'simple'],
        modern: ['modern', 'contemporary', 'sleek']
    };

    // Base theme object
    let theme = {
        name: 'AI Generated',
        background: '#ffffff',
        text: '#333333',
        primary: '#3b82f6',
        secondary: '#f3f4f6',
        accent: '#10b981'
    };

    // Check for dark/light preference
    if (keywords.dark.some(k => lowerDesc.includes(k))) {
        theme.background = '#1a1a1a';
        theme.text = '#ffffff';
        theme.secondary = '#2d2d2d';
    }

    // Check for color preferences
    if (keywords.blue.some(k => lowerDesc.includes(k))) {
        theme.primary = '#3b82f6';
        theme.accent = '#06b6d4';
    } else if (keywords.green.some(k => lowerDesc.includes(k))) {
        theme.primary = '#10b981';
        theme.accent = '#059669';
    } else if (keywords.purple.some(k => lowerDesc.includes(k))) {
        theme.primary = '#8b5cf6';
        theme.accent = '#a78bfa';
    } else if (keywords.red.some(k => lowerDesc.includes(k))) {
        theme.primary = '#ef4444';
        theme.accent = '#f87171';
    } else if (keywords.orange.some(k => lowerDesc.includes(k))) {
        theme.primary = '#f59e0b';
        theme.accent = '#fb923c';
    } else if (keywords.pink.some(k => lowerDesc.includes(k))) {
        theme.primary = '#ec4899';
        theme.accent = '#f472b6';
    }

    // Check for contrast preference
    if (lowerDesc.includes('high contrast') || lowerDesc.includes('contrast')) {
        theme.text = colorUtils.isDark(theme.background) ? '#ffffff' : '#000000';
        theme = ensureAccessibility(theme);
    }

    return theme;
}

/**
 * Generate theme from mood
 */
function generateThemeFromMood(mood) {
    const moodData = MOOD_PALETTES[mood];
    if (!moodData) return null;

    // Pick a random palette from the mood
    const palette = moodData.palettes[Math.floor(Math.random() * moodData.palettes.length)];

    return {
        name: `${mood.charAt(0).toUpperCase() + mood.slice(1)} AI`,
        background: palette.bg,
        text: palette.text,
        primary: palette.primary,
        secondary: palette.secondary,
        accent: palette.accent
    };
}

/**
 * Ensure theme meets accessibility standards
 */
function ensureAccessibility(theme, targetRatio = 4.5) {
    const newTheme = { ...theme };

    // Fix text contrast
    const textContrast = colorUtils.getContrastRatio(theme.text, theme.background);
    if (textContrast < targetRatio) {
        newTheme.text = colorUtils.autoFixContrast(theme.text, theme.background, targetRatio);
    }

    // Ensure primary has good contrast on background
    const primaryContrast = colorUtils.getContrastRatio(theme.primary, theme.background);
    if (primaryContrast < 3) {
        newTheme.primary = colorUtils.autoFixContrast(theme.primary, theme.background, 3);
    }

    // Ensure accent has good contrast on background
    const accentContrast = colorUtils.getContrastRatio(theme.accent, theme.background);
    if (accentContrast < 3) {
        newTheme.accent = colorUtils.autoFixContrast(theme.accent, theme.background, 3);
    }

    return newTheme;
}

/**
 * Analyze theme accessibility
 */
function analyzeAccessibility(theme) {
    const textCheck = colorUtils.checkWCAG(theme.text, theme.background);
    const primaryCheck = colorUtils.checkWCAG(theme.primary, theme.background);
    const accentCheck = colorUtils.checkWCAG(theme.accent, theme.background);

    return {
        text: textCheck,
        primary: primaryCheck,
        accent: accentCheck,
        overall: textCheck.aa && primaryCheck.aaLarge && accentCheck.aaLarge ? 'PASS' : 'FAIL'
    };
}

/**
 * Generate gradient from two colors
 */
function generateGradient(color1, color2, direction = '135deg', steps = 5) {
    const colors = [];

    // Get HSL values
    const hsl1 = colorUtils.hexToHsl(color1);
    const hsl2 = colorUtils.hexToHsl(color2);

    if (!hsl1 || !hsl2) {
        return `linear-gradient(${direction}, ${color1}, ${color2})`;
    }

    // Interpolate between colors
    for (let i = 0; i < steps; i++) {
        const ratio = i / (steps - 1);
        const h = hsl1.h + (hsl2.h - hsl1.h) * ratio;
        const s = hsl1.s + (hsl2.s - hsl1.s) * ratio;
        const l = hsl1.l + (hsl2.l - hsl1.l) * ratio;
        colors.push(colorUtils.hslToHex(h, s, l));
    }

    const colorStops = colors.map((color, i) => {
        const position = (i / (colors.length - 1)) * 100;
        return `${color} ${position}%`;
    }).join(', ');

    return `linear-gradient(${direction}, ${colorStops})`;
}

/**
 * Generate smart gradient based on theme
 */
function generateSmartGradient(theme, direction = '135deg') {
    // Create smooth gradient using primary and accent with intermediate steps
    return generateGradient(theme.primary, theme.accent, direction, 5);
}

/**
 * Suggest complementary theme variations
 */
function suggestVariations(theme) {
    const variations = [];

    // Lighter variation
    variations.push({
        name: 'Light Variation',
        background: colorUtils.lighten(theme.background, 5),
        text: theme.text,
        primary: colorUtils.lighten(theme.primary, 10),
        secondary: colorUtils.lighten(theme.secondary, 5),
        accent: colorUtils.lighten(theme.accent, 10)
    });

    // Darker variation
    variations.push({
        name: 'Dark Variation',
        background: colorUtils.darken(theme.background, 5),
        text: theme.text,
        primary: colorUtils.darken(theme.primary, 10),
        secondary: colorUtils.darken(theme.secondary, 5),
        accent: colorUtils.darken(theme.accent, 10)
    });

    // More saturated
    variations.push({
        name: 'Vibrant Variation',
        background: theme.background,
        text: theme.text,
        primary: colorUtils.saturate(theme.primary, 20),
        secondary: theme.secondary,
        accent: colorUtils.saturate(theme.accent, 20)
    });

    // Less saturated
    variations.push({
        name: 'Muted Variation',
        background: theme.background,
        text: theme.text,
        primary: colorUtils.desaturate(theme.primary, 20),
        secondary: theme.secondary,
        accent: colorUtils.desaturate(theme.accent, 20)
    });

    return variations;
}

/**
 * Generate color palette from single color
 */
function generatePaletteFromColor(baseColor, harmony = 'complementary') {
    let colors = [];

    switch (harmony) {
        case 'complementary':
            colors = [baseColor, colorUtils.getComplementary(baseColor)];
            break;
        case 'analogous':
            colors = colorUtils.getAnalogous(baseColor);
            break;
        case 'triadic':
            colors = colorUtils.getTriadic(baseColor);
            break;
        case 'tetradic':
            colors = colorUtils.getTetradic(baseColor);
            break;
        case 'monochromatic':
            colors = colorUtils.getMonochromatic(baseColor);
            break;
        default:
            colors = [baseColor];
    }

    return colors;
}

/**
 * Generate complete theme from base color and harmony
 */
function generateThemeFromColor(baseColor, harmony = 'analogous') {
    const palette = generatePaletteFromColor(baseColor, harmony);

    // Determine if we should use dark or light background
    const isBaseLight = colorUtils.isLight(baseColor);

    return {
        name: `${harmony.charAt(0).toUpperCase() + harmony.slice(1)} Theme`,
        background: isBaseLight ? '#ffffff' : '#1a1a1a',
        text: isBaseLight ? '#333333' : '#ffffff',
        primary: palette[0],
        secondary: isBaseLight ? '#f5f5f5' : '#2d2d2d',
        accent: palette[1] || colorUtils.getComplementary(baseColor)
    };
}

/**
 * AI-powered color name generator
 */
function getColorName(hex) {
    const hsl = colorUtils.hexToHsl(hex);
    if (!hsl) return 'Unknown';

    const { h, s, l } = hsl;

    // Determine color family
    let colorName = '';

    if (s < 10) {
        if (l > 90) return 'White';
        if (l < 10) return 'Black';
        return 'Gray';
    }

    if (h >= 0 && h < 15) colorName = 'Red';
    else if (h >= 15 && h < 45) colorName = 'Orange';
    else if (h >= 45 && h < 70) colorName = 'Yellow';
    else if (h >= 70 && h < 150) colorName = 'Green';
    else if (h >= 150 && h < 200) colorName = 'Cyan';
    else if (h >= 200 && h < 260) colorName = 'Blue';
    else if (h >= 260 && h < 290) colorName = 'Purple';
    else if (h >= 290 && h < 330) colorName = 'Magenta';
    else colorName = 'Red';

    // Add modifiers
    if (l < 30) colorName = 'Dark ' + colorName;
    else if (l > 70) colorName = 'Light ' + colorName;

    if (s < 30) colorName = 'Muted ' + colorName;
    else if (s > 70) colorName = 'Vibrant ' + colorName;

    return colorName;
}

// Export AI engine functions
window.aiEngine = {
    MOOD_PALETTES,
    generateThemeFromDescription,
    generateThemeFromMood,
    ensureAccessibility,
    analyzeAccessibility,
    generateGradient,
    generateSmartGradient,
    suggestVariations,
    generatePaletteFromColor,
    generateThemeFromColor,
    getColorName
};
