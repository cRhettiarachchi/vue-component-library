import { test, expect } from '@playwright/test';
import { storyUrl } from './helpers';

test('raising a toast renders it in the viewport', async ({ page }) => {
  await page.goto(storyUrl('components-toast--queue'));

  await page.getByTestId('notify').click();

  const toast = page.getByRole('status');
  await expect(toast).toBeVisible();
  await expect(toast).toContainText('Deployment finished');
  await expect(toast).toContainText('v2.4.1 is live.');
});

test('the close button dismisses the toast it belongs to', async ({ page }) => {
  await page.goto(storyUrl('components-toast--queue'));

  await page.getByTestId('notify').click();
  await expect(page.getByRole('status')).toBeVisible();

  await page.getByRole('button', { name: 'Dismiss notification' }).click();
  await expect(page.getByRole('status')).toHaveCount(0);
});

test('several toasts stack up', async ({ page }) => {
  await page.goto(storyUrl('components-toast--queue'));

  await page.getByTestId('notify').click();
  await page.getByTestId('notify').click();
  await page.getByTestId('notify').click();

  await expect(page.getByRole('status')).toHaveCount(3);
});

test('the queue never grows past four toasts', async ({ page }) => {
  await page.goto(storyUrl('components-toast--queue'));

  for (let i = 0; i < 5; i++) {
    await page.getByTestId('notify').click();
  }

  await expect(page.getByRole('status')).toHaveCount(4);
});

test('clear all empties the viewport', async ({ page }) => {
  await page.goto(storyUrl('components-toast--queue'));

  await page.getByTestId('notify').click();
  await page.getByTestId('notify').click();
  await expect(page.getByRole('status')).toHaveCount(2);

  await page.getByTestId('clear').click();
  await expect(page.getByRole('status')).toHaveCount(0);
});
