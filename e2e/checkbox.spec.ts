import { test, expect } from '@playwright/test';
import { storyUrl } from './helpers';

test('toggles on click', async ({ page }) => {
  await page.goto(storyUrl('components-checkbox--default'));
  const checkbox = page.getByRole('checkbox');

  await expect(checkbox).toHaveAttribute('aria-checked', 'false');
  await checkbox.click();
  await expect(checkbox).toHaveAttribute('aria-checked', 'true');
  await expect(checkbox).toHaveAttribute('data-state', 'checked');
});

test('toggles with the keyboard', async ({ page }) => {
  await page.goto(storyUrl('components-checkbox--default'));
  const checkbox = page.getByRole('checkbox');

  await checkbox.focus();
  await page.keyboard.press('Space');
  await expect(checkbox).toHaveAttribute('aria-checked', 'true');
  await page.keyboard.press('Space');
  await expect(checkbox).toHaveAttribute('aria-checked', 'false');
});

test('checked story starts checked', async ({ page }) => {
  await page.goto(storyUrl('components-checkbox--checked'));
  await expect(page.getByRole('checkbox')).toHaveAttribute('aria-checked', 'true');
});

test('disabled checkbox cannot be toggled', async ({ page }) => {
  await page.goto(storyUrl('components-checkbox--disabled'));
  const checkbox = page.getByRole('checkbox');

  await expect(checkbox).toBeDisabled();
  await checkbox.click({ force: true });
  await expect(checkbox).toHaveAttribute('aria-checked', 'false');
});
