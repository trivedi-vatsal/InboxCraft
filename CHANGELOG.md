# inboxcraft

## 0.9.0 - Mar 31, 2026

### Minor Changes

- Mobile viewport fix, em dash cleanup, and template action picker.

  ### New

  - **Rule action picker in template modal** - the Download Script modal in the Templates library now shows a Copy / Move toggle so users can choose the rule action before downloading. Previously hardcoded to Copy.

  ### Fixed

  - **Mobile zoom-out** - added `minimum-scale=1.0` to the viewport meta tag and `overflow-x-hidden` to the body to prevent wide content from triggering browser zoom-out on mobile.
  - **Autofill conflict on Quick Generator** - M365 Email field set to `autoComplete="email"`, Sender Email field set to `autoComplete="off"` to prevent both inputs being filled simultaneously.

  ### Changed

  - **Em dash cleanup** - replaced all typographic em dashes (`—`) with hyphens (`-`) across the codebase for consistency. The placeholder dash in the rules preview table is preserved.

## 0.8.1 - Mar 31, 2026

### Patch Changes

- Rule action picker in template modal, autofill fix, and GitHub Actions Node 24 upgrade.

  ### New

  - **Rule action picker in template modal** — the "Download Script" modal in Templates now shows a Copy / Move toggle so users can choose the rule action before downloading. Previously hardcoded to Copy.

  ### Fixed

  - **Autofill conflict on Quick Generator** — M365 Email field set to `autoComplete="email"`, Sender Email field set to `autoComplete="off"` to prevent the browser from filling both inputs with the same address.

  ### CI

  - **GitHub Actions Node 24** — removed `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24` env flag; `actions/upload-pages-artifact` bumped to `@v4` (Node 24-native). All other actions already at `@v5`.

## 0.8.0 - Mar 31, 2026

### Patch Changes

- PostHog analytics, script confirmation prompt, Privacy Policy redesign, llms.txt, and CI improvements.

  ### New

  - **PostHog analytics** — anonymous, aggregated usage tracking via PostHog (page views, feature usage, masked session recordings). No form content is ever captured. Configured via `VITE_POSTHOG_KEY` / `VITE_POSTHOG_HOST` env vars. `.env.example` added.
  - **Script confirmation prompt** — generated PowerShell scripts now display a formatted summary table of all rules and ask `Do you want to proceed? (Y/N)` before making any changes.
  - **Script attribution header** — `# Source: https://github.com/trivedi-vatsal/InboxCraft` added to generated script headers.
  - **`public/llms.txt`** — LLM discoverability file added; linked in footer navigation.

  ### Changed

  - **Privacy Policy page** — redesigned with a two-column stripe layout (sticky section labels + content). "Zero Analytics & Tracking" section replaced with an accurate "Anonymous Analytics" section describing PostHog usage.
  - **Privacy Policy badge** — updated from "No telemetry" to "Anonymous analytics only".
  - **README** — security section updated to disclose PostHog analytics with a link to the Privacy Policy.
  - **`vite.config.ts`** — refactored to factory-function form using `loadEnv` to inject PostHog env vars at build time.

  ### CI

  - **`deploy.yml`** — all GitHub Actions bumped to `@v5` (`checkout`, `setup-node`, `configure-pages`, `deploy-pages`). Build step now injects `VITE_POSTHOG_KEY` and `VITE_POSTHOG_HOST` from GitHub Actions secrets.

## 0.7.0 - Mar 31, 2026

### Minor Changes

