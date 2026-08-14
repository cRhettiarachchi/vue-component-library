import { test, expect } from '@playwright/test';
import { storyUrl } from './helpers';

test('renders title, subtitle and media', async ({ page }) => {
  await page.goto(storyUrl('components-card--default'));
  const card = page.locator('.ui-card');

  await expect(card.getByText('Barbell Bench Press')).toBeVisible();
  await expect(card.getByText('Chest · Strength')).toBeVisible();
  await expect(card.locator('.ui-card__media img')).toBeVisible();
});

test('renders without a media slot', async ({ page }) => {
  await page.goto(storyUrl('components-card--without-media'));
  const card = page.locator('.ui-card');

  await expect(card.getByText('Barbell Bench Press')).toBeVisible();
  await expect(card.locator('.ui-card__media')).toHaveCount(0);
});

test('truncates long text instead of overflowing its container', async ({ page }) => {
  await page.goto(storyUrl('components-card--long-content'));
  const card = page.locator('.ui-card');
  const title = card.locator('.ui-card__title');

  const cardBox = await card.boundingBox();
  expect(cardBox!.width).toBeLessThanOrEqual(260);
  const truncated = await title.evaluate((el) => el.scrollWidth > el.clientWidth);
  expect(truncated).toBe(true);
});

test('fits a mobile viewport without horizontal scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 640 });
  await page.goto(storyUrl('components-card--default'));

  const overflows = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(overflows).toBe(false);

  const cardBox = await page.locator('.ui-card').boundingBox();
  expect(cardBox!.width).toBeLessThanOrEqual(320);
});
