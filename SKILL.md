---
name: prototype-studio
description: Use when the user wants to create, refine, or review a product prototype, wireframe, screen concept, information architecture, user flow, or annotated UI artifact. Trigger on requests such as 绘制原型, 生成原型, 输出原型, 生成高保真原型, 生成低保真原型, wireframe, prototype, annotated prototype, clickable mockup, page map, or user flow. Supports low-fidelity wireframes, annotated review prototypes, high-fidelity web prototypes, product walkthrough screens, and flow-based artifacts. Best for product managers, designers, pre-sales teams, and internal review workflows where the output should match the scenario rather than defaulting to polished UI.
---

# Prototype Studio

Generate the right prototype artifact for the situation instead of defaulting to a pretty screen.

Author: Yin Hao

This skill is for product work across multiple fidelity levels and multiple deliverable types.

## Use This Skill When

Trigger this skill when the user asks for any of the following:

- prototype
- 绘制原型
- 生成原型
- 输出原型
- wireframe
- 生成低保真原型
- 生成高保真原型
- low-fi or high-fi screen
- page concept
- interface draft
- product demo page
- clickable mockup
- information architecture
- page map
- user flow
- business flow
- annotated screen
- review-ready UI artifact
- PM prototype with page descriptions or module notes

Use proactively when the user is trying to communicate product structure, flows, or interface direction and the output format is not yet fully specified.

## Default Build Strategy

Do not generate an entire product prototype as one monolithic page.

Default approach:

1. identify the key pages first
2. define the page framework and module layout for each page
3. build each page as an independent HTML file
4. fill modules incrementally after the framework is settled

Prefer a multi-page prototype structure over a single oversized artifact unless the user explicitly wants a one-page demo.

Do not lock the skill to a fixed page-template library. Use a page-mode system instead.

The skill should identify what kind of page is needed, then generate a suitable structure for that page mode. The mode should constrain the page enough to keep it coherent, but still leave room for variation based on the product context.

## Do Not Default to One Output

First decide the correct mode. A good prototype is context-fit, not always high-fidelity.

### Mode A: Low-Fi Wireframe

Use when speed, scope alignment, or early ideation matters most.

Output traits:
- grayscale or minimal color
- simple blocks and labels
- strong layout hierarchy
- minimal decoration
- clear information structure

### Mode B: Annotated Review Prototype

Use when the user needs a screen plus explanation for review, handoff, or decision-making.

Output traits:
- screen plus page description
- module-level notes
- key interactions or state notes
- assumptions and open questions called out clearly

### Mode C: Hi-Fi Clickable Prototype

Use when realism, persuasion, or demo value matters most.

Output traits:
- polished visual design
- realistic copy and states
- interaction affordances
- optional transitions or simple navigation

### Mode D: Flow / IA Artifact

Use when the core problem is structure rather than screen polish.

Output traits:
- user flows
- business flows
- page maps
- module relationships
- architecture-like product diagrams

### Mode E: Multi-Surface Prototype Pack

Use when one artifact is not enough.

Typical bundle:
- 1 low-fi structure view
- 1 review-ready annotated screen
- 1 hi-fi demo screen
- 1 supporting flow or IA diagram

## Mode Selection Rules

Choose the mode using the user's real goal, not just their wording.

- If they need quick alignment, use `Low-Fi Wireframe`.
- If they need feedback or approval, use `Annotated Review Prototype`.
- If they need a sales/demo artifact, use `Hi-Fi Clickable Prototype`.
- If they need to explain logic, use `Flow / IA Artifact`.
- If the request spans strategy, review, and presentation, use `Multi-Surface Prototype Pack`.

If details are missing, ask only the smallest set of questions needed:
- Who is this for?
- What is the artifact being used for?
- Low-fi, annotated, high-fi, or flow-first?

If the user does not know, choose the safest mode based on context and say which mode you picked.

After selecting the prototype mode, select the page mode for each page. Do not assume all pages should use the same page mode.

## Working Sequence

Always follow this order:

1. Understand the product context
2. Identify audience and use case
3. Select the correct mode
4. Define the key pages before implementation
5. Choose a page mode for each page
6. Break each page into modules, regions, and states
7. Reuse existing style systems, templates, or references if available
8. Generate page frameworks first
9. Fill modules incrementally
10. Review for clarity, editability, interaction quality, and scenario fit
11. Refine if needed

## Required First Pass Output

Before building, define these briefly:

- artifact goal
- target audience
- chosen mode
- fidelity level
- key pages
- page mode per page
- expected output files

