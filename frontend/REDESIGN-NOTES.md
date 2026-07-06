# Aroma — "Midnight Ember" redesign notes

## What changed
Full front-end visual overhaul, backend/API contracts untouched (same axios calls, same
endpoints, same MongoDB-backed data). Design direction: a near-black, live-fire kitchen
mood — molten ember/gold accents, ticket-stub shaped cards, and a WebGL "ember orb" as
the hero's signature element.

- `app/globals.css` — new dark design-token system (`--bg`, `--ember`, `--gold`, etc.),
  glass/ticket/marquee utility classes, custom scrollbar, film-grain overlay.
- `tailwind.config.ts` — new color/font/keyframe tokens (removed the old duplicate
  `tailwind.config.js` — `.ts` is now the single source of truth).
- `app/layout.tsx` — swapped Merriweather for **Fraunces** (display) + kept **Inter**
  (body) + added **Space Mono** (prices/labels/ticket numbers). Wired up the preloader,
  custom cursor, grain overlay and smooth-scroll wrapper.
- `app/components/three/EmberScene.tsx` — new WebGL scene (React Three Fiber): a
  distorting ember icosahedron + ambient sparks + pointer-reactive camera parallax,
  used as the hero background.
- `app/components/SmoothScroll.tsx` — Lenis-based smooth scrolling (respects
  `prefers-reduced-motion`).
- `app/components/CustomCursor.tsx` — morphing cursor (desktop only, auto-disabled on
  touch devices).
- `app/components/Preloader.tsx` — one-time (per session) load-in animation.
- Every section component (`HeroSection`, `TodaySpecial`, `DishCard`, `WhyChooseUs`,
  `Testimonials`, `BeOurCustomer`, `Navbar`, `Footer`) was redesigned in place —
  data-fetching logic, form submission, and API endpoints are unchanged.
- `login` and `register` pages retheme to match (same logic, new look).

## New dependencies — install before running
```bash
cd frontend
npm install three @react-three/fiber @react-three/drei @studio-freight/lenis --save
npm install @types/three --save-dev
npm run dev   # Turbopack, same as before
```
If npm complains about peer deps with React 19, add `--legacy-peer-deps` to the install
command above (react-three-fiber's peer range hasn't caught up to React 19 yet, but it
works fine in practice).

## Video / GIF slots (placeholders only — no real footage was available to me)
- `DishCard` already accepts an optional `video` field per dish — drop an `.mp4`/`.webm`
  into `frontend/public/videos/` and pass its path through the API (`item.video`) or the
  default dish objects in `TodaySpecial.tsx`, and it'll autoplay muted on hover, falling
  back to the Ken-Burns animated photo when no video is set.
- The hero currently uses the WebGL scene instead of a video — if you'd rather have a
  looping kitchen/fire video behind the headline instead of (or blended with) the 3D
  scene, send me the clip and I'll wire it in as a `<video>` layer under the canvas.
- Motion in the meantime is covered by inline animated SVGs (rising steam/spark lines on
  each dish card) and CSS keyframe "embers" drifting up through the CTA section — so
  nothing looks static even before real footage is added.

## Notes / things worth knowing
- This sandbox has no internet access, so I could not run `npm install` or a build here
  — the new files are written by hand and syntax-checked, but please run `npm run build`
  locally once dependencies are installed to catch anything environment-specific.
- The custom cursor and smooth-scroll both bail out cleanly on touch devices / reduced
  motion, so mobile keeps native scrolling and no ghost cursor.
- `next.config.js`, the Express backend, and MongoDB models were **not** touched.
