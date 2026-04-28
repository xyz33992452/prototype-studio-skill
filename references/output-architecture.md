# Output Architecture

## Build Order

Do not jump directly into full-page implementation.

Always use this sequence:

1. identify the key pages
2. define the structure of each page
3. create one independent page file set per page
4. add modules page by page
5. add interactions and annotations
6. refine visuals after structure is stable

This reduces rework and keeps edits local.

## Page Granularity

Each key page should be an independent artifact.

Default file set per page:

- `page-name.html`
- `page-name.css`
- `page-name.js`

Optional:

- shared navigation config or route mapping
- shared icon assets
- shared mock data only if multiple pages truly depend on the same dataset
- shared requirements document assets or data source

Do not merge unrelated pages into one file.

## Shared Navigation System

For multi-page prototypes with repeated menus, use one shared navigation data source by default.

Recommended shared file examples:

- `shared/navigation-config.js`
- `shared/routes.json`

This shared layer should define:

- stable menu item IDs
- labels
- target file names or routes
- grouping metadata if needed
- the page ID or route key used for current-page highlighting

## Navigation Isolation Rule

Share only the minimum cross-page navigation data.

Good shared concerns:

- menu labels
- target file names
- route keys
- menu groups
- current-page mapping logic

Do not share by default:

- full page shell HTML
- page-specific business markup
- page-specific CSS
- page-specific module behavior

The goal is consistent navigation without making local page edits dangerous.

## Navigation Rendering Rule

If several pages use the same sidebar, top nav, or tab-like cross-page menu:

- render menu links from the shared navigation data source
- derive current-page highlight from the page's stable page ID or route key
- avoid duplicating hardcoded target file names separately on each page

If a page has unique local navigation that is not reused elsewhere, page-local markup is acceptable.

## Navigation Validation

Before finishing a multi-page prototype with repeated navigation, verify:

- every shared menu item target points to an existing page file
- every page can navigate to the expected sibling pages
- current-page highlight is correct on each page
- menu labels and file mappings are consistent across all pages

Prefer a lightweight validation pass over manual spot checking only.

## Frontend-Only Default

Prototype output should stay frontend-only unless the user explicitly requests backend work.

Default allowed artifacts:

- HTML
- CSS
- JavaScript
- static assets
- mock data files
- shared requirements documents

Do not add by default:

- backend services
- API servers
- database setup
- server-side authentication
- persistence logic
- deployment configuration for real application runtime

## Page Shell Requirements

Every page should include:

- a stable page root ID
- a clear page title or context header
- module regions with strong local IDs or class namespaces
- a floating requirements button on the right side
- access to the shared requirements document overlay layered above the page content

## Shared Requirements Document

The prototype should use one shared requirements document by default.

This document can be implemented as:

- a shared HTML document
- a structured JSON or JS data source rendered in an overlay
- a markdown-like rendered view inside the prototype

The exact implementation can vary, but behavior should stay consistent.

Required behavior:

- every page has one requirements button
- clicking the button opens the same shared document system
- the opened view automatically navigates to the matching section for the current page
- the active section is visually obvious
- the document supports viewing and downloading for all intended users
- editing controls appear only for the author/editor role

## Requirements Button and Overlay

The floating requirements button is a default feature for prototype review and AI iteration.

Behavior:

- fixed or sticky on the right side
- clearly visible but not visually dominant
- opens the shared requirements document above page content
- automatically navigates to the current page section
- can be closed with close button, overlay click if appropriate, and `Esc` when implemented

Suggested section content:

- page goal
- target user
- major modules
- key interactions
- interaction details
- data definitions
- calculation logic
- preconditions
- field constraints
- sorting rules
- pagination
- form fields
- exception handling
- data rules
- edge cases
- unresolved items

## Page-to-Section Mapping

Every page should map to a stable requirements section.

Recommended pattern:

- page has a stable `pageId`
- shared requirements document has a matching `sectionId`
- requirements button uses this mapping to navigate to the correct section

Example conceptual mapping:

- `page-customer-list` -> `req-customer-list`
- `page-customer-detail` -> `req-customer-detail`

This mapping should be explicit and easy to maintain.

## Permissions

The shared requirements document should support role-aware behavior.

Minimum roles:

- author or editor
- viewer

Permission rules:

- author/editor: view, edit, download
- viewer: view, download

