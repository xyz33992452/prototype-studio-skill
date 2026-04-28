# Requirements Schema

This file defines a stable, implementation-friendly structure for the shared requirements document.

Use this schema by default so:

- the generated requirement document is consistent
- pages can map to sections reliably
- AI can update only the needed fields
- viewer and editor features can share one source of truth

## Design Principles

The schema should be:

- readable by humans
- easy for AI to patch
- stable across page revisions
- expressive enough for product review
- not overloaded with unnecessary fields
- rich enough to capture common product-spec details without forcing every page into the same template

For user-facing fields, follow the language of the reference UI when one is provided. If the user explicitly requests another language, use that target language consistently.

## Document-Level Structure

The shared requirements document should have:

- document metadata
- section list

Recommended top-level shape:

```js
{
  documentId: "prototype-requirements",
  title: "Prototype Requirements",
  version: "0.1.0",
  updatedAt: "2026-04-26T10:00:00Z",
  updatedBy: "author-name",
  permissions: {
    authorIds: ["user-1"],
    editorIds: ["user-2"],
    viewerMode: "view-download"
  },
  sections: [
    // requirement sections
  ]
}
```

This can be stored as JSON, JS, or another structured format with equivalent fields.

## Section-Level Structure

Each page should map to one primary section in the shared requirements document.

Recommended section shape:

```js
{
  sectionId: "req-customer-list",
  pageId: "page-customer-list",
  pageTitle: "Customer List",
  pageMode: "list-page",
  routeKey: "customer-list",
  route: "/customer-list",
  fileName: "customer-list.html",
  summary: "Browse, filter, and manage customer records.",
  pageGoal: "Help business users quickly locate and act on customer records.",
  targetUsers: ["sales-ops", "customer-success-manager"],
  mainModules: [
    "page-header",
    "search-filter-bar",
    "primary-actions",
    "customer-table"
  ],
  keyInteractions: [
    "search by customer name",
    "filter by status and owner",
    "open detail page from a row",
    "confirm before deleting a record"
  ],
  interactionDetails: [
    "Pressing Enter in the search input triggers the same query as the Search button.",
    "Delete opens a confirmation dialog before any destructive action is simulated."
  ],
  businessRules: [
    "Only active customers can be assigned to new plans.",
    "Deleted records require confirmation."
  ],
  dataRules: [
    "Table shows latest synced owner information.",
    "Status filter defaults to all."
  ],
  dataDefinitions: [
    {
      name: "customerId",
      label: "Customer ID",
      description: "Stable business identifier shown in list and detail views.",
      type: "string",
      format: "C-2001",
      source: "mock customer store"
    }
  ],
  calculationLogic: [
    {
      name: "riskPriority",
      description: "Risk customers are ranked before follow-up and active customers in default queue views.",
      formula: "risk > follow > active"
    }
  ],
  preconditions: [
    "Delete is available only when the current role has delete permission.",
    "Open detail requires a valid customer record."
  ],
  fieldConstraints: [
    {
      field: "customerSearch",
      type: "string",
      maxLength: 50,
      required: false,
      notes: "Supports customer name or customer ID keyword search."
    }
  ],
  sortingRules: [
    "Default order is latest follow-up date descending.",
    "Risk customers should stay above active customers when dates are equal."
  ],
  pagination: {
    enabled: true,
    pageSize: 20,
    pageSizeOptions: [20, 50, 100],
    defaultSort: "followUp desc"
  },
  formFields: [
    {
      field: "customerSearch",
      label: "Customer Name",
      control: "text",
      required: false,
      placeholder: "Enter customer name or ID"
    }
  ],
  exceptionHandling: [
    {
      scenario: "No matching results",
      handling: "Show empty-state guidance and allow quick filter reset."
    }
  ],
  edgeCases: [
    "No results after filter combination.",
    "User lacks delete permission."
  ],
  unresolvedQuestions: [
    "Should bulk delete be supported?"
  ],
  notes: [
    "Use mock data in low-fi output."
  ]
}
```

## Required Section Fields

These fields should exist for every section:

- `sectionId`
- `pageId`
- `pageTitle`
- `pageMode`
- `summary`
- `pageGoal`
- `mainModules`
- `keyInteractions`
- `exceptionHandling`

## Recommended Section Fields

These fields should usually exist:

