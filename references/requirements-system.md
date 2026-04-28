# Requirements System

This skill uses one shared requirements document across the prototype by default.

The goal is to keep prototype screens and requirement context connected without duplicating the full spec on every page.

## Core Model

The prototype should contain:

- multiple independent page files
- one shared requirements document system

Every page should link to the same requirements source, but open it at a different section.

## Why This Model

This approach is better than one modal per page because it:

- keeps the spec consistent
- reduces duplication
- makes updates easier
- supports download as one coherent document
- better matches real PM and review workflows

This requirements system is part of the frontend prototype layer and should not require backend services by default.

## Required Capabilities

The requirements system should support:

- view the shared requirements document
- open the document from any page
- auto-navigate to the corresponding section for the current page
- download the document
- edit the document when the current user is the author or an editor

## Language Requirement

If the prototype is based on a reference UI, the requirements document can follow the reference language by default.

If the user explicitly requests a target language, the shared requirements document should follow that language consistently for:

- document title
- section titles
- summaries
- page goals
- module names
- interaction descriptions
- rule descriptions
- UI controls such as view, edit, download, save, and close

## Page Button Behavior

Every page should have a floating requirements button on the right side.

When clicked, the button should:

1. open the shared requirements document
2. navigate to the current page's requirement section
3. visually highlight or focus that section if possible

## Section Structure

Each page section in the shared requirements document should ideally include:

- section title
- page goal
- target users
- main modules
- important interactions
- interaction details for important actions
- business rules or data rules
- data definitions
- calculation logic
- preconditions
- field constraints
- sorting rules
- pagination defaults
- form fields
- exception handling
- edge cases
- unresolved questions

Use the standard schema in `requirements-schema.md` unless the user explicitly requests a different format.

## Mapping Rules

Each page must have a stable mapping to a requirement section.

Recommended fields:

- `pageId`
- `requirementSectionId`

These IDs should be stable so the mapping survives future page edits.

Recommended page-level fields:

- `pageTitle`
- `pageMode`
- `route` or `fileName`

## Permissions

Use role-aware behavior.

### Author or editor

Can:

- view
- edit
- download

Should see:

- edit action
- save action
- optional history or last-updated metadata

### Viewer

Can:

- view
- download

Should not see:

- edit buttons
- save controls
- editing affordances

## UI Guidance

The requirements overlay can be:

- modal
- drawer
- side sheet
- full-screen overlay

Choose the form that best fits the page density and prototype fidelity.

Regardless of format:

- it must appear above the current page
- it must be easy to close
- it must clearly show which section is active

## Implementation Preference

Prefer implementations that remain easy for AI to modify.

Good options:

- a shared HTML file with anchor links
- a shared JSON or JS data file rendered into an overlay
- a structured markdown-like document rendered in the browser

Avoid:

- duplicating static requirement text separately in each page file
- hardcoding inconsistent section labels
- mixing permission logic into unrelated page modules

## Recommended System Split

Keep the system logically separated into:

- page files
- requirements data source
- requirements viewer/editor layer
- permission logic
- page-to-section mapping

This separation keeps the prototype easier to patch and extend.

## Common Requirement Elements

When the page pattern implies them, treat these as standard requirement elements rather than optional nice-to-haves:

- `dataDefinitions`
- `calculationLogic`
- `interactionDetails`
- `preconditions`
- `fieldConstraints`
- `sortingRules`
- `pagination`
- `formFields`
- `exceptionHandling`

Use judgment instead of forcing every field on every page:

- `list-page`: prioritize data definitions, sorting rules, pagination, interaction details, and exception handling
- `detail-page`: prioritize data definitions, calculation logic, preconditions, and exception handling
- `form-page`: prioritize form fields, field constraints, preconditions, interaction details, and exception handling
- `dashboard-page`: prioritize data definitions, calculation logic, sorting rules, and exception handling
- `workspace-page`: prioritize interaction details, preconditions, sorting rules, data definitions, and exception handling