- Homepage redesign, new pages, live changelog rendering, and social assets.

  ### New

  - **Homepage UI overhaul** — `src/pages/HomePage.tsx` rebuilt from scratch using composable section components: `Hero`, `HeroBackground`, `Features`, `HowItWorks`, `QuickGenerator`, `Cta`, and `Faq`. Each section lives in `src/components/ui/`.
  - **`src/pages/ChangelogPage.tsx`** — live changelog route (`/#/changelog`) that compiles `CHANGELOG.md` at runtime via Vite's `?raw` import and renders it with `react-markdown` mapped to Tailwind UI components.
  - **`src/pages/PrivacyPolicyPage.tsx`** — dedicated privacy policy page (`/#/privacy`).
  - **`scripts/add-changelog-date.js`** — utility script that stamps release dates onto CHANGELOG entries automatically.
  - **Social assets** — `public/banner.png` and `public/og-image.png` added for README and Open Graph metadata; `public/banner-v2.svg` added as an alternate banner variant.

  ### Changed

  - **`src/components/AppHeader.tsx`** — full redesign with scroll-aware backdrop blur, animated slide-down entrance, responsive mobile menu with dark mode toggle, and centered desktop nav.
  - **`public/banner.svg`** — logo updated to match the site's filled-envelope style (white body + indigo flap overlay); ACTION column removed from the Rules Preview table mock and MATCH column moved into its place.
  - **`README.md`** — `banner.png` added at the top of the file.
  - **`tailwind.config.js`** — extended with animation utilities and additional theme tokens required by the new homepage sections.
  - **`package.json`** — version bumped to `0.7.0`; `react-markdown` added as a dependency.

  ### Fixed

  - Fixed inline `code` elements incorrectly inheriting `pre-wrap` block styling in the changelog renderer.
  - Tightened regex to strip Changesets metadata headings (e.g. `### Minor Changes`) before the markdown renderer processes them.

## 0.6.0 - Mar 30, 2026

### Minor Changes

- Full routing redesign, YAML template library, and homepage showcase.

  ### New

  - **Multi-page routing** — HashRouter with three dedicated routes: `/#/` (Generator), `/#/advanced` (Advanced mode), `/#/templates` (Templates gallery). `ScrollToTop` resets scroll position on every navigation.
  - **`src/pages/HomePage.tsx`** — redesigned landing page with animated headline, mock UI showcase (Outlook client, Advanced form, folder structure, rules manager, terminal, and templates grid), and a CTA section with dot-grid background.
  - **`src/pages/AdvancedPage.tsx`** — dedicated page for the advanced generator; includes the Quick/Advanced mode toggle so users can switch without navigating away.
  - **`src/pages/TemplatesPage.tsx`** — full-page templates gallery with category filter chips, search, loading skeletons, and a `?template=<id>` deep-link param that auto-opens the detail drawer.
  - **`src/components/TemplateDrawer.tsx`** — slide-in drawer showing template detail (senders list, description, folder) with a "Get Script" CTA.
  - **`src/components/EmailModal.tsx`** — modal that prompts for the user's M365 email before downloading a template-based `.ps1` script.
  - **`src/components/TemplateShared.tsx`** — shared `TemplateCard`, `CardSkeleton`, `StatsBar`, `CATEGORIES`, and `CAT_COLOR` map used across Templates pages.
  - **`src/components/GeneratorOutput.tsx`** — extracted right-column output panel (folder tree + rules preview + script output + empty state).
  - **`templates/*.yaml`** — template files moved from `src/data/templates/*.json` to `templates/` at the project root and converted to YAML. No separate `index.json`; the index is derived at build time from the YAML files. `senderCount` is calculated from `senders.length` automatically.

  ### Changed

  - **`src/components/AppHeader.tsx`** — rebuilt with `<NavLink>` components for active-state highlighting across the three routes.
  - **`src/components/Footer.tsx`** — redesigned to match a three-column layout (Tool / Resources / PowerShell) with diagonal hatch decorative strip, dashed vertical borders, and a "Runs in your browser" status pill.
  - **`src/hooks/useTemplates.ts`** — updated to use `import.meta.glob('/templates/*.yaml', { eager: true })` instead of HTTP fetch; derives the card index from YAML files at bundle time.
  - **`vite.config.ts`** — added inline `yamlPlugin` (using the `yaml` npm package) to transform `.yaml` files into ES module exports.
  - **Page layout** — all three pages use a full-width hero `<section>` with `pt-36 sm:pt-44`, radial gradient background, and `border-b border-slate-200` divider, matching a consistent design pattern.
  - **`src/main.tsx`** — wrapped in `HashRouter` for GitHub Pages compatibility.

  ### Removed

  - `src/components/HeroSection.tsx` — inlined into `HomePage.tsx`.
  - `src/pages/GeneratorPage.tsx` — replaced by `HomePage.tsx` and `AdvancedPage.tsx`.
  - `src/pages/TemplatesGallery.tsx` — replaced by `TemplatesPage.tsx`.
  - `src/components/TemplatesPanel.tsx` and `TemplatesTab.tsx` — replaced by `TemplatesPage.tsx` and `TemplateShared.tsx`.
  - `src/data/templates/` — entire directory removed; templates now live in `templates/` at project root as YAML.

