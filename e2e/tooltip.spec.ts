import { test, expect } from '@playwright/test';
import { storyUrl } from './helpers';

test('opens on hover after the delay and closes on unhover', async ({ page }) => {
  await page.goto(storyUrl('components-tooltip--default'));

  const tooltip = page.getByRole('tooltip');
  await expect(tooltip).toBeHidden();

  await page.getByRole('button', { name: 'Share' }).hover();
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText('Copies the current URL to your clipboard');

  await page.mouse.move(0, 0);
  await expect(tooltip).toBeHidden();
});

test('opens on keyboard focus', async ({ page }) => {
  await page.goto(storyUrl('components-tooltip--instant'));

  await page.getByRole('button', { name: 'Share' }).focus();
  await expect(page.getByRole('tooltip')).toBeVisible();
});

test('describes its trigger while open', async ({ page }) => {
  await page.goto(storyUrl('components-tooltip--instant'));

  const trigger = page.getByRole('button', { name: 'Share' });
  await trigger.hover();

  const tooltip = page.getByRole('tooltip');
  await expect(tooltip).toBeVisible();

  const describedBy = await trigger.locator('xpath=..').getAttribute('aria-describedby');
  expect(describedBy).toBe(await tooltip.getAttribute('id'));
});

test('escape closes it immediately', async ({ page }) => {
  await page.goto(storyUrl('components-tooltip--instant'));

  await page.getByRole('button', { name: 'Share' }).focus();
  await expect(page.getByRole('tooltip')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByRole('tooltip')).toBeHidden();
});

test('disabled tooltips never open', async ({ page }) => {
  await page.goto(storyUrl('components-tooltip--disabled'));

  await page.getByRole('button', { name: 'Share' }).hover();
  await expect(page.getByRole('tooltip')).toBeHidden();
});
