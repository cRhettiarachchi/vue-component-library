import { test, expect } from '@playwright/test';
import { storyUrl } from './helpers';

test('primary button renders with the accent token color', async ({ page }) => {
  await page.goto(storyUrl('components-button--primary'));
  const button = page.getByRole('button', { name: 'Button' });
  await expect(button).toBeVisible();
  // --ui-accent -> teal-9 (#12a594)
  await expect(button).toHaveCSS('background-color', 'rgb(18, 165, 148)');
});

test('disabled button is not interactive', async ({ page }) => {
  await page.goto(storyUrl('components-button--disabled'));
  await expect(page.getByRole('button', { name: 'Button' })).toBeDisabled();
});

test('asChild renders the child element instead of a button', async ({ page }) => {
  await page.goto(storyUrl('components-button--as-link'));
  const link = page.getByRole('link', { name: 'Renders as a link' });
  await expect(link).toBeVisible();
  await expect(link).toHaveClass(/ui-button/);
  // Scoped to the story root: Storybook addons inject hidden buttons elsewhere in the iframe.
  await expect(page.locator('#storybook-root button')).toHaveCount(0);
});

test('dark theme flips the canvas background', async ({ page }) => {
  await page.goto(storyUrl('components-button--primary'));
  await expect(page.getByRole('button', { name: 'Button' })).toBeVisible();
  const light = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);

  await page.goto(storyUrl('components-button--primary', { theme: 'dark' }));
  await expect(page.locator('html')).toHaveClass(/dark/);
  const dark = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);

  expect(dark).not.toBe(light);
});
