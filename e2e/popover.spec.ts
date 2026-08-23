import { test, expect } from '@playwright/test';
import { storyUrl } from './helpers';

test('opens from the trigger and focuses the first field', async ({ page }) => {
  await page.goto(storyUrl('components-popover--default'));
  await page.getByRole('button', { name: 'Add label' }).click();

  const popover = page.getByRole('dialog');
  await expect(popover).toBeVisible();
  await expect(popover.getByLabel('Label name')).toBeFocused();
});

test('closes on Escape and hands focus back to the trigger', async ({ page }) => {
  await page.goto(storyUrl('components-popover--default'));

  const trigger = page.getByRole('button', { name: 'Add label' });
  await trigger.click();
  await expect(page.getByRole('dialog')).toBeVisible();

  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('closes when clicking outside', async ({ page }) => {
  await page.goto(storyUrl('components-popover--default'));
  await page.getByRole('button', { name: 'Add label' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();

  await page.mouse.click(5, 5);
  await expect(page.getByRole('dialog')).toBeHidden();
});

test('clicking inside the panel keeps it open', async ({ page }) => {
  await page.goto(storyUrl('components-popover--default'));
  await page.getByRole('button', { name: 'Add label' }).click();

  const popover = page.getByRole('dialog');
  await popover.getByLabel('Label name').click();
  await expect(popover).toBeVisible();
});

test('traps focus inside the panel while open', async ({ page }) => {
  await page.goto(storyUrl('components-popover--default'));
  await page.getByRole('button', { name: 'Add label' }).click();
  await expect(page.getByRole('dialog')).toBeVisible();

  // More stops than the panel contains; focus must stay inside it.
  for (let i = 0; i < 5; i++) {
    await page.keyboard.press('Tab');
    const focusInPopover = await page.evaluate(
      () => !!document.activeElement?.closest('[role="dialog"]'),
    );
    expect(focusInPopover).toBe(true);
  }
});