Then proceed.

## Reuse Existing Systems

If the user provides any of the following, inherit from them instead of inventing from scratch:

- Figma files
- existing product screens
- PPT or proposal templates
- brand colors or typography
- component libraries
- screenshots
- prior wireframes

Prefer reuse of existing systems, tokens, and patterns over hardcoded one-off styling.

## Output Principles

### For all modes

- Keep the artifact editable whenever possible.
- Default to frontend-only prototype output unless the user explicitly requests backend behavior or full-stack implementation.
- Avoid generic AI aesthetics and filler structure.
- Each screen or diagram must have one clear communication job.
- Match information density to the scenario.
- Use real product thinking, not empty placeholder storytelling.
- Treat each page as its own unit for implementation and later revision.
- Add a floating requirement button on the right side of every page by default.
- Clicking the requirement button should open the shared requirements document in an overlay, drawer, or modal above the page.
- The shared requirements document should automatically navigate to the section that corresponds to the current page.
- Requirement notes should help PM review and AI iteration, not just end-user presentation.
- The system should use one shared requirements document across the prototype unless the user explicitly requests otherwise.
- The prototype author or designated editor should be able to view, edit, and download the shared requirements document.
- Other users should be able to view and download the shared requirements document, but not edit it.
- Requirement sections should include common spec elements when they are relevant to the page, especially data definitions, calculation logic, interaction descriptions, preconditions, type or length constraints, sorting rules, exception handling, pagination defaults, and form fields.
- Include common real-product interaction details such as placeholder text, empty states, validation hints, confirm dialogs for destructive actions, and reasonable feedback for primary actions.
- Let page mode guide the structure instead of reusing a rigid page template.

### Prototype Boundary Rules

- By default, generate only frontend prototype artifacts such as HTML, CSS, JavaScript, SVG, images, and structured requirement documents.
- Do not generate backend services, API implementations, database models, server routes, authentication services, persistence layers, or deployment logic unless the user explicitly asks for them.
- Simulate behavior on the frontend when lightweight interaction is needed for prototype clarity.
- Use mock data, frontend state, and local interaction patterns instead of real backend integration.
- If a request sounds implementation-heavy but the user still wants a prototype, keep the output at the prototype layer and state any simulated assumptions.

### Language Rules

- If a reference screenshot, Figma design, or source UI is provided, preserve the original user-facing language from that reference by default.
- Only translate user-facing content when the user explicitly requests a target language.
- If no reference UI language is available, follow the user's specified language; if the user does not specify one, Chinese can be used as the default for Chinese product and review scenarios.
- Keep internal implementation identifiers such as file names, IDs, and variable names maintainable and predictable; these do not need to be translated into Chinese unless the user explicitly asks.
- When translating, preserve the structure, terminology hierarchy, and intent of the reference rather than paraphrasing freely.
- Avoid mixed-language UI unless the reference itself is mixed-language or the user explicitly requests bilingual output.

### For low-fi work

- Prioritize structure, task flow, layout, and hierarchy.
- Do not waste effort on ornamental styling.
- Use simple placeholders for charts, tables, media, and controls.
- Preserve functional icons as low-fi placeholders when they help identify type, category, state, or navigation meaning.
- Prefer a small fixed set of reusable placeholder styles for icons and images instead of searching for external assets.
- For image and icon placeholders, prefer the simplest low-fi style: a rectangle or square with an X inside, using size differences rather than decorative variation.
- Use black, white, and gray as the primary palette.
- Use placeholder graphics instead of polished imagery.
- Show mock data in list, table, and dashboard-like areas so the structure is reviewable.
- Write from a product manager's perspective: emphasize information architecture, business meaning, and module intent.

### For annotated work

- Include page-level intent.
- Include module-level descriptions where needed.
- Note important interactions, validation rules, states, or assumptions.
- Make review comments concise and useful for PM, design, and engineering.

### For hi-fi work

- Use a deliberate visual direction.
- Keep screens believable and product-appropriate.
- Favor realistic content and useful states over decoration.
- Work from a UX/UI designer perspective.
- Use modern UI patterns close to real software systems.
- Prefer open-source UI components or design patterns that feel production-ready.
- Keep the result polished, but still easy to revise.

### For flow or IA work

- Optimize for legibility and logic.
- Make relationships and transitions explicit.
- Use diagrams when they explain better than screens.

## Preferred Deliverables

Pick the smallest useful set:

- HTML prototype
- annotated HTML prototype
- PNG or SVG preview
- flow diagram
- screen specification note
- prototype pack with multiple artifacts

