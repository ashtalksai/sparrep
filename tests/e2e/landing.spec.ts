import { test, expect } from "@playwright/test"

test.describe("Landing Page", () => {
  test("loads successfully with title and hero", async ({ page }) => {
    await page.goto("/")
    await expect(page).toHaveTitle(/SparrRep/)
    await expect(page.locator("h1")).toBeVisible()
    await expect(page.locator("h1")).toContainText(/Practice the call/)
  })

  test("has navbar with logo and nav links", async ({ page }) => {
    await page.goto("/")
    await expect(page.getByRole("banner")).toBeVisible()
    await expect(page.getByRole("link", { name: /SparrRep/ }).first()).toBeVisible()
    await expect(page.getByRole("link", { name: "About" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Pricing" })).toBeVisible()
  })

  test("has all 10 sections", async ({ page }) => {
    await page.goto("/")
    // Hero
    await expect(page.getByRole("heading", { name: /Practice the call/ })).toBeVisible()
    // Problem
    await expect(page.getByRole("heading", { name: /rehearsing on real deals/ })).toBeVisible()
    // Solution
    await expect(page.getByRole("heading", { name: /flight simulator/ })).toBeVisible()
    // Features
    await expect(page.getByRole("heading", { name: /Built for reps/ })).toBeVisible()
    // How it works
    await expect(page.getByRole("heading", { name: /Three steps/ })).toBeVisible()
    // Social Proof
    await expect(page.getByRole("heading", { name: /Reps who practice/ })).toBeVisible()
    // Pricing
    await expect(page.getByRole("heading", { name: /Pay for what/ })).toBeVisible()
    // FAQ
    await expect(page.getByRole("heading", { name: /Common questions/ })).toBeVisible()
    // CTA
    await expect(page.getByRole("heading", { name: /next call just got easier/ })).toBeVisible()
    // Footer
    await expect(page.locator("footer")).toBeVisible()
  })

  test("has no lorem ipsum", async ({ page }) => {
    await page.goto("/")
    const text = await page.locator("body").textContent()
    expect(text).not.toContain("Lorem ipsum")
    expect(text).not.toContain("Coming soon")
    expect(text).not.toContain("Placeholder")
  })

  test("hero CTA goes to signup", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("button", { name: "Start Sparring Free" }).first().click()
    await expect(page).toHaveURL(/signup/)
  })

  test("is responsive at 375px", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto("/")
    await expect(page.locator("h1")).toBeVisible()
    // Mobile menu button should exist
    const menuBtn = page.locator("[aria-label='Toggle menu'], button[aria-expanded]")
    await expect(menuBtn).toBeVisible()
  })
})
