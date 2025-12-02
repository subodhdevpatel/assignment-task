# Interactive Event Seating Map

A React + TypeScript application for selecting seats in an event venue.

## Features

- **Interactive Map**: Rendered using SVG for scalability and accessibility.
- **Seat Selection**: Click to select up to 8 seats.
- **Live Summary**: View selected seats and total price.
- **Persistence**: Selections are saved to `localStorage`.
- **Accessibility**: Keyboard navigation (Tab/Enter/Space) and ARIA labels.
- **Responsive**: Adapts to desktop and mobile viewports.
- **Performance**: Optimized for large venues (tested with 15k seats).

## Architecture & Trade-offs

- **SVG Rendering**: Chosen for its built-in accessibility (DOM nodes) and ease of styling with CSS. For extremely large datasets (>50k), Canvas might be more performant, but SVG handles 15k well with `React.memo`.
- **Context API**: Used for state management (`BookingContext`) to avoid prop drilling and simplify state sharing between the Map and Summary.
- **Vanilla CSS**: Used CSS Modules for scoped styling without the overhead of a CSS-in-JS library, keeping the bundle size small.
- **Vite**: Selected for fast development server and optimized build.

## Getting Started

1.  Install dependencies:

    ```bash
    pnpm install
    ```

2.  Run the development server:

    ```bash
    pnpm dev
    ```

3.  Open [http://localhost:5173](http://localhost:5173) in your browser.

## Testing Performance

To test with a large dataset (15k seats):

1.  Run the generator script:
    ```bash
    npx tsx scripts/generate-large-venue.ts
    ```
2.  Update `src/context/BookingContext.tsx` to fetch `/venue-large.json` instead of `/venue.json`.
3.  Reload the app.
