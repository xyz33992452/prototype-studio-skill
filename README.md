# prototype-studio

`prototype-studio` is a public Codex skill for generating, refining, and reviewing product prototypes across multiple fidelity levels.

It is built for product managers, designers, solution teams, and reviewers who want prototypes that are not just visually presentable, but also structurally explainable and easy to iterate.

## What It Does

This skill helps Codex produce the right artifact for the situation instead of defaulting to a single “pretty UI” output.

It supports:

- low-fidelity wireframes
- annotated review prototypes
- high-fidelity clickable prototypes
- flow and information architecture artifacts
- multi-page prototype packs
- shared in-prototype requirements notes for review and iteration

## Why This Skill Exists

Many prototype outputs look polished but are weak in product logic, reviewability, or change isolation.

`prototype-studio` focuses on:

- page-by-page structure instead of one oversized artifact
- stable multi-page navigation patterns
- requirements notes that live inside the prototype workflow
- editable outputs that are easy for humans and AI to refine
- better support for PM review, handoff, and iterative product thinking

## Key Features

- multi-page prototype structure by default
- page-mode system instead of one rigid template style
- shared navigation mapping for repeated menus
- one shared requirements document across the prototype
- page-to-requirement section mapping
- role-aware requirements viewing and editing
- frontend-only default behavior for lighter, safer prototype generation

### Rich Requirement Notes

The shared requirements system supports much more than a short page summary.

It can capture common product-spec elements such as:

- target users
- main modules
- key interactions
- interaction details
- business rules
- data rules
- data definitions
- calculation logic
- preconditions
- field constraints
- sorting rules
- pagination
- form fields
- exception handling
- edge cases
- unresolved questions

## Good Fit Scenarios

Use this skill when you need to:

- turn rough product ideas into prototype pages
- create review-ready prototypes with requirement notes
- explain workflows, page maps, or IA structures
- refine an existing prototype while preserving edit isolation
- connect prototype output with product-spec thinking

## Repository Structure

- `SKILL.md`
  Main skill definition used by Codex.

- `references/`
  Supporting guidance for page modes, output architecture, navigation, and requirements structure.

- `assets/examples/`
  Example prototype assets and reference implementations.

- `agents/`
  Skill metadata for Codex.

## Example Contents

This repo currently includes a CRM-style example prototype with:

- an entry page
- a customer list page
- a customer detail page
- shared navigation config
- shared mock data
- shared requirements overlay

Example files live under:

- `assets/examples/prototype-studio-example/`

## Install

Copy this folder into your Codex skills directory:

- Windows: `C:\Users\<you>\.codex\skills\prototype-studio`

Then restart Codex or start a new session.

## Working Style

This skill is intentionally opinionated in a few areas:

- prefer multiple focused pages over one giant HTML file
- keep HTML, CSS, and JS separate
- isolate page-specific changes
- treat navigation as shared data, not shared page markup
- treat requirements notes as structured data, not scattered prose

## Contributing

Contributions are welcome.

Useful contribution areas include:

- better page-mode guidance
- stronger requirement-note structures
- better example prototypes
- review and QA workflows
- safer multi-page navigation patterns
- clearer collaboration ergonomics

Please prefer changes that keep:

- page edits local
- requirements data structured
- navigation mappings stable
- examples easy to understand and reuse

Open an issue for ideas, bugs, or discussion. Forks and pull requests are welcome.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the collaboration guide.

## Collaboration Features

This repository is set up for public collaboration with:

- public visibility
- forking enabled
- issue templates
- pull request template
- MIT license

## License

MIT
