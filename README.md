# CalcNest · Luxury Edition

A responsive, zero-build, all-in-one calculator website built with HTML, CSS, and vanilla JavaScript. The website includes 46 calculators across Health, Finance, Business, Math, Time, Converters, and Everyday categories.

## Open the website

Extract the ZIP and open `calculator-hub/index.html` in your browser. For a local server, run `python -m http.server 8000` inside `calculator-hub`, then open `http://localhost:8000`.

No database, framework, or installation is required. All calculators except currency conversion work offline. Google Fonts are optional; system fonts are used when offline.

## New visual experience

- Four non-white jewel-tone themes: Midnight (navy/violet), Aurora (teal/mint), Royal Plum (purple/rose), and Amber Noir (espresso/gold).
- The palette switcher is in the header. The preference is saved in localStorage when the browser allows it.
- Silk Aurora replaces the old spotlight glow with three large, softly blended color clouds. They follow the mouse at separate, gentle speeds and breathe slowly when idle. The effect matches the chosen palette, never intercepts clicks, and is disabled on touch-only devices and when reduced motion is preferred.
- Smooth anchor scrolling, an upper-page scroll progress indicator, staggered section/card reveals, a subtle hero parallax effect, a four-card discovery grid with no horizontal scrolling, and a back-to-top control.
- A slow animated typographic ribbon, hover highlights, dynamic card finishes, and themed calculator dialogs.
- The page remains usable without JavaScript animation APIs; `prefers-reduced-motion` disables decorative animation and smooth scrolling.
- Mobile layouts include a swipeable calculator-category row and a fully visible, two-column discovery grid.

## Calculator behavior retained

- **Currency Converter:** Frankfurter v2 primary reference-rate endpoint and open ExchangeRate-API fallback. The browser requires network access to these providers. The data is indicative, not a bank's transaction quote.
- **Calorie Calculator:** select kg or lb, and cm or ft/in; switching units converts the values in the inputs. The estimate is based on the Mifflin–St Jeor equation and is not medical advice.
- All other calculators, searching, category filtering, and quick-launch cards retain their existing calculations.

## Editing

- `index.html` — navigation, hero, quick-launch cards, four-card discovery grid, library, dialog.
- `styles.css` — layouts, four themes, animation rules, and responsive design.
- `app.js` — original calculators, filtering, theme switching, scroll effects, and inputs.
- `extra-calculators.js` — 30 new calculator formulas, input checks, and rich result panels.

To add another calculator, register an entry in `tools` inside `app.js`, then implement its calculation in `extra-calculators.js` and add the ID to `extraCalculatorIds`. If you add a new category, update `renderTabs` in `app.js`.

Health and finance results are estimates and should not replace professional advice where appropriate.

## Sleep Calculator

Health → Sleep Calculator estimates bedtimes or wake-up times from a selected time or the current local time. Supports a 0–120 minute fall-asleep buffer, 12/24-hour formats, day-boundary labels, and 3–6 nominal 90-minute cycles. The 5–6 cycle options are visually highlighted; cycle timing is only an estimate and does not replace adequate total sleep. All calculations run locally.


## Calculator opening and closing animation

Click any calculator card, popular shortcut, or featured tile to see a soft zoom-in from that item. Use **Back to home**, the × button, the backdrop, or Escape to zoom out to the originating card while keeping your current scroll position. When the operating system/browser requests reduced motion, transitions are skipped. The original 16 calculator formulas are unchanged.


## 30 added calculators · 46 total

- **Finance:** Mortgage, Investment, Simple Interest, Salary / Hourly Wage, Retirement.
- **Business:** Sales Tax, GST, VAT, Profit Margin, Break-Even. All tax rates are entered by the visitor; the website does not provide jurisdiction-specific tax rules.
- **Time:** Time, Time Zone Converter, Date Calculator, Hours & Minutes, Age Difference. The time-zone converter uses your browser's built-in IANA time-zone database (including applicable daylight-saving changes); ambiguous clock times use the earlier occurrence, and missing times are rejected.
- **Math:** Average, Fraction, Scientific, Area, Volume. The scientific calculator uses a constrained expression parser, never `eval`, and supports powers, roots, logarithms, factorials, degrees/radians and trig functions.
- **Converters / Everyday:** Length, Weight, Temperature, Speed, Distance.
- **Health:** Pace, Pregnancy Due Date, BMR, Body Fat, Ideal Weight. All medical- and fitness-related numbers are estimates and not diagnoses, treatment targets, or substitutes for professional guidance.

### New design details

The new tools use a gradient result hero, compact result-breakdown tiles, clear input labels, shape selectors, a scientific keypad, and adaptive mobile layouts. All retain the four luxury palettes, responsive calculator-card grid, Silk Aurora pointer glow, and card-to-dialog zoom animations. Existing calculators remain unchanged.
