import { test, expect } from '@playwright/test';
import { storyUrl } from './helpers';

test('shows the first tab panel by default', async ({ page }) => {
  await page.goto(storyUrl('components-tabs--default'));

  await expect(page.getByRole('tab', { name: 'Overview' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.getByRole('tabpanel')).toContainText('Everything that happened this week.');
});

test('switches panel on click', async ({ page }) => {
  await page.goto(storyUrl('components-tabs--default'));

  await page.getByRole('tab', { name: 'Activity' }).click();

  await expect(page.getByRole('tab', { name: 'Activity' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
  await expect(page.getByRole('tabpanel')).toContainText('12 deploys, 3 rollbacks.');
});

test('arrow keys move between tabs and skip disabled ones', async ({ page }) => {
  await page.goto(storyUrl('components-tabs--default'));

  await page.getByRole('tab', { name: 'Overview' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Activity' })).toBeFocused();

  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Settings' })).toBeFocused();

  // 'Archived' is disabled, so the roving focus wraps back to the first tab.
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Overview' })).toBeFocused();
});

test('manual activation waits for Enter', async ({ page }) => {
  await page.goto(storyUrl('components-tabs--manual-activation'));

  await page.getByRole('tab', { name: 'Overview' }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Overview' })).toHaveAttribute(
    'aria-selected',
    'true',
  );

  await page.keyboard.press('Enter');
  await expect(page.getByRole('tab', { name: 'Activity' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
});

test('starts on the tab named by the model value', async ({ page }) => {
  await page.goto(storyUrl('components-tabs--second-tab-selected'));

  await expect(page.getByRole('tab', { name: 'Activity' })).toHaveAttribute(
    'aria-selected',
    'true',
  );
});
