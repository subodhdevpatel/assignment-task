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

## Screenshots
Seat details:
<img width="1600" height="731" alt="image" src="https://github.com/user-attachments/assets/3dd9524d-3663-446c-beef-3583ebca4954" />

Seat selection:
<img width="1600" height="731" alt="image" src="https://github.com/user-attachments/assets/7c4045b9-c782-4b5c-bdea-672ee7f287ac" />

Dark mode with price heat map
<img width="1600" height="731" alt="image" src="https://github.com/user-attachments/assets/c9178dd0-1df8-4780-a424-29212658a2d1" />

Rendered with approax 15k seats by generating seats using script
<img width="1600" height="731" alt="image" src="https://github.com/user-attachments/assets/53838715-aa4c-4d85-8154-a5a982360517" />

15K seats rendered with price heat map
<img width="1600" height="731" alt="image" src="https://github.com/user-attachments/assets/b70c14c5-591b-4cd8-9cf4-7f2910f99268" />

E2E tests using playwright
<img width="806" height="726" alt="image" src="https://github.com/user-attachments/assets/5df29ffa-6ce2-4932-80a1-7831a3661e9e" />
