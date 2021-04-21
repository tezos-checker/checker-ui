# FE Principles (draft)

## Project strucure

```
├── api
│   ├── index.ts
│   ├── x.api.ts
│   ├── y.api.ts
│   └── z.api.ts
│   └── api-request-status.enum.ts
├── config
│   ├── index.ts
│   ├── state config
│   ├── route config
│   └── axios config
│
├── feature
│   ├── _test_
│   │    ├── test-x.spec.tsx
│   │    └── test-y.spec.tsx
│   ├── component1.tsx
│   ├── component2.tsx
│   ├── complex-component
│   │    ├── complex-component.tsx
│   │    └── complex-component.utils.ts
│   ├── index.ts
│   └── hook
│   │    ├── hook-x.theme.ts
│   │    └── hook-y.theme.ts
│   └── state
│       ├── reducer
│       │      ├── x.reducer.ts
│       │      ├── y.reducer.ts
│       │      ├── z.reducer.ts
│       ├── feature.slice.ts
│       ├── feature.type.ts
│
├── pages
│   ├── x-page.component.tsx
│   ├── y-page.component.tsx
│   ├── z-page.component.tsx
│   ├── index.ts
│   └── common
│       ├── page-body.tsx
│       ├── page-header.tsx
│       ├── page-menu.tsx
│       ├── page-footer.tsx
│
├── theme
│   ├── theme.ts
│   ├── page.theme.ts
│   └── component
│       ├── component-x.theme.ts
│       └── component-y.theme.ts
│
├── shared-ui
│   ├── _test_
│   │    ├── test-x.spec.tsx
│   │    └── test-y.spec.tsx
│   ├── component1.tsx
│   ├── component2.tsx
│   ├── complex-component
│   │    ├── complex-component.tsx
│   │    └── complex-component.utils.ts
│   ├── hook
│   │    ├── hook1.hook.tsx
│   │    └── hook2.hook.tsx
│   └── index.ts
│
├── shared-utils
│   ├── _test_
│   │    ├── test-x.spec.ts
│   │    └── test-y.spec.ts
│   ├── x.utils.ts
│   ├── x.enum.ts
│   ├── x.mapper.ts
│   ├── hook
│   │    ├── hook1.hook.ts
│   │    └── hook2.hook.ts
│   └── index.ts
│
├── form-controls
│   ├── _test_
│   │    ├── test-x.spec.tsx
│   │    └── test-y.spec.tsx
│   ├── select-control.tsx
│   ├── input-control.tsx
│   ├── text-aera-control.tsx
│   ├── validators
│   │    ├── validator-x.spec.tsx
│   │    └── validator-y.spec.tsx
│   └── index.ts
── translations
│   ├── en
│   │    └── namespaceX.json
│   └── fr
│        └── namespaceX.json
│
```

### Project strucure
