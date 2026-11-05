# Lea Schönfelder — Portfolio

Static site built with [Astro](https://astro.build). No backend, no CMS.

## Where things live

| What | Where |
|---|---|
| **All text, credits and media references** | `src/content/site.ts` |
| Media files | `public/media/<project>/` |
| Homepage layout | `src/pages/index.astro` |
| Project page template | `src/pages/work/[slug].astro` |
| Work samples page | `src/pages/samples.astro` |
| Colours, fonts, spacing | `src/styles/global.css` |

## Replacing a placeholder

1. Copy the file into `public/media/<project>/` (each placeholder shows its suggested path).
2. In `src/content/site.ts`, set `src: '/media/<project>/<file>'` on that slot.
3. Make sure `aspect` matches the real file (`'16 / 9'`, `'9 / 16'`, `'4 / 3'` …). Media is never cropped.
4. Write a real `alt` text, plus `caption` / `credit` if needed.

For hosted videos (Vimeo / YouTube unlisted), use `kind: 'embed'`, put the player URL in `src`
and the normal watch link in `fallbackUrl`.

The red "To confirm" boxes come from the `review` lists in `site.ts`.
They only appear in the local preview, never on the published site.

## Commands

```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # produces the finished site in dist/
```
