import { test, expect } from '@playwright/test';
import { storyUrl } from './helpers';

test('marks the first page as current and disables the previous arrow', async ({ page }) => {
  await page.goto(storyUrl('components-pagination--default'));

  await expect(page.getByRole('navigation', { name: 'Pagination' })).toBeVisible();
  await expect(page.getByRole('button', { name: '1', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(page.getByRole('button').first()).toBeDisabled();
});

test('the next arrow advances the current page', async ({ page }) => {
  await page.goto(storyUrl('components-pagination--default'));

  await page.getByRole('button').last().click();
  await expect(page.getByRole('button', { name: '2', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('arrow keys move between pages', async ({ page }) => {
  await page.goto(storyUrl('components-pagination--default'));

  await page.getByRole('button', { name: '1', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('button', { name: '2', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('disabled pagination cannot be navigated', async ({ page }) => {
  await page.goto(storyUrl('components-pagination--disabled'));

  const first = page.getByRole('button', { name: '1', exact: true });
  await expect(first).toBeDisabled();
  await first.click({ force: true });
  await expect(first).toHaveAttribute('aria-current', 'page');
});
