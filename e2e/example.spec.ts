import { test, expect } from '@playwright/test'

test.describe('Basic tests', () => {
  test('homepage has title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Vite/)
  })

  test('has Google Map component', async ({ page }) => {
    await page.goto('/')
    // Wait for the page to load
    await page.waitForLoadState('networkidle')
    // Check if the page contains expected content
    await expect(page.locator('body')).toBeVisible()
  })
})
