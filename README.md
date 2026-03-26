# CZ.NIC Frontend Task

This repository contains my solution for the frontend assignment built with **Vue 3**, **TypeScript**, and **Vite**. The goal was to deliver a functional, readable, and maintainable UI with a basic component structure, interactive behavior, and initial test coverage.

## Tech Stack

- Vue 3
- TypeScript
- Vite
- Vitest
- Vue Test Utils
- Lucide Vue Next

## Implemented Scope

The current solution includes:

- application layout structure
- top bar and sidebar
- domain-related UI cards
- local component state handling
- interaction logic for selected UI elements
- initial unit test setup and test coverage for selected components

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Run tests:

```bash
npx vitest
```

## Testing

The project includes a working **Vitest** setup for Vue component testing and an initial set of unit tests focused mainly on:

- component rendering
- emitted events
- button and menu interactions
- conditional rendering
- timed behavior in `DomainOverviewCard`

### Current State of Test Coverage

The current tests provide a good starting point, but the overall coverage should be considered **basic rather than complete**. For a production-level codebase, I would extend the test suite further.

## Architectural Notes

The implementation is intentionally lightweight and focused on completing the assignment scope. That said, there are several areas where the codebase could be improved if developed further.

### 1. More atomic and reusable components

Some parts of the UI would benefit from further decomposition into smaller, more reusable building blocks.

Examples of components that could be extracted or standardized further:

- base button variants
- icon button
- reusable card wrapper
- label/value row component
- dropdown/menu container
- toggle/switch UI primitives

A more component-driven approach would reduce duplication and create a clearer design system foundation.

### 2. More global and universal styling approach

At the moment, styling is handled mostly at the component level, which is acceptable for a smaller assignment. However, for a larger or long-term project, I would move more styling decisions into a shared global layer.

This would be especially useful for unifying:

- colors
- spacing
- border radius
- typography
- icon sizing
- hover and focus states
- repeated layout patterns

A stronger shared styling foundation could be implemented using:

- CSS custom properties / design tokens
- shared global styles
- reusable utility classes
- a more systematic UI style layer

This would make the UI easier to scale and keep visually consistent over time.

## Summary

The goal of this solution was to provide a functional and structured implementation of the requested assignment while keeping the code understandable and easy to extend.

At the same time, I see this repository primarily as a solid foundation rather than a finished production-ready system. With more time, I would focus next on:

- broader and deeper test coverage
- further decomposition into smaller reusable components
- stronger shared styling conventions
- improved consistency across component APIs
- clearer separation between presentation and logic
