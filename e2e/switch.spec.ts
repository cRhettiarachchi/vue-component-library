import { test, expect } from '@playwright/test';
import { storyUrl } from './helpers';

test('toggles on click', async ({ page }) => {
  await page.goto(storyUrl('components-switch--default'));
  const switchControl = page.getByRole('switch');

  await expect(switchControl).toHaveAttribute('aria-checked', 'false');
  await switchControl.click();
  await expect(switchControl).toHaveAttribute('aria-checked', 'true');
  await expect(switchControl).toHaveAttribute('data-state', 'checked');
});

test('toggles with the keyboard', async ({ page }) => {
  await page.goto(storyUrl('components-switch--default'));
  const switchControl = page.getByRole('switch');

  await switchControl.focus();
  await page.keyboard.press('Space');
  await expect(switchControl).toHaveAttribute('aria-checked', 'true');
  await page.keyboard.press('Enter');
  await expect(switchControl).toHaveAttribute('aria-checked', 'false');
});

test('checked story starts on', async ({ page }) => {
  await page.goto(storyUrl('components-switch--checked'));
  await expect(page.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
});

test('disabled switch cannot be toggled', async ({ page }) => {
  await page.goto(storyUrl('components-switch--disabled'));
  const switchControl = page.getByRole('switch');

  await expect(switchControl).toBeDisabled();
  await switchControl.click({ force: true });
  await expect(switchControl).toHaveAttribute('aria-checked', 'false');
});
