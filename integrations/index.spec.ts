import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('should render the Hero section', async ({ page }) => {
  const title = page.locator('[data-test="home__title"]');
  await expect(title).toHaveText('Screamo Stack');
});

test('should render navigation navigation', async ({ page }) => {
  const navigation = page.locator('[data-test="navigation"]');
  await expect(navigation).toBeVisible();
});

test('should navigate to the /join page', async ({ page }) => {
  await page.click('[data-test="home__join"]');
  expect(page.url()).toMatch('/join');
});
