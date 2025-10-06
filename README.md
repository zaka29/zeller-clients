# Project Overview

A minimal Vite + React + TypeScript starter that demonstrates connecting to AWS AppSync (Amplify v6), a small component split (UserTypes + UserList) and a Vitest-based testing setup with mocked GraphQL hook.

---

# Project scaffold

* **Goal**: start as quickly as possible — this project uses the Vite `react-ts` template.
* To install and run locally:

```bash
npm install && npm run dev
```

* UI styling: **Tailwind CSS** is used for rapid component design and prototyping.

---

# Components structure

* `App.tsx` — main container / screen. Responsible for wiring the customer filter and rendering fetched customer list.
* `UserTypes` — presentational component that renders radio controls for the `admin` / `manager` filter.
* `UserList` — presentational component that receives `users` and `selectedFilter` and renders filtered items.

---

# Components test strategy

Integration-style testing focused on behavior and user flows rather than implementation details.

Key ideas:

* **Test App.tsx as a full unit** (integration style): render the container and its children and assert UI behavior.
* **Mock the `useZelletCustomers` hook** for tests so no real network/AWS calls are made.
* Assertions to include in tests:

    * Loading state renders correctly.
    * Default behavior: Admin users are shown by default.
    * Switching the radio filter shows Manager users.
    * Error state renders an accessible error box and can be dismissed.
---

# Running tests

Scripts in `package.json` (recommended):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

Run unit tests once (CI-friendly):

```bash
npm run test
```

Run in watch mode while developing:

```bash
npm run test:watch
```

Open the Vitest UI dashboard:

```bash
npm run test:ui
```