Do not expose editing affordances to viewers.

## Low-Fidelity Standard

Low-fi output should help PM review structure, not showcase visual polish.

Required traits:

- black, gray, and white palette
- placeholder blocks for images and visual media
- placeholder icons for functionally meaningful icons in the reference
- a small fixed set of reusable placeholder styles for image and icon needs
- explicit mock data in lists, tables, cards, and dashboards
- visible labels for module purpose
- strong layout hierarchy
- simple states and controls

Avoid:

- branded gradients
- polished illustration
- complex animation
- decorative shadows or ornamental visuals
- dropping icons that carry meaningful category, type, navigation, or state information

## Placeholder Style Strategy

Prefer local, reusable placeholder patterns over external asset lookup.

Recommended fixed placeholder styles:

- image or icon placeholder: simple square or rectangle with diagonal X lines inside
- chart placeholder: outlined block with simple axis or bar marks
- avatar placeholder: simple square or circle with X only if a true avatar is not needed
- document/file placeholder: simple rectangle with X when a document thumbnail is only structural

Rules:

- reuse the same placeholder styles across pages for consistency
- keep them grayscale in low-fi mode
- distinguish image and icon placeholder purpose mainly by size, not by adding decorative detail
- do not search online for decorative icons when a placeholder would communicate the meaning clearly
- only use external icon assets when the user explicitly asks for higher fidelity or brand-specific visuals

## High-Fidelity Standard

High-fi output should feel close to a real system while remaining editable and modular.

Required traits:

- modern interface patterns
- believable enterprise or software-product UI
- open-source UI components or component-like patterns
- realistic spacing, states, forms, and navigation
- polished visual quality close to production demos

Avoid:

- fake polish with weak task flow
- purely decorative UI elements
- overly custom styling that becomes hard to edit

## Interaction Minimums

Include reasonable baseline interactions when applicable:

- placeholder text for inputs
- selection and focus states
- confirm dialogs for delete or destructive actions
- empty states
- loading states where flow understanding depends on them
- validation hints or helper text for important fields

Do not leave forms and actions unnaturally inert if lightweight interaction can clarify the design intent.

When realistic behavior is needed for demonstration, implement it with frontend-only mock logic unless the user explicitly asks for real backend integration.

## Interaction Confidence Policy

Add interactions proactively only when they are high-confidence and strongly implied by:

- the page mode
- common enterprise product conventions
- visible controls already present in the reference

Good candidates for proactive interaction:

- open and close behavior for overlays, drawers, and dialogs
- filter chip toggles
- tab switching
- row click to detail navigation
- search input behavior
- pagination state changes
- delete confirmation

Do not invent uncertain flows, approval logic, calculations, or business branching unless the user explicitly asks for them or provides enough detail.

## Stateful UI Components

For overlays, dialogs, drawers, dropdowns, floating panels, and similar stateful UI:

- define explicit open and closed states
- ensure the closed state is visually hidden and does not block interaction
- ensure close controls actually change the UI state
- do not let component CSS override the visibility behavior of state classes such as `hidden`
- prefer explicit selectors such as `.component.hidden` or `.component.is-closed` when custom CSS sets layout properties like `display: flex`

Minimum verification for these components:

- open button works
- close button works
- mask click works when expected
- `Esc` works when implemented
- closed component no longer intercepts clicks

## Language Defaults

If a reference UI is provided, preserve its visible language by default.

Only translate when the user explicitly asks for a target language.

If there is no reference UI language signal, use the user's requested language; for Chinese product and review scenarios, Chinese can be used as the fallback default.

Avoid mixed-language labels unless the source reference is mixed-language or the user explicitly requests bilingual output.

## Isolation Rules

Optimize for precise AI patching.

- Use one root page ID per page.
- Scope all custom CSS under the page root ID.
- Do not use global tag selectors.
- Prefer module wrappers with strong local IDs or namespaced classes.
- Keep Flex and Grid layouts locally self-consistent.
- Avoid CSS rules whose impact is hard to predict.

## Tailwind and Custom CSS

Use Tailwind CSS as the primary styling system.

Recommended pattern:

- use Tailwind utility classes in the HTML for most layout and styling
- keep page-specific custom styles in the page CSS file
- scope page-specific styles under the page root ID

This keeps implementation fast while preserving edit isolation.
