# Portfolio development guide

[Visit the live portfolio](https://luisgeralda.github.io/portfolio/)

An engineering portfolio for interviews. Nine projects include individually developed tools and five projects led within the F2G Solutions team. Year-only team projects are grouped before month-dated entries from the same year; their month order is unspecified. Date ranges show October 2025 starts for the four software projects and a 2023 start for Portable Lab. ECA Mobile replaces the former Cellular Analyzer entry. Public product screenshots and a lab photo illustrate the five team projects. A GitHub cluster map and a user-supplied DTLog campaign screenshot illustrate two additional projects. Static HTML works without JavaScript; JavaScript adds project filtering and theme selection.

## Preview

Requires Node.js 22 and Python 3.

```text
npm run build
npm run preview
```

Open http://127.0.0.1:4173. There are no npm dependencies to install.

## Publish on GitHub Pages

1. Create a repository under `LuisGeralda`, such as `portfolio`, and upload the contents of this folder. Use `main` as the default branch.
2. In the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. Run the **Publish portfolio** workflow, or push to `main`. Its deployment result supplies the final URL.

This repository publishes at `https://luisgeralda.github.io/portfolio/`. A repository named `LuisGeralda.github.io` would publish at the account root. All local asset paths are relative and support either layout.

Alternatively, publish `site/` directly from a Pages branch. `.nojekyll` keeps the static output unprocessed.

## Edit

- `projects.json`: case-study content, ISO sorting dates, public repository and project overview links, and individual or team roles.
- `build.mjs`: page structure, background, contact, and metadata.
- `site/styles.css`: responsive Ink & Grid design, light/dark themes, print styling.
- `site/app.js`: progressive interactions.
- `site/assets/Luis-Geralda-Resume.pdf`: supplied September 2026 resume, copied unchanged.

Run `npm run check` and `npm run build` after edits. Builds version the stylesheet and script URLs by their content so deployed HTML loads matching assets. Source and generated HTML are both retained for portability.

## Content and access

Project dates are latest documented activity, not original creation dates. Private repositories are described with public-facing case studies and have no inaccessible source-code CTA. The site includes public product screenshots and visuals supplied by Luis. It does not include private project source, raw customer captures, or employer configuration exports. Project summaries and details focus on the implementation and limitations. Adoption and training impact are supplied directly by Luis; the public overview pages are sources for product visuals and features.

Typography uses Instrument Serif, Inter, and Geist Mono through Google Fonts, with system fallbacks. No commercial font files are redistributed. The resume contains the contact and employment information supplied by Luis for this portfolio.

## Verification

See the separate `output/verification.md` in the task workspace for browser checks and screenshots. Those review artifacts are not part of the Pages upload.
