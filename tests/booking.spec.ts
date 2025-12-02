import { test, expect } from '@playwright/test';

test.describe('Booking Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should allow selecting seats and update summary', async ({ page }) => {
    await expect(page.locator('[data-testid^="seat-"]').first()).toBeVisible({ timeout: 10000 });

    const firstSeat = page.locator('[aria-label*="Status available"]').first();
    await firstSeat.click();

    await expect(firstSeat).toHaveAttribute('aria-pressed', 'true');

    await expect(page.locator('text=Your Selection')).toBeVisible();
    const totalText = await page
      .locator('text=Total')
      .locator('..')
      .locator('span')
      .last()
      .textContent();
    expect(totalText).not.toBe('$0');
  });

  test('should limit selection to 8 seats', async ({ page }) => {
    await expect(page.locator('[data-testid^="seat-"]').first()).toBeVisible({ timeout: 10000 });

    const availableSeatLocators = await page.locator('[aria-label*="Status available"]').all();

    const availableSeatIds = [];
    for (let i = 0; i < availableSeatLocators.length; i++) {
      const seatId = await availableSeatLocators[i].getAttribute('data-testid');
      if (seatId) {
        availableSeatIds.push(seatId);
      }
    }

    const seatsToSelect = Math.min(availableSeatLocators.length, 8);

    expect(availableSeatLocators.length).toBeGreaterThan(0);

    // Select the available seats up to the limit (8)
    for (let i = 0; i < seatsToSelect; i++) {
      const seat = page.locator(`[data-testid="${availableSeatIds[i]}"]`);
      await seat.click();
      await expect(seat).toHaveAttribute('aria-pressed', 'true');
    }

    // If there are 9 available seats, try to select the 9th and expect an alert
    if (availableSeatLocators.length >= 9) {
      const ninthSeat = page.locator(`[data-testid="${availableSeatIds[8]}"]`);
      page.once('dialog', async (dialog) => {
        expect(dialog.message()).toContain('You can only select up to 8 seats');
        await dialog.accept();
      });
      await ninthSeat.click();
    }

    const selectedCount = await page.locator('[aria-pressed="true"]').count();
    expect(selectedCount).toBe(seatsToSelect);
  });

  test('should persist selections on reload', async ({ page }) => {
    await expect(page.locator('[data-testid^="seat-"]').first()).toBeVisible({ timeout: 10000 });
    const firstSeat = page.locator('[aria-label*="Status available"]').first();
    const seatId = await firstSeat.getAttribute('data-testid');

    await firstSeat.click();
    await expect(firstSeat).toHaveAttribute('aria-pressed', 'true');

    await page.reload();
    await expect(page.locator('[data-testid^="seat-"]').first()).toBeVisible({ timeout: 10000 });

    const persistedSeat = page.locator(`[data-testid="${seatId}"]`);
    await expect(persistedSeat).toHaveAttribute('aria-pressed', 'true');
  });

  test('should toggle dark mode', async ({ page }) => {
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.click('text=🌙 Dark Mode');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    await expect(page.locator('text=☀️ Light Mode')).toBeVisible();
  });
});