Default file structure for page-based prototype work:

- one HTML file per page
- one CSS file per page
- one JS file per page
- one shared navigation config file for repeated menu structure and page mapping
- one shared requirements document file or view
- optional shared assets folder only when reuse is clearly helpful

Do not collapse all pages into one HTML file unless the user explicitly asks for that.

## Page Mode System

Use page modes instead of fixed templates.

Each page mode defines:

- what the page is trying to do
- what regions usually appear
- what interactions matter most
- what low-fi and high-fi versions should emphasize

Choose the page mode that best fits the communication job of the page.

### `list-page`

Use for:
- record lists
- work queues
- inventory views
- customer or order management pages

Usually includes:
- page header
- filters or search
- primary actions
- results region
- pagination, tabs, or summary counts when relevant

### `detail-page`

Use for:
- record detail
- profile views
- order detail
- ticket detail
- configuration detail

Usually includes:
- title and status
- key summary information
- grouped sections or cards
- related records or timeline
- primary and secondary actions

### `form-page`

Use for:
- create/edit flows
- configuration pages
- setup forms
- approval submission pages

Usually includes:
- grouped input sections
- helper text and validation
- primary save/submit actions
- cancel or back actions
- destructive actions if needed

### `dashboard-page`

Use for:
- business overview
- performance overview
- operational cockpit
- management snapshot

Usually includes:
- headline metrics
- charts or visual summaries
- trend or alert modules
- recent activity or list region

### `workspace-page`

Use for:
- task-heavy operational systems
- analyst tools
- content/editor environments
- investigation and handling consoles

Usually includes:
- navigation or left structure
- main working canvas
- side details or inspector panel
- dense but structured controls

### `wizard-page`

Use for:
- step-by-step setup
- onboarding
- configuration flow
- guided submission or review flow

Usually includes:
- step progress
- focused task area
- navigation between steps
- save/continue/back actions

### `flow-page`

Use for:
- business process explanation
- user journey view
- approval flow
- process orchestration

Usually includes:
- nodes or stages
- transitions
- decision points
- role ownership or system responsibility when relevant

### `intro-page`

Use for:
- product introduction
- capability overview
- landing-like internal demo page
- concept presentation page

Usually includes:
- positioning statement
- core value sections
- supporting visuals or capability groups
- call to action or next-step guidance

### `comparison-page`

Use for:
- option comparison
- plan/package comparison
- old vs new process comparison
- solution alternatives

Usually includes:
- comparison dimensions
- side-by-side structure
- recommendation or conclusion region

### `empty-state-page`

Use for:
- first-use experience
- no-data state
- filtered-to-zero state
- disabled or waiting state

Usually includes:
- explanation
- suggested next action
- optional education or setup guidance

## Page Mode Selection Rules

Use the smallest number of page modes that make the prototype understandable.

- If a page's purpose is browsing many records, favor `list-page`.
- If the page is centered on one entity, favor `detail-page`.
- If user input is primary, favor `form-page`.
- If summary and monitoring are primary, favor `dashboard-page`.
- If the page is task-dense and tool-like, favor `workspace-page`.
- If sequence matters, favor `wizard-page` or `flow-page`.
- If explanation or persuasion is primary, favor `intro-page`.
- If tradeoffs must be understood, favor `comparison-page`.

When a page could fit more than one mode, choose the mode based on the page's primary job, then borrow secondary regions as needed. Do not hybridize so much that the page loses clarity.

## Code Structure Rules

Optimize for later AI modification and localized edits.

- Separate HTML, CSS, and JS into different files.
- Give every page a unique parent root ID such as `#page-dashboard` or `#page-order-detail`.
- Lock all custom CSS under that root ID.
- Never use global tag selectors such as bare `div`, `button`, `input`, `table`, or `h1` rules.
- Avoid broad utility leakage across pages.
- Use strong local naming for modules and regions.
- Prefer modular Flex and Grid layouts with clear local boundaries.
- Keep each module structurally self-contained so changes stay local.

### Styling Rules

- Use Tailwind CSS for primary styling and layout.
- If additional custom CSS is needed, place it in the page-specific CSS file and scope it under the page root ID.
- Do not create page-wide or app-wide custom CSS that is difficult to isolate.
- Favor component-local spacing, layout, and state styles that are easy to patch.

### Interaction Rules

