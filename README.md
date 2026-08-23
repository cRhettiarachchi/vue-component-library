# @titantech/vue-components

Vue 3 component library built on [Reka UI](https://reka-ui.com) primitives.

## Development

```sh
pnpm install
pnpm dev              # playground at http://localhost:5173
pnpm storybook        # Storybook at http://localhost:6006
pnpm test             # runs every story as a test in headless Chromium (Vitest + Playwright)
pnpm test:e2e         # Playwright interaction tests against Storybook (starts it automatically)
pnpm build            # builds the library to dist/ (ESM + CSS + .d.ts)
pnpm build-storybook  # static Storybook build to storybook-static/
pnpm typecheck        # vue-tsc
```

## Structure

```
src/
  index.ts                    # library entry — everything exported here is public API
  components/
    Button/
      Button.vue              # built on Reka's Primitive (supports asChild)
      Button.stories.ts
      index.ts
    Input/                    # styled text input, sm/md/lg sizes
    Modal/                    # Reka Dialog with trigger/footer slots, v-model:open
    Pagination/               # page controls over usePagination()
    Popover/                  # dismissable panel using useClickOutside + useFocusTrap
    Select/                   # Reka Select; single & multiple modes, options array API
    Switch/
      Switch.vue              # wraps Reka's SwitchRoot/SwitchThumb
      Switch.stories.ts
      index.ts
    Tabs/                     # Reka Tabs with an animated indicator
    Toast/                    # <ToastProvider> viewport + presentational <Toast>
    Tooltip/                  # hover/focus label with open & close delays
  composables/                # headless building blocks, exported as public API
docs/composables.md           # composable reference
playground/                   # dev-only app served by `pnpm dev`, not part of the build
.storybook/                   # Storybook config; loads tokens.css + light/dark toolbar toggle
e2e/                          # Playwright interaction tests, run against Storybook stories
```

Each component lives in its own folder with its stories next to it. Testing has two layers:

- **`pnpm test`** — the Storybook Vitest addon (see `test.projects` in `vite.config.ts`)
  renders every story in headless Chromium as a smoke test, plus a11y checks.
- **`pnpm test:e2e`** — Playwright tests in `e2e/` drive the story iframes directly
  (`storyUrl()` in `e2e/helpers.ts`) for interaction, keyboard, and theming assertions.
  The config boots Storybook automatically; reuses an already-running one locally.

## Usage (once published or linked)

```ts
import { Button, Switch } from '@titantech/vue-components'
import '@titantech/vue-components/style.css'
```

## Composables

The headless logic behind the overlay and list components is exported too, so
consumers can build their own on the same foundation:

```ts
import { useClickOutside, useFocusTrap, usePagination, useToast } from '@titantech/vue-components'
```

See [`docs/composables.md`](docs/composables.md) for the full reference.

## Theming

Color tokens live in `src/styles/tokens.css`, built on [Radix Colors](https://www.radix-ui.com/colors):

- **Primitive layer** — Radix scales (`--sage-*` for neutrals, `--teal-*` for the accent). Light values are defined on
  `:root`, dark values on `.dark`, so switching theme is just toggling the `dark` class on `<html>`.
- **Semantic layer** — `--ui-*` tokens (e.g. `--ui-accent`, `--ui-text`, `--ui-border`) mapping
  scale steps to meanings. Defined once; they flip automatically with the theme.
  Status colors (`--ui-warning`, `--ui-danger`) come from the Radix amber and red scales.

Components must only use `--ui-*` tokens, never Radix scale variables directly. The tokens are
bundled into `style.css`, so consumers get theming for free:

```html
<html class="dark">
```

## Releasing

Versioning and publishing are automated with [Changesets](https://github.com/changesets/changesets):

1. In any PR that changes the library, run `pnpm changeset` and describe the change
   (patch/minor/major). Commit the generated file in `.changeset/`.
2. On merge to `main`, the Release workflow opens/updates a "Version Packages" PR that
   bumps the version and writes the CHANGELOG.
3. Merging that PR publishes to npm (public, `@titantech` scope) via `pnpm release`.

CI (`.github/workflows/ci.yml`) runs typecheck, story tests, Playwright tests, and the
library build on every PR and push to `main`. Publishing requires an `NPM_TOKEN`
repository secret with publish rights to the `@titantech` scope.

## Roadmap

- [x] Storybook for component docs/stories
- [x] Playwright-driven component testing (stories run as Vitest browser tests)
- [x] Headless composables exported as public API
- [ ] More components
