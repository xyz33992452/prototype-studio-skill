# Page Module Rules

This file defines practical module guidance for the most common B-end product page modes.

These are not fixed templates. They are structural rules and quality guardrails.

## How to Use This File

For each page:

1. choose the primary page mode
2. include the core modules for that mode
3. add optional modules only when they support the page goal
4. satisfy the minimum interaction rules
5. avoid the listed failure patterns

## `list-page`

### Core modules

Usually include:

- page title and context
- search and/or filter region
- primary action region
- result list, card list, or table region

### Optional modules

Add when needed:

- summary metrics
- bulk action bar
- tab switcher
- saved filters
- pagination
- empty state

### Minimum interaction rules

- search inputs should have placeholder text
- filter changes should have clear visible effect
- row or card actions should be easy to locate
- destructive actions such as delete should require confirmation
- list areas should show mock data in low-fi and realistic sample data in high-fi
- empty state should appear if the page concept implies no-result scenarios

### Low-fi emphasis

- make filter hierarchy obvious
- keep primary action placement clear
- show enough mock rows to communicate density and structure
- use placeholders for thumbnails or charts if present

### High-fi emphasis

- support scanability through spacing and visual hierarchy
- show realistic table or card states
- include hover, selection, sort, and filter affordances when important
- make data density believable for enterprise usage

### Common mistakes

- overloading the top of the page with too many controls
- hiding the main action among minor actions
- making the result region look secondary
- failing to show what kind of data is being managed
- adding too many optional modules so the page loses focus

## `detail-page`

### Core modules

Usually include:

- page title and status
- summary information block
- grouped detail sections
- primary and secondary actions

### Optional modules

Add when needed:

- tabs
- timeline
- related records
- comments or notes
- side panel
- audit history

### Minimum interaction rules

- status and key attributes should be easy to find
- edit, return, close, approve, or similar actions should be clearly distinguished
- destructive actions should require confirmation
- long pages should use grouping or tabs to reduce overload
- related content should feel connected to the core entity

### Low-fi emphasis

- section grouping clarity
- summary versus detailed information separation
- obvious action locations
- simple placeholders for related media or attachments

### High-fi emphasis

- strong hierarchy between headline information and secondary detail
- polished grouping patterns such as cards, sections, tabs, or side panels
- realistic status chips, metadata formatting, and related-item presentation

### Common mistakes

- treating the page like a list page with one selected row
- mixing critical summary information into long detail sections
- putting too many actions at equal visual weight
- failing to show the entity's lifecycle or status clearly

## `form-page`

### Core modules

Usually include:

- page title and context
- grouped fields
- helper text or instructions where needed
- action region for save, submit, cancel, or back

### Optional modules

Add when needed:

- step indicator
- side summary
- inline guidance
- attachments
- history or change note area
- related entity picker

### Minimum interaction rules

- inputs should have meaningful placeholder text when appropriate
- required and optional fields should be distinguishable
- validation or helper text should be shown for important fields
- save/submit actions should be easy to identify
- destructive actions should require confirmation
- loading, success, and error feedback should be considered when relevant

### Low-fi emphasis

- field grouping and flow
- label clarity
- required information structure
- mock selections and representative field values

### High-fi emphasis

- polished form controls and spacing rhythm
- believable helper text and validation messaging
- clear focus, error, disabled, and success states
- strong action hierarchy between primary and secondary buttons

### Common mistakes

- placing too many unrelated fields in one undifferentiated block
- making all fields equal priority
- forgetting helper text where the field meaning is ambiguous
- leaving actions visually disconnected from the form

## `dashboard-page`

### Core modules

Usually include:

- page title and time/context controls
- key metric region
- chart or trend region
- one or more supporting data modules

### Optional modules

Add when needed:

- alert region
- recent activity
- ranking list
- quick filters
- drill-down shortcuts
- status summary

### Minimum interaction rules

- metric labels should be understandable without explanation
- charts should have enough context to be interpretable
- time filters or segment filters should be easy to identify
- key alerts or anomalies should stand out when relevant
- supporting modules should not compete equally with the main metrics

### Low-fi emphasis

- metric priority
- chart placement and role
- clear information hierarchy
- placeholder chart blocks with labels

### High-fi emphasis

- believable chart and metric styling
- careful density control
- strong contrast between primary metrics and secondary supporting data
- realistic enterprise overview feel

### Common mistakes

- turning the page into a pile of unrelated cards
- giving every widget equal emphasis
- using decorative charts without a clear insight purpose
- making the page visually rich but strategically empty
