# Navigation System

Use this reference when a prototype contains multiple pages with repeated menus, tabs, or sidebar navigation.

## Goal

Keep page navigation consistent across independent HTML files without making local page edits spread into unrelated pages.

## Core Rule

Share navigation data, not page implementation.

Recommended shared concerns:

- menu item IDs
- labels
- target file names or routes
- route keys
- current-page mapping
- optional menu grouping

Keep page-specific layout, styles, and module behavior local to each page.

## Recommended Shared File

Use one small shared navigation source such as:

- `shared/navigation-config.js`
- `shared/routes.json`

Recommended item shape:

```js
[
  {
    navItemId: "nav-customer-list",
    routeKey: "customer-list",
    label: "Customer List",
    fileName: "customer-list.html",
    group: "customer"
  },
  {
    navItemId: "nav-customer-detail",
    routeKey: "customer-detail",
    label: "Customer Detail",
    fileName: "customer-detail.html",
    group: "customer"
  }
]
```

## Page Contract

Each page should define a stable identity such as:

- `pageId`
- `routeKey`

The page should use that identity to:

- highlight the active menu item
- find the correct navigation target mapping
- stay aligned with the shared requirements section

## Current-Page Highlight Rule

Do not detect the active page through fragile text matching.

Prefer:

- page-local `routeKey`
- exact file name match
- stable page ID to route mapping

Avoid:

- comparing visible labels
- relying on loosely inferred page titles

## Safe Isolation Pattern

Preferred pattern:

1. shared navigation config stores labels and targets
2. each page renders its own menu shell
3. each page reads the shared config
4. each page marks its active item from its own stable route key

This keeps navigation consistent while preserving page-level edit isolation.

## Validation Checklist

Before finishing:

- every menu target file exists
- every repeated menu instance uses the same shared config source
- current-page highlight is correct on each page
- menu grouping and order are consistent
- no page contains stale hardcoded targets that disagree with the shared config

## When Page-Local Links Are Fine

If a page has one-off local actions that are not part of shared navigation, local links are acceptable.

Examples:

- a detail page back button
- a local tab switch only used inside one page
- a wizard step control that does not belong to global navigation

Use the shared navigation system only for repeated cross-page structures.
