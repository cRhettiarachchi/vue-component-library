import { test, expect } from '@playwright/test';
import { storyUrl } from './helpers';

test('accepts typed text', async ({ page }) => {
  await page.goto(storyUrl('components-input--default'));
  const input = page.getByRole('textbox', { name: 'Example input' });

  await input.fill('Hello tokens');
  await expect(input).toHaveValue('Hello tokens');
});

test('disabled input is not editable', async ({ page }) => {
  await page.goto(storyUrl('components-input--disabled'));
  await expect(page.getByRole('textbox', { name: 'Example input' })).toBeDisabled();
});
