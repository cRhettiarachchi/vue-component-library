# @titantech/vue-components

Vue 3 component library built on [Reka UI](https://reka-ui.com) primitives.

## Development

```sh
pnpm install
pnpm dev        # playground at http://localhost:5173
pnpm build      # builds the library to dist/ (ESM + CSS + .d.ts)
pnpm typecheck  # vue-tsc
```

## Structure

```
src/
  index.ts                    # library entry — everything exported here is public API
  components/
    Button/
      Button.vue              # built on Reka's Primitive (supports asChild)
      index.ts
    Switch/
      Switch.vue              # wraps Reka's SwitchRoot/SwitchThumb
      index.ts
playground/                   # dev-only app served by `pnpm dev`, not part of the build
```

Each component lives in its own folder so stories (`*.stories.ts`) and tests can sit
alongside it later.

## Usage (once published or linked)

```ts
import { Button, Switch } from '@titantech/vue-components'
import '@titantech/vue-components/style.css'
```

## Roadmap

- [ ] Storybook for component docs/stories
- [ ] Playwright for component testing
- [ ] More components
