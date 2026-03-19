import { test, expect } from "@playwright/test"

const viewports = [
  { name: "mobile", width: 375, height: 812 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1280, height: 800 },
]

const testPages = ["/", "/about", "/pricing", "/login", "/signup"]

for (const vp of viewports) {
  test.describe(`${vp.name} (${vp.width}px)`, () => {
    for (const path of testPages) {
      test(`${path} renders without overflow`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height })
        await page.goto(path)
        await expect(page.locator("body")).toBeVisible()
        // Check no horizontal overflow
        const scrollWidth = await page.evaluate(() => document.body.scrollWidth)
        expect(scrollWidth).toBeLessThanOrEqual(vp.width + 5) // 5px tolerance
      })
    }

    if (vp.width === 375) {
      test("/ has mobile menu button", async ({ page }) => {
        await page.setViewportSize({ width: 375, height: 812 })
        await page.goto("/")
        // Navbar should have hamburger at mobile
        const nav = page.locator("header, [role=banner]")
        await expect(nav).toBeVisible()
        // Desktop nav links should be hidden, mobile button visible
        const mobileToggle = page.locator("button[aria-label], button[aria-expanded], button:has(svg)")
        await expect(mobileToggle.first()).toBeVisible()
      })
    }
  })
}