## 0.5.0 - Mar 30, 2026

### Minor Changes

- Templates Library and Quick/Advanced mode.

  ### New

  - **Templates Library** — pre-built sender lists for 10 popular services (Microsoft Teams, Slack, GitHub, Jira, Salesforce, HDFC Bank, LinkedIn, AWS, Zoom, DocuSign) surfaced in a gallery tab with category filters, search, and address-count badges
  - **Quick mode** — single-column centred layout with one field and one button; paste addresses and click "Download Rules" to get a `.ps1` immediately using sensible defaults (parent folder `team`, Copy action, Exact match). No configuration required.
  - **Advanced mode** — the existing full form (M365 email, parent folder, rule action, match type); accessible via the `[ ⚡ Quick | ⚙ Advanced ]` toggle inside the input card header
  - `src/hooks/useTemplates.ts` — data hook that fetches `templates/index.json` once at app level (cards survive tab switches) and lazy-loads individual `{id}.json` files on demand
  - `src/components/TemplatesTab.tsx` — gallery panel with category chips, search, gradient cards, loading skeletons, and auto-apply from `?template=` URL param
  - `src/components/AppHeader.tsx` — extracted sticky header with brand, tab nav, share/GitHub actions
  - `src/components/HeroSection.tsx` — extracted hero section with mock email client illustration
  - `src/components/GeneratorOutput.tsx` — extracted right-column output (FolderTree + RulesPreview + ScriptOutput + empty state)
  - `public/templates/index.json` + 10 individual card JSON files under `public/templates/`

  ### Changed

  - `App.tsx` reduced from ~420 lines to 146 lines via component extraction
  - Generator tab layout switches to single-column centred (`max-w-[560px]`) in Quick mode; hero section hidden
  - `handleShare` now appends `?template=<id>` to the copied URL when a template is active
  - Default mode on page load is Quick

## 0.4.3 - Mar 30, 2026

### Patch Changes

- Added feature banner for README and social sharing.

  ### New

  - `public/banner.svg` — feature banner showing the rules table and folder tree preview, used in README and as Open Graph image
  - Banner added to README header

## 0.4.2 - Mar 27, 2026

### Patch Changes

- Fix favicon and logo not loading on sub-directory deployments.

  ### Fixed

  - Inlined favicon, header logo, and footer logo as SVG data URIs - absolute `/favicon.svg` paths were resolving to the domain root instead of the `/InboxCraft/` sub-path on GitHub Pages

## 0.4.1 - Mar 27, 2026

### Patch Changes

- Deployment fixes and README corrections.

  ### Fixed

  - Restored `base: '/InboxCraft/'` in `vite.config.ts` - without it, built asset paths resolved to the domain root causing 404s on GitHub Pages
  - Upgraded GitHub Actions runner to Node.js 24 to resolve Node.js 20 deprecation warnings

  ### Docs

  - Updated README tech stack: highlight.js replaced with shiki
  - Removed localStorage persistence mention from README features (persistence was removed in 0.4.0)

## 0.4.0 - Mar 27, 2026

### Minor Changes

