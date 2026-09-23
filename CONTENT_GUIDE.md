# Content maintenance

- Brand, domain, verified contact details and filing numbers: `src/data/company.ts`.
- Official channels: `src/data/socials.ts`. Add a channel only when its ownership and URL are verified.
- Navigation and locale paths: `src/data/navigation.ts`.
- Bilingual page copy and FAQ: `src/data/content.ts`.
- Research pillars and path: `src/data/research.ts`.
- Projects, status, limitations, source and upstream attribution: `src/data/projects.ts`.
- Bilingual update entries and linked source: `src/data/updates.ts`.

Each project must identify whether it is first-party work or an adaptation. A fork may describe the KineWorld engineering change, but may not imply ownership of an upstream model or claim new performance without evidence. Keep research direction, prototype, tested implementation and external validation distinct. Cite the exact repository document, release or report that supports each factual statement.

Add an update only with a real date, category, bilingual title, summary, body and source URL. Run `npm run check`, `npm run build` and browser verification after content changes. The current update format is structured TypeScript; migrate to Markdown/MDX content collections if the editorial workflow grows.
