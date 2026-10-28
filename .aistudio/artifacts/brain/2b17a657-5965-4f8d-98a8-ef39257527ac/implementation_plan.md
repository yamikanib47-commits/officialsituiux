# Autoace Zed - Search Query & Zero-State Selling Flow Plan

Implement true query-parameter-style vehicle phrase passing from the homepage to the multi-step selling flow, ensuring the homepage starts with a clean, greyed-out placeholder rather than pre-filled text, while direct navigation via the top bar presents a clean empty form.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following flow choices have been confirmed and will guide the implementation:

- **Confirmed Decision 1**: The homepage "What are you selling?" input will start completely blank with a greyed-out placeholder (`e.g. 2009 Toyota Mark X`) and quick suggestion chips beneath it. When clicked, suggestion chips populate the input.
- **Confirmed Decision 2**: When a user types a vehicle phrase (e.g., "2009 Toyota Mark X", "2015 Toyota Hilux") and clicks "Value my car", that query phrase is forwarded to `/sellacar` and parses the vehicle's Year, Make, and Model into the multi-step form.
- **Confirmed Decision 3**: When navigating directly via the top navigation bar's "Selling" button (or clicking a fresh Sell link), the query is empty (`""`). Step 1 opens with clean, interactive Year, Make, and Model selectors so users can enter or choose their vehicle specifications from scratch.

---

## 1. Overview & Core Concept

- **What It Does**: Unifies the Autoace Zed car selling workflow between two user entry points:
  1. *Discovery search from Hero*: User enters their vehicle details (or clicks a Zambian market suggestion chip like *Toyota Hilux GD-6*, *Toyota Mark X*, or *Honda Fit*), submits the form, and arrives at `/sellacar` with Make, Model, and Year pre-populated and valuation calculated.
  2. *Direct entry from Header*: User clicks the "Selling" action in the navbar; the wizard opens with a fresh, empty vehicle form ready for manual entry.
- **Target Audience**: Zambian car sellers in Lusaka, Ndola, Kitwe, and across the country seeking fair valuation in Zambian Kwacha (K/ZMW) without unnecessary friction.

---

## 2. User Experience & Visual Design

### Key User Flows

```
[ Homepage Hero ]
   │
   ├── Input empty: Grey placeholder "e.g. 2009 Toyota Mark X"
   ├── Popular Chips: [2009 Toyota Mark X] [2015 Toyota Hilux GD-6] [2010 Honda Fit] ...
   │     └── User clicks chip OR types phrase -> sets carPhrase
   │
   └── Click "Value my car"
         └── navigateToSell(carPhrase)
               │
               ▼
[ /sellacar with Car Phrase ]
   ├── Step 1: Pre-populated Year, Make, Model, Trim & Zambian Kwacha baseline
   ├── Step 2: Custom reserve price (ZMW)
   ├── Step 3: Photo upload checklist
   ├── Step 4: Contact details (Alex Chileshe, +260 97..., Lusaka)
   └── Step 5: Instant listing confirmation

[ Top Nav "Selling" Button ]
   │
   └── navigateToSell("")
         │
         ▼
[ /sellacar with Empty State ]
   ├── Step 1: Clean fields for Year, Make, Model, and Mileage
   │     └── Dynamic valuation calculation updates as fields are filled
   └── Steps 2-5: Identical subsequent pricing, photo, and seller verification flow
```

### Visual Styling & Zero-Pill Discipline
- **Input Styling**: Pure white container with high-contrast text (`text-slate-900 font-bold`) and subtle placeholder styling (`placeholder:text-neutral-400 placeholder:font-normal`).
- **Focus Rings**: Smooth `#8574ff` focus glow on focus-visible.
- **Buttons**: Autoace purple `#8574ff` with `#111111` high-contrast typography, crisp hover transitions (`hover:bg-[#7360f2]`), and subtle scale-down on active press.
- **Typography & Currency**: Strict Zambian Kwacha notation (`K` or `ZMW`) with zero pound/euro remnants.

---

## 3. Key Product Decisions & Trade-Offs

- **State vs. URL Query**:
  - *Chosen Approach*: Track `sellingCarPhrase` state in `App.tsx` and sync with `/sellacar` browser history (`/sellacar?vehicle=...`), falling back smoothly to empty state when no query is present.
  - *Why*: Allows bookmarkable/shareable links while providing instant client-side transitions without full page reloads.
- **Empty Form Experience**:
  - *Chosen Approach*: When `initialCarPhrase` is empty, render clean Year, Make, and Model input/select elements with instant auto-valuation feedback once completed.
  - *Why*: Direct navbar visitors avoid unwanted default assumptions (e.g. assuming they own a Mark X when they might be selling a Ford Ranger or Isuzu D-Max).

---

## 4. Technical Architecture & Component Hierarchy

```
┌────────────────────────────────────────────────────────┐
│                        App.tsx                         │
│  - State: activePage ('home' | 'buy' | 'sell')         │
│  - State: sellingCarPhrase (string, default: "")       │
│  - navigateToSell(phrase?: string) -> sets phrase      │
└──────────┬─────────────────────────────────┬───────────┘
           │                                 │
           ▼                                 ▼
┌──────────────────────────┐    ┌──────────────────────────┐
│        Header.tsx        │    │      HeroBanner.tsx      │
│ - Selling nav click:     │    │ - Input starts: ""       │
│   navigateToSell("")     │    │ - Placeholder: greyed    │
│                          │    │ - Chips fill input       │
│                          │    │ - Submit:                │
│                          │    │   navigateToSell(phrase) │
└──────────────────────────┘    └──────────────────────────┘
                                             │
                                             ▼
                                ┌──────────────────────────┐
                                │     SellACarPage.tsx     │
                                │ - If phrase provided:    │
                                │   populate Year/Make/Mod │
                                │ - If phrase is empty:    │
                                │   render clean inputs    │
                                └──────────────────────────┘
```

### Implementation Checklist
1. **`src/components/HeroBanner.tsx`**:
   - Change `const [carPhrase, setCarPhrase] = useState('')` (empty initial state).
   - Keep placeholder as `"e.g. 2009 Toyota Mark X"` with grey text styling.
   - When submitting, if input is empty, either highlight placeholder or forward empty/user-provided value.
   - Retain suggestion chips that populate `carPhrase` on click.
2. **`src/App.tsx`**:
   - Initialize `sellingCarPhrase` to `""`.
   - Update `navigateToSell`: `setSellingCarPhrase(carPhrase || '')`.
   - Support URL search param `?q=` or `?car=` if present on page load.
3. **`src/pages/SellACarPage.tsx`**:
   - Handle empty `initialCarPhrase`:
     - If empty, set `make: ''`, `model: ''`, `year: ''` with clean editable inputs or dropdowns in Step 1.
     - If provided, parse Year, Make, Model, and calculate the estimated Kwacha valuation.
   - Ensure "Next" button in Step 1 validates that Make and Model are provided before proceeding to Slide 2 (Pricing).
