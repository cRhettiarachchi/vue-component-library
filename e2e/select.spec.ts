import { test, expect } from '@playwright/test';
import { storyUrl } from './helpers';

test('single mode: picks an option and closes', async ({ page }) => {
  await page.goto(storyUrl('components-select--default'));
  const trigger = page.getByRole('combobox');

  await expect(trigger).toContainText('Pick a fruit');
  await trigger.click();

  const listbox = page.getByRole('listbox');
  await expect(listbox).toBeVisible();
  await page.getByRole('option', { name: 'Banana' }).click();

  await expect(listbox).toBeHidden();
  await expect(trigger).toContainText('Banana');
});

test('multiple mode: picks several options and stays open', async ({ page }) => {
  await page.goto(storyUrl('components-select--multiple'));
  const trigger = page.getByRole('combobox');
  await trigger.click();

  await page.getByRole('option', { name: 'Apple', exact: true }).click();
  await page.getByRole('option', { name: 'Banana' }).click();

  await expect(page.getByRole('option', { name: 'Apple', exact: true })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.getByRole('option', { name: 'Banana' })).toHaveAttribute(
    'aria-selected',
    'true',
  );

  await page.keyboard.press('Escape');
  await expect(trigger).toContainText('Apple, Banana');
});

test('preselected value shows its label', async ({ page }) => {
  await page.goto(storyUrl('components-select--preselected'));
  await expect(page.getByRole('combobox')).toContainText('Banana');
});

test('disabled option cannot be selected', async ({ page }) => {
  await page.goto(storyUrl('components-select--default'));
  const trigger = page.getByRole('combobox');
  await trigger.click();

  const disabledOption = page.getByRole('option', { name: 'Pineapple' });
  await expect(disabledOption).toHaveAttribute('data-disabled', '');
  await disabledOption.click({ force: true });

  // Clicking it selects nothing: the dropdown stays open. Close it before
  // querying the trigger — while open, everything outside is aria-hidden.
  await expect(page.getByRole('listbox')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(trigger).toContainText('Pick a fruit');
});

test('opens with the keyboard and restores focus on close', async ({ page }) => {
  await page.goto(storyUrl('components-select--default'));
  const trigger = page.getByRole('combobox');

  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('listbox')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByRole('listbox')).toBeHidden();
  await expect(trigger).toBeFocused();
});
