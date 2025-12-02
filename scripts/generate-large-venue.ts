import fs from 'fs';
import path from 'path';

const SECTIONS_COUNT = 10;
const ROWS_PER_SECTION = 50;
const SEATS_PER_ROW = 30;
// Total = 10 * 50 * 30 = 15,000 seats

const sections = [];

for (let s = 0; s < SECTIONS_COUNT; s++) {
    const sectionId = String.fromCharCode(65 + s); // A, B, C...
    const rows = [];

    for (let r = 1; r <= ROWS_PER_SECTION; r++) {
        const seats = [];
        for (let c = 1; c <= SEATS_PER_ROW; c++) {
            const statusRandom = Math.random();
            let status = 'available';
            if (statusRandom > 0.9) status = 'sold';
            else if (statusRandom > 0.8) status = 'reserved';
            else if (statusRandom > 0.75) status = 'held';

            seats.push({
                id: `${sectionId}-${r}-${c}`,
                col: c,
                x: c * 25, // 25px spacing
                y: r * 25,
                priceTier: 50 + Math.floor(Math.random() * 50),
                status
            });
        }
        rows.push({
            index: r,
            seats
        });
    }

    sections.push({
        id: sectionId,
        label: `Section ${sectionId}`,
        transform: { x: (s % 5) * 800, y: Math.floor(s / 5) * 1300, scale: 1 },
        rows
    });
}

const venue = {
    venueId: 'large-arena-15k',
    name: 'Mega Dome (15k Seats)',
    map: { width: 4000, height: 3000 },
    sections
};

const outputPath = path.join(process.cwd(), 'public', 'venue-large.json');
fs.writeFileSync(outputPath, JSON.stringify(venue, null, 2));

console.log(`Generated ${outputPath} with ~${SECTIONS_COUNT * ROWS_PER_SECTION * SEATS_PER_ROW} seats.`);
