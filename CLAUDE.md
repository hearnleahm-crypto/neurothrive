# NeuroThrive — Claude Guidelines

## Project Overview
NeuroThrive is a premium mental health nutrition app that creates personalized
30-day meal plans based on neuroscience. It connects specific foods to brain
chemistry for 15+ mental health conditions. Single file app (src/App.js),
deployed on Netlify, Supabase for auth/data, Stripe for payments.

## Brand Identity
- **Name**: NeuroThrive — styled as `Neuro` (white #eef0ff) + `Thrive` (blue #7b9fff)
- **Icon**: 🧠 emoji — used across nav, login, branding (plan to replace with custom SVG later)
- **Tagline**: "Feed your brain. Track your growth."
- **Tone**: Science-informed, empowering, premium, calm
- **Always say**: "science-informed" or "informed by neuroscience" — never "science-backed"

## Brand Colors (Dark Theme)
- App background: #0c0e1a
- Card background: #141830
- Primary blue: #7b9fff (headings, links, primary accents, brand text)
- Accent green: #50c878 (success, checkmarks, completion, CTAs)
- Gold/amber: #e8c87a (streaks, warnings, calorie badges)
- Soft purple: #ba68c8 (journal/self-awareness, cycle sync)
- Light text: #eef0ff (primary body text)
- Muted text: #8890b8 (secondary/label text)
- Subtle text: #6b7394 (tertiary/timestamp text)
- Border: rgba(110,120,200,0.15) (card borders, dividers)

## Typography
- Font stack: -apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif
- Headings: 700 weight, tight letter-spacing (-0.3px to -0.5px)
- Body: 13-15px, line-height 1.6-1.7
- Labels/badges: 10-11px, 600-700 weight, uppercase, letter-spacing 1-1.5px

## UI Design Rules
- **Dark mode only** — deep navy backgrounds, never white/light
- Corner radius: 16-20px on cards, 12-14px on buttons
- Gradients: subtle blue/green gradients on featured cards
- Left accent borders: 3px solid colored left border for insight cards
- Section dividers: 1px gradient line (transparent → rgba → transparent)
- Animations: subtle fadeUp, checkPop, checkGlow, confettiDrop — never flashy
- Buttons (primary): gradient background, 14px bold text, 14px border-radius
- Buttons (secondary): transparent bg, colored border, 10-12px text
- Progress bars: 8px height, rounded, gradient fill
- Spacing: generous padding (18-24px on cards)

## Emoji Rules
- **USE emojis** as content identifiers: meal labels (🌅☀️🌙🍎), stat cards (📓😊⚡🔥), tour slides, mood/energy pickers
- **DO NOT use emojis** on buttons or action labels — keep those text-only for premium feel
- **Colored dots** (5-6px circles) replace emojis on data badges (calories, brain score)
- Future plan: replace emojis with custom SVG icons

## Code Rules
- Inline styles only — no CSS classes or external stylesheets
- Pure SVG charts — no chart libraries
- All new components go inside src/App.js unless told otherwise
- Data files: insightData.js, extraInsights.js, extraInsights2.js, exerciseData.js, brainToolkitData.js
- Brain Toolkit data lives in src/brainToolkitData.js — do not modify unless asked
- Never remove existing features when adding new ones
- Always preserve existing Supabase calls and Stripe logic
- Test for mobile layout on every change
- Deploy command: npm run build && npx netlify-cli@17 deploy --prod --dir=build

## Technical Stack
- React (Create React App, single file app)
- Supabase: gobmsfzpryeaqxkfbnfa.supabase.co
- Stripe monthly: price_1T9XQL0aUr06PLRHLEpeRTKp ($12.99/mo)
- Stripe annual: price_1T9XTY0aUr06PLRHoRipqJc6 ($89.99/yr)
- Netlify functions: /.netlify/functions/create-checkout-session
- Netlify site: splendid-tartufo-2404ef.netlify.app
- Domain: neurothriveapp.com (when configured)

## App Store Compliance
- Age rating: 12+
- Medical disclaimer must include "diagnose, treat, cure" language
- Supplements section must include "consult your doctor"
- Privacy policy covers cycle tracking data

## Key Architecture
- generateRecipe() dynamically builds recipes from meal names
- filterMeals() handles dietary restrictions (tag-based + name-based)
- biasPool() + FOOD_PREF_PATTERNS boost "Love It" foods in menu generation
- dailyChecks state tracks meals, routines, exercise, journal — persisted to Supabase
- Meal checkboxes are radio-style when a swapped alt meal exists
- Share card uses Canvas API for PNG generation + Web Share API on mobile
- Cycle sync: 4 phases with 20+ food-specific notes per phase

## What NOT to Do
- Never remove the paywall (isPremium checks must stay intact)
- Never change Stripe price IDs without being asked
- Never use external CSS libraries or Tailwind
- Never break Safari compatibility
- Never use light/white backgrounds — app is dark mode only
- Never add emojis to buttons or action labels
