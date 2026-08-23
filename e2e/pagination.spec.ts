import { test, expect } from '@playwright/test';
import { storyUrl } from './helpers';

test('starts on the first page with the previous button disabled', async ({ page }) => {
  await page.goto(storyUrl('components-pagination--default'));

  await expect(page.getByRole('button', { name: 'Go to previous page' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Go to next page' })).toBeEnabled();
  await expect(page.getByRole('button', { name: 'Go to page 1', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('summarises the visible record range', async ({ page }) => {
  await page.goto(storyUrl('components-pagination--default'));

  await expect(page.getByRole('navigation', { name: 'Pagination' })).toContainText(
    'Showing 1–10 of 100 results',
  );

  await page.getByRole('button', { name: 'Go to page 2', exact: true }).click();
  await expect(page.getByRole('navigation', { name: 'Pagination' })).toContainText(
    'Showing 11–20 of 100 results',
  );
});

test('next and previous move one page at a time', async ({ page }) => {
  await page.goto(storyUrl('components-pagination--default'));

  await page.getByRole('button', { name: 'Go to next page' }).click();
  await expect(page.getByRole('button', { name: 'Go to page 2', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );

  await page.getByRole('button', { name: 'Go to previous page' }).click();
  await expect(page.getByRole('button', { name: 'Go to page 1', exact: true })).toHaveAttribute(
    'aria-current',
    'page',
  );
});

test('collapses long ranges behind an ellipsis', async ({ page }) => {
  await page.goto(storyUrl('components-pagination--wide-range'));

  await expect(page.getByRole('button', { name: 'Go to page 1', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Go to page 3', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Go to page 4', exact: true })).toBeHidden();
  await expect(page.getByRole('button', { name: 'Go to page 200', exact: true })).toBeVisible();
});

test('a single page renders no navigation targets beyond page one', async ({ page }) => {
  await page.goto(storyUrl('components-pagination--single-page'));

  await expect(page.getByRole('button', { name: 'Go to page 1', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Go to page 2', exact: true })).toBeHidden();
  await expect(page.getByRole('button', { name: 'Go to next page' })).toBeDisabled();
});

test('every control is inert when disabled', async ({ page }) => {
  await page.goto(storyUrl('components-pagination--disabled'));

  await expect(page.getByRole('button', { name: 'Go to page 2', exact: true })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Go to next page' })).toBeDisabled();
});
