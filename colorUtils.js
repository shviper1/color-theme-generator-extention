// colorUtils.js - Advanced color manipulation utilities

/**
 * Convert hex color to RGB
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Convert RGB to hex
 */
function rgbToHex(r, g, b) {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

/**
 * Convert hex to HSL
 */
function hexToHsl(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * Convert HSL to hex
 */
function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }

  const rHex = Math.round((r + m) * 255);
  const gHex = Math.round((g + m) * 255);
  const bHex = Math.round((b + m) * 255);

  return rgbToHex(rHex, gHex, bHex);
}

/**
 * Calculate relative luminance (for WCAG contrast)
 */
function getRelativeLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;
  
  const rsRGB = rgb.r / 255;
  const gsRGB = rgb.g / 255;
  const bsRGB = rgb.b / 255;

  const r = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculate contrast ratio between two colors
 */
function getContrastRatio(hex1, hex2) {
  const lum1 = getRelativeLuminance(hex1);
  const lum2 = getRelativeLuminance(hex2);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check WCAG compliance
 */
function checkWCAG(foreground, background) {
  const ratio = getContrastRatio(foreground, background);
  return {
    ratio: ratio.toFixed(2),
    aa: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaa: ratio >= 7,
    aaaLarge: ratio >= 4.5,
    level: ratio >= 7 ? 'AAA' : ratio >= 4.5 ? 'AA' : 'FAIL'
  };
}

/**
 * Generate complementary color
 */
function getComplementary(hex) {
  const hsl = hexToHsl(hex);
  if (!hsl) return hex;
  
  const newH = (hsl.h + 180) % 360;
  return hslToHex(newH, hsl.s, hsl.l);
}

/**
 * Generate analogous colors
 */
function getAnalogous(hex) {
  const hsl = hexToHsl(hex);
  if (!hsl) return [hex, hex, hex];
  
  const color1 = hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l);
  const color2 = hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l);
  
  return [color1, hex, color2];
}

/**
 * Generate triadic colors
 */
function getTriadic(hex) {
  const hsl = hexToHsl(hex);
  if (!hsl) return [hex, hex, hex];
  
  const color1 = hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l);
  const color2 = hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l);
  
  return [hex, color1, color2];
}

/**
 * Generate tetradic colors
 */
function getTetradic(hex) {
  const hsl = hexToHsl(hex);
  if (!hsl) return [hex, hex, hex, hex];
  
  const color1 = hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l);
  const color2 = hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l);
  const color3 = hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l);
  
  return [hex, color1, color2, color3];
}

/**
 * Generate monochromatic colors
 */
function getMonochromatic(hex) {
  const hsl = hexToHsl(hex);
  if (!hsl) return [hex, hex, hex, hex, hex];
  
  return [
    hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 30)),
    hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 15)),
    hex,
    hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 15)),
    hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 30))
  ];
}

/**
 * Lighten a color
 */
function lighten(hex, percent) {
  const hsl = hexToHsl(hex);
  if (!hsl) return hex;
  
  const newL = Math.min(100, hsl.l + percent);
  return hslToHex(hsl.h, hsl.s, newL);
}

/**
 * Darken a color
 */
function darken(hex, percent) {
  const hsl = hexToHsl(hex);
  if (!hsl) return hex;
  
  const newL = Math.max(0, hsl.l - percent);
  return hslToHex(hsl.h, hsl.s, newL);
}

/**
 * Saturate a color
 */
function saturate(hex, percent) {
  const hsl = hexToHsl(hex);
  if (!hsl) return hex;
  
  const newS = Math.min(100, hsl.s + percent);
  return hslToHex(hsl.h, newS, hsl.l);
}

/**
 * Desaturate a color
 */
function desaturate(hex, percent) {
  const hsl = hexToHsl(hex);
  if (!hsl) return hex;
  
  const newS = Math.max(0, hsl.s - percent);
  return hslToHex(hsl.h, newS, hsl.l);
}

/**
 * Auto-fix contrast for accessibility
 */
function autoFixContrast(foreground, background, targetRatio = 4.5) {
  let currentRatio = getContrastRatio(foreground, background);
  
  if (currentRatio >= targetRatio) {
    return foreground;
  }
  
  const fgLum = getRelativeLuminance(foreground);
  const bgLum = getRelativeLuminance(background);
  
  const hsl = hexToHsl(foreground);
  if (!hsl) return foreground;
  
  // Try darkening or lightening
  let newColor = foreground;
  
  if (bgLum > fgLum) {
    // Background is lighter, darken foreground
    for (let i = 5; i <= 90; i += 5) {
      newColor = hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - i));
      if (getContrastRatio(newColor, background) >= targetRatio) {
        return newColor;
      }
    }
  } else {
    // Background is darker, lighten foreground
    for (let i = 5; i <= 90; i += 5) {
      newColor = hslToHex(hsl.h, hsl.s, Math.min(100, hsl.l + i));
      if (getContrastRatio(newColor, background) >= targetRatio) {
        return newColor;
      }
    }
  }
  
  return newColor;
}

/**
 * Extract dominant colors from an image
 */
function extractColorsFromImage(imageData, colorCount = 5) {
  const pixels = imageData.data;
  const pixelCount = pixels.length / 4;
  const colorMap = {};
  
  // Sample pixels
  for (let i = 0; i < pixelCount; i += 10) {
    const r = pixels[i * 4];
    const g = pixels[i * 4 + 1];
    const b = pixels[i * 4 + 2];
    const a = pixels[i * 4 + 3];
    
    // Skip transparent pixels
    if (a < 125) continue;
    
    // Quantize colors
    const qr = Math.round(r / 32) * 32;
    const qg = Math.round(g / 32) * 32;
    const qb = Math.round(b / 32) * 32;
    
    const key = `${qr},${qg},${qb}`;
    colorMap[key] = (colorMap[key] || 0) + 1;
  }
  
  // Sort by frequency
  const sortedColors = Object.entries(colorMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, colorCount)
    .map(([color]) => {
      const [r, g, b] = color.split(',').map(Number);
      return rgbToHex(r, g, b);
    });
  
  return sortedColors;
}

/**
 * Generate random color
 */
function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

/**
 * Check if color is light
 */
function isLight(hex) {
  return getRelativeLuminance(hex) > 0.5;
}

/**
 * Check if color is dark
 */
function isDark(hex) {
  return getRelativeLuminance(hex) <= 0.5;
}

// Export functions
window.colorUtils = {
  hexToRgb,
  rgbToHex,
  hexToHsl,
  hslToHex,
  getRelativeLuminance,
  getContrastRatio,
  checkWCAG,
  getComplementary,
  getAnalogous,
  getTriadic,
  getTetradic,
  getMonochromatic,
  lighten,
  darken,
  saturate,
  desaturate,
  autoFixContrast,
  extractColorsFromImage,
  randomColor,
  isLight,
  isDark
};
