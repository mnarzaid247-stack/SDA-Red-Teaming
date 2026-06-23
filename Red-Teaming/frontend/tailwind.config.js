/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // الهوية السيبرانية الأساسية ---
        "background": "#05070f",             // سواد عميق جداً يبرز خلفية الـ Grid والنيون
        "surface": "#0b0e17",                // لون الكروت الأساسية (أغمق وأكثر حدة)
        "surface-dim": "#05070f",
        "surface-container-lowest": "#020408",
        "surface-container-low": "#080b13",
        "surface-container": "#0f1322",       // الحاويات المتوسطة
        "surface-container-high": "#141a2e",  // الحاويات البارزة
        "surface-container-highest": "#1c233e",

        // --- الأخضر النيون المتوهج (Cyberpunk Neon Green) ---
        "primary": "#00ff9d",                 // أخضر فوسفوري يشع بقوة
        "surface-tint": "#00ff9d",
        "primary-fixed-dim": "#00ff9d",
        "primary-fixed": "#33ffb1",
        "primary-container": "#003820",       // أخضر داكن جداً كخلفية تحت النيون

        // --- النصوص (تباين أعلى ومريح للعين) ---
        "on-background": "#e2e8f0",           // أبيض كريمي واضح جداً على السواد
        "on-surface": "#f1f5f9",
        "on-surface-variant": "#94a3b8",
        "inverse-surface": "#e2e8f0",

        // --- باقي لوحة الألوان المساعدة والأخطاء (تم ضبط تباينها مع السواد الجديد) ---
        "on-error-container": "#ffdad6",
        "on-tertiary-fixed": "#2a1700",
        "on-primary-container": "#00ff9d",
        "outline": "#475569",
        "on-primary-fixed": "#002113",
        "inverse-primary": "#006c49",
        "tertiary-container": "#e29100",
        "on-error": "#690005",
        "on-secondary": "#68000a",
        "inverse-on-surface": "#0b0e17",
        "on-secondary-container": "#ffaea8",
        "secondary-fixed-dim": "#ffb3ad",
        "error": "#ffb4ab",
        "error-container": "#93000a",
        "on-primary-fixed-variant": "#005236",
        "on-secondary-fixed": "#410004",
        "secondary-container": "#a40217",
        "on-primary": "#003824",
        "tertiary-fixed": "#ffddb8",
        "on-tertiary-fixed-variant": "#653e00",
        "secondary-fixed": "#ffdad7",
        "tertiary": "#ffb95f",
        "on-secondary-fixed-variant": "#930013",
        "tertiary-fixed-dim": "#ffb95f",
        "outline-variant": "#1e293b",
        "on-tertiary": "#472a00",
        "secondary": "#ffb3ad",
        "on-tertiary-container": "#523200",
        "surface-variant": "#141a2e",
        "surface-bright": "#1c233e",
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem"
      },
      spacing: {
        "section-gap": "64px",
        "gutter": "24px",
        "container-padding-desktop": "40px",
        "container-padding-mobile": "20px",
        "unit": "8px"
      },
      fontFamily: {
        "sans": ["Inter", "sans-serif"]
      },
      fontSize: {
        "headline-lg-mobile": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
        "code-sm": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "display-metrics": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600" }]
      }
    }
  },
  plugins: [],
}