- `routeKey`
- `route` or `fileName`
- `targetUsers`
- `businessRules`
- `dataRules`
- `interactionDetails`
- `preconditions`
- `exceptionHandling`
- `edgeCases`
- `unresolvedQuestions`

## Optional Section Fields

Use only when helpful:

- `navItemId`
- `navGroup`
- `states`
- `permissions`
- `dependencies`
- `apiNotes`
- `metrics`
- `attachments`
- `reviewHistory`
- `dataDefinitions`
- `calculationLogic`
- `fieldConstraints`
- `sortingRules`
- `pagination`
- `formFields`

## Per-Field Guidance

### `summary`

One short sentence describing what the page is for.

### `pageGoal`

One or two sentences describing the user's main task or the communication goal.

### `mainModules`

List the primary page regions or feature blocks, using stable identifiers where possible.

### `keyInteractions`

List the interactions that matter to product review. Focus on meaningful actions, not every click target.

### `routeKey`

Stable page-level routing key used to map the page to:

- shared navigation items
- current-page highlight logic
- file targets or routes

Keep this stable across local visual edits so navigation logic does not drift.

### `businessRules`

List rules that affect what users can do, what content is shown, or what decisions are allowed.

### `dataRules`

List rules about field defaults, data origin, filtering behavior, sorting assumptions, or freshness.

### `interactionDetails`

Use this when short `keyInteractions` labels are not enough. Capture trigger, visible feedback, navigation result, confirmation behavior, or state transition in one sentence each.

### `dataDefinitions`

Use this for pages that read, show, edit, compare, or calculate structured business data. Prefer small structured entries with:

- field or entity name
- user-facing label when relevant
- business meaning
- type or format
- source or ownership

### `calculationLogic`

Use this when the UI contains derived metrics, totals, badges, SLA decisions, statuses, progress values, recommendations, or other computed content. Include both the business description and the formula or decision rule when known.

### `preconditions`

List upstream requirements that must be true before the page, module, or action can be used. Good examples:

- role or permission requirements
- record status requirements
- data sync completion
- prerequisite setup

### `fieldConstraints`

Use this when the page contains filters, forms, editable tables, import templates, or structured inputs. Capture type, max length, requiredness, format, allowed range, uniqueness, and validation notes.

### `sortingRules`

Use this for lists, queues, tables, timelines, kanban lanes, ranking views, and dashboards with ordered cards. Make default sort and tie-break behavior explicit.

### `pagination`

Use this when a collection is paged or chunked. Capture whether pagination is enabled, default page size, optional page sizes, next-page behavior, and any coupling with sort or filter state.

### `formFields`

Use this for create, edit, search, filter, approval, or configuration pages. At minimum capture:

- field name
- label
- control type
- requiredness
- placeholder or helper text

### `exceptionHandling`

List important unhappy-path behavior. Cover network failure, empty results, validation failure, permission denial, stale data, conflicting edits, timeout, and destructive-action rollback when relevant.

### `edgeCases`

List important failure modes, empty states, boundary states, or permission differences.

### `unresolvedQuestions`

List open decisions that still need stakeholder input.

## Role and Permission Guidance

The document-level permissions and any section-level permissions should support:

- author/editor: view, edit, download
- viewer: view, download

If a section has special restrictions, keep them explicit in a `permissions` field instead of scattering permission logic across unrelated files.

## UI Rendering Guidance

When this schema is rendered in the prototype:

- show the current section title clearly
- allow navigation to neighboring sections
- make required information easy to scan
- group dense spec fields into separate blocks instead of hiding them in one long paragraph
- show edit controls only to users with edit rights
- keep download available for both editor and viewer roles when allowed

## Editing Guidance

To keep AI edits localized:

- update one section at a time
- preserve `sectionId` and `pageId`
- preserve `routeKey` when the page identity is unchanged
- do not rename stable IDs unless the page identity truly changes
- prefer appending fields over changing meaning of existing fields

## Minimum Viable Schema

If the prototype is simple, this smaller shape is acceptable:

```js
{
  title: "Prototype Requirements",
  sections: [
    {
      sectionId: "req-example",
      pageId: "page-example",
      pageTitle: "Example Page",
      pageMode: "list-page",
      summary: "Short description.",
      pageGoal: "What this page helps users do.",
      mainModules: ["header", "filters", "list"],
      keyInteractions: ["search", "open detail"]
    }
  ]
}
```

Use the full schema when the prototype is intended for review, collaboration, or iterative editing.
