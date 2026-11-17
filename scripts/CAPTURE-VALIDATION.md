# Capture change verification — 17 Nov 2026

Worktree: `codex-worktrees/web-1-screenshots`, branch `codex/1-product-screenshots`.

## Targeted TDD evidence

Node v26.13.0; command: `node --test scripts/capture-plan.test.mjs` (also `pnpm test:capture`).

- Initial RED: the new capture-plan contract did not exist (`ERR_MODULE_NOT_FOUND`).
- Behavioral RED after the first implementation: 5 passed, 2 failed. Missing QR tokens were accepted; healthy trailing-slash routes were rejected. The regression assertions failed with “Missing expected exception” and “Unexpected route or expired session”.
- GREEN: 8 passed, 0 failed. Covers all 15 output ids, dimensions and dark variants; explicit auth configuration; failed/redirected/incomplete page rejection; existing QR discovery; guest name gate before menu; malformed URL/token rejection; trailing slashes; blocked order/payment/email/QR writes with preview-only POST allowed.
- `node --check scripts/capture-screenshots.mjs` and `node --check scripts/capture-plan.mjs`: passed.

## Browser verification still required

These checks do not launch Chrome or verify a real stack. Run all 15 captures only after the restore and staff-invite PRs merge and the local demo stack reflects that staging head, behind `/tmp/nventra-heavy.lock`. Inspect all resulting PNGs, especially the unsent POS cart, the Settings email-preview composition at 1440 px (heading, subject and at least 200 px of the upper email; the editor is naturally stacked above it), and the guest menu after its name prompt. Preserve the owner's demo data; do not reset volumes or send real email.

No screenshot capture, build, deployment, commit or push was performed by the implementation agent.

## Coordinator validation

- Re-ran targeted tests: 8 passed, 0 failed.
- Production build: `pnpm exec next build --webpack` passed, including TypeScript and all 18 static pages, under the shared heavy-job lock.
- Default Turbopack build failed locally because the worktree node_modules junction points outside its filesystem root. Webpack used the same dependency set successfully; configuration and lockfile are unchanged.
- Independent preparatory hygiene audit passed. Final audit must reference the committed SHA.

## Email composition review follow-up

- Reviewer found the app stacks its editor and preview below the 1536 px breakpoint; a 1440 px image cannot truthfully promise both side by side.
- RED: added clipping/composition regression; 8 passed, 1 failed with ?Missing expected exception? because offscreen preview content was previously accepted.
- Fix: scroll the preview heading naturally to the top, and validate heading/subject bounds plus at least 200 px of the upper iframe inside the viewport and shared scroll-container clipping bounds immediately before capture. No app CSS, DOM layout, zoom or viewport changes.
- Alt text, caption and README now describe the Settings email preview focus accurately.
- GREEN: 9 targeted tests passed; actual browser capture remains pending.
