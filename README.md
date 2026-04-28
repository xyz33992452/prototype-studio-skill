# prototype-studio

`prototype-studio` is a Codex skill for generating, refining, and reviewing product prototypes across multiple fidelity levels.

It is designed for product managers, designers, pre-sales teams, and reviewers who need:

- low-fidelity wireframes
- annotated review prototypes
- high-fidelity clickable prototypes
- flow and information architecture artifacts
- shared in-prototype requirements notes for review and iteration

## What This Repo Contains

- `SKILL.md`: the main skill definition
- `references/`: supporting guidance for page modes, output architecture, navigation, and requirements structure
- `assets/examples/`: example prototype assets and reference implementations
- `agents/`: skill metadata for Codex

## Notable Features

- multi-page prototype structure by default
- one shared requirements document across the prototype
- shared navigation mapping for repeated menus
- page-to-requirement section mapping
- role-aware requirements viewing and editing
- richer requirement-note schema, including:
  - data definitions
  - calculation logic
  - interaction details
  - preconditions
  - field constraints
  - sorting rules
  - pagination
  - form fields
  - exception handling

## Install

Copy this folder into your Codex skills directory:

- Windows: `C:\Users\<you>\.codex\skills\prototype-studio`

Then restart Codex or start a new session.

## Typical Use Cases

- generate a new prototype from rough product requirements
- refine an existing prototype
- add requirement notes directly into the prototype
- create review-ready annotated screens
- produce page maps or user flows

## Contributing

Contributions are welcome, especially in these areas:

- better page-mode guidance
- stronger requirement-note structures
- more example prototypes
- review and QA workflows
- safer multi-page navigation patterns

When contributing, prefer changes that keep:

- page edits local
- requirements data structured
- navigation mappings stable
- examples easy to understand and reuse

Open an issue for ideas, bugs, or discussion. Forks and pull requests are welcome.

## License

MIT
