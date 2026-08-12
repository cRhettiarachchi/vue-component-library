import { test, expect } from '@playwright/test';
import { storyUrl } from './helpers';

test('opens from the trigger and is announced as a named dialog', async ({ page }) => {
  await page.goto(storyUrl('components-modal--default'));
  await page.getByRole('button', { name: 'Open modal' }).click();

  const dialog = page.getByRole('dialog', { name: 'Example modal' });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('Modal body content goes here.');
});

test('closes with Escape', async ({ page }) => {
  await page.goto(storyUrl('components-modal--default'));
  await page.getByRole('button', { name: 'Open modal' }).click();

  const dialog = page.getByRole('dialog', { name: 'Example modal' });
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).toBeHidden();
});

test('closes with the close button', async ({ page }) => {
  await page.goto(storyUrl('components-modal--default'));
  await page.getByRole('button', { name: 'Open modal' }).click();

  const dialog = page.getByRole('dialog', { name: 'Example modal' });
  await dialog.getByRole('button', { name: 'Close' }).click();
  await expect(dialog).toBeHidden();
});

test('traps focus inside the dialog while open', async ({ page }) => {
  await page.goto(storyUrl('components-modal--default'));
  await page.getByRole('button', { name: 'Open modal' }).click();
  await expect(page.getByRole('dialog', { name: 'Example modal' })).toBeVisible();

  // Tab through more stops than the dialog contains; focus must stay inside it.
  for (let i = 0; i < 6; i++) {
    await page.keyboard.press('Tab');
    const focusInDialog = await page.evaluate(
      () => !!document.activeElement?.closest('[role="dialog"]'),
    );
    expect(focusInDialog).toBe(true);
  }
});