- Hero illustration, deployment pipeline, and field reset on refresh.

  ### New

  - Mock email client illustration in the hero section showing an organised inbox with the `team` folder structure - gives users an immediate visual of the end result
  - GitHub Actions workflow (`deploy.yml`) to build and deploy to GitHub Pages on every push to `main`

  ### Changed

  - All form fields now start empty on page load - removed localStorage persistence so every session is a clean slate

## 0.3.0 - Mar 27, 2026

### Minor Changes

- UI polish, mobile responsiveness, and developer experience improvements.

  ### New

  - Hero / landing section above the tool with headline, description, and feature highlights
  - SVG favicon matching the app icon, used consistently across header, footer, and browser tab
  - Full meta tags: Open Graph, Twitter Card, theme-color, canonical URL
  - MIT license file
  - README with usage guide, prerequisites, and development instructions

  ### Improved

  - Header redesigned: frosted glass background (`backdrop-blur`), fixed height, flat action buttons, responsive brand tagline
  - Sticky header now offsets the left-column sticky position correctly
  - Empty state placeholder redesigned to match the form card height with a structured "How it works" footer strip
  - Reset button now has a trash icon and red hover state
  - Syntax highlighting migrated from highlight.js to shiki (`poimandres` theme) with proper async rendering
  - Footer: developer link updated to [vatsal.xyz](https://vatsal.xyz), MIT license link added to bottom bar

  ### Fixed

  - `@import` for highlight.js CSS moved before `@tailwind` directives (was silently broken)
  - Mobile layout: single-column stacking below `lg` breakpoint
  - Mobile: EmailInput rows stack on small screens, `Ctrl+Enter` hint hidden, Generate button no longer wraps
  - Mobile: ScriptOutput header wraps with `flex-wrap`, filename badge hidden on small screens, Download shows icon-only on mobile
  - Mobile: FolderTree and RulesPreview paddings reduced, table scrolls horizontally
  - Mobile: Footer brand spans full width, bottom bar stacks vertically
  - Em dashes replaced with hyphens in all visible UI text
  - Example sender addresses replaced with generic fictional names

## 0.2.0 - Mar 27, 2026

### Minor Changes

- Initial release of InboxCraft (renamed from outlook-rules-generator).

  - Generate PowerShell scripts to create Outlook inbox rules automatically
  - COM-based folder creation (no sign-in needed) with Exchange Online fallback
  - Rules always created via Exchange Online for reliability
  - Parent folder grouping (e.g. `Inbox/team/alias`)
  - Copy or Move rule action toggle
  - Exact Email or Contains match type toggle
  - Domain-level rules via `@domain.com` syntax
  - Live email counter and folder structure preview
  - Syntax-highlighted script output with line count and size
  - Expandable "What this script does" summary
  - localStorage persistence across sessions
  - Ctrl+Enter keyboard shortcut
  - Parent folder name validation
  - Try example data button
  - Share link and GitHub reference

## 0.1.0 - Mar 27, 2026

### Minor Changes

- Modernised UI - two-column layout with sticky input panel, rules preview table, and script output card.
- Renamed project to InboxCraft.
- Rewrote PowerShell generation to use Exchange Online (`New-InboxRule`) for rules instead of Outlook COM, fixing reliability issues across Outlook versions.
- Added folder tree preview showing the `Inbox / parent / alias` structure before generating.
- Added domain-wide rule support via `@domain.com` syntax.
- Added Copy or Move rule action toggle and Exact Email or Contains match type toggle.
- Added parent folder name input with invalid character validation.

## 0.0.1 - Mar 27, 2026

### Patch Changes

- Initial proof of concept - scaffolded with Vite, React 18, TypeScript, and Tailwind CSS.
- Basic textarea input accepting one email address per line.
- PowerShell script generation using Outlook COM (`New-Object -ComObject Outlook.Application`) to create inbox subfolders and rules.
- Copy to clipboard and download as `.ps1` buttons.
- Rules preview table showing parsed email, derived folder alias, and valid/invalid status.