- Inputs should include useful placeholder text unless the pattern clearly should not use one.
- Destructive actions should use a confirmation modal or confirmation dialog.
- Buttons, filters, tabs, and navigation should show clear interactive states.
- Multi-page prototypes with repeated menus should use one shared navigation data source for menu labels, targets, and current-page mapping.
- Shared navigation should provide data only. Do not centralize full page HTML, page-specific CSS, or business-module markup in the navigation layer.
- Each page should have a stable page identifier and route key that maps to its navigation item and target file.
- Repeated menu links should resolve through the shared navigation mapping rather than duplicated page-local hardcoded targets.
- Empty, loading, success, and error states should be present when they are important to understanding the module.
- The requirements overlay must render above all page content and remain easy to open and close.
- The requirements button should route to or reveal the shared requirements document at the matching page section.
- The current page should have a stable mapping to a requirements section ID or anchor.
- The author/editor role should see edit controls for the requirements document; viewer roles should not.
- Overlay, modal, drawer, dropdown, and floating-panel components must have explicit open and closed states.
- Component CSS must not override the visibility behavior of state classes such as `hidden`, `open`, `closed`, `active`, or equivalent state selectors.
- If a component uses a hidden state, ensure the hidden state actually removes visibility and interaction, rather than being visually present but logically "closed".
- Add high-confidence interactions proactively when they are strongly implied by the page pattern or common product conventions.
- Do not invent uncertain business interactions by default; if the interaction is not strongly implied, wait for the user to specify it.
- Prefer lightweight frontend-only interactions such as search input state, filter toggles, tab switching, modal open/close, row-to-detail navigation, pagination changes, and delete confirmation when these are obvious from the UI.

## QA Checklist

Before finishing, verify:

- Is the chosen mode correct for the scenario?
- Can a reviewer understand the main point quickly?
- Is the structure clearer than the source text?
- Is the output editable where it needs to be editable?
- Are annotations present when the artifact is for review or handoff?
- Does the visual fidelity match the user's actual need?
- Are there any obviously generic sections, fake polish, or empty UI?
- If the prototype has repeated navigation, does every page read from the same navigation config or mapping source?
- If the prototype has repeated navigation, do all menu targets point to existing page files?
- If the prototype has repeated navigation, is the current-page highlight derived from the page's stable page ID or route key?
- If there is an overlay, modal, drawer, or floating panel, does the open action work?
- If there is an overlay, modal, drawer, or floating panel, does the close button work?
- If there is an overlay, modal, drawer, or floating panel, does clicking the mask or background close it when expected?
- If there is an overlay, modal, drawer, or floating panel, does `Esc` close it when implemented?
- After closing an overlay, is it actually hidden and no longer blocking page interaction?

## Common Failure Modes

Avoid these:

- defaulting to high-fidelity when low-fidelity is better
- making beautiful screens with weak product logic
- omitting page descriptions in review contexts
- using diagrams when a screen would explain better
- using screens when a flow would explain better
- overloading every screen with too much content
- ignoring the user's existing style or template inputs
- generating one huge page before the page framework is settled
- using global CSS that causes unrelated changes to spread
- copying menu markup and link targets separately on every page without a shared mapping source
- sharing too much cross-page code, so a local page adjustment accidentally changes unrelated pages
- building visually polished pages with weak interaction details
- hiding requirement notes outside the page artifact when in-page review is expected
- duplicating the requirements document separately on every page
- failing to map pages to stable requirement sections
- exposing edit controls to non-editor roles

## Reference Files

Read `references/modes.md` when you need more detail on:

- how to choose a mode
- what each mode should include
- what outputs fit each scenario

Read `references/output-architecture.md` when you need more detail on:

- page-by-page build strategy
- file structure
- annotation modal behavior
- low-fi and hi-fi implementation standards

Read `references/page-modes.md` when you need more detail on:

- when to use each page mode
- which regions typically belong to each page mode
- how low-fi and high-fi should differ by page mode

Read `references/page-module-rules.md` when you need more detail on:

- common required modules per page mode
- optional modules per page mode
- minimum interaction expectations
- typical mistakes to avoid

Read `references/requirements-system.md` when you need more detail on:

- shared requirements document behavior
- page-to-section mapping
- view, edit, and download permissions
- requirements overlay structure

Read `references/navigation-system.md` when you need more detail on:

- shared navigation config design
- page-to-menu mapping
- current-page highlight rules
- link consistency validation

Read `references/requirements-schema.md` when you need more detail on:

- standard section fields
- required and optional requirement data
- document-level metadata
- implementation-friendly data structure

Bundled example assets live under `assets/examples/` and can be used as reference material when building or refining prototype outputs.
