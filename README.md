# Interactive Event Seating Map

A React + TypeScript application for selecting seats in an event venue.

## Features

- **Interactive Map**: Rendered using SVG for scalability and accessibility.
- **Seat Selection**: Click to select up to 8 seats.
- **Live Summary**: View selected seats and total price.
- **Persistence**: Selections are saved to `localStorage`.
- **Accessibility**: Keyboard navigation (Tab/Enter/Space) and ARIA labels.
- **Interactive Map**: Rendered using SVG for scalability and performance.
- **Seat Selection**: Click to select/deselect seats (max 8).
- **Live Summary**: View selected seats and total cost in real-time.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Accessibility**: ARIA labels and keyboard navigation support.
- **Persistence**: Selections are saved to local storage.
- **Zoom & Pan**: Smooth map navigation with zoom controls.
- **Heatmap Mode**: Visualize seat prices with a color gradient.
- **Dark Mode**: Toggle between light and dark themes.

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS Modules
- `react-zoom-pan-pinch`
- Playwright (E2E Testing)

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

## Testing

### Performance Testing

To generate a large dataset (approx. 15,000 seats):

1.  Run the generation script:
    ```bash
    npx tsx scripts/generate-large-venue.ts
    ```
2.  Update `src/context/BookingContext.tsx` to fetch `/venue-large.json` instead of `/venue.json`.
3.  Reload the app.

### End-to-End Testing

To run the end-to-end tests using Playwright:

1.  Install Playwright browsers (if not already installed):

    ```bash
    pnpm exec playwright install
    ```

2.  Run the tests:

    ```bash
    pnpm exec playwright test
    ```

    This will start the development server automatically and run the tests in headless mode.

## Incomplete Features / TODOs

- **WebSocket Updates**: Real-time status updates are not implemented.
- **Unit Tests**: Comprehensive unit test coverage is a future improvement.
