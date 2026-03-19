import { test, expect } from "@playwright/test"

test.describe("Auth Flow", () => {
  test("signin page loads with form", async ({ page }) => {
    await page.goto("/login")
    await expect(page.getByRole("heading", { name: /Welcome back/i })).toBeVisible()
    await expect(page.locator("input[type=email], input[placeholder*='company.com']")).toBeVisible()
    await expect(page.locator("input[type=password]")).toBeVisible()
    await expect(page.getByRole("button", { name: /Sign in/i })).toBeVisible()
    // Google OAuth
    await expect(page.getByRole("button", { name: /Continue with Google/i })).toBeVisible()
  })

  test("signup page loads with form", async ({ page }) => {
    await page.goto("/signup")
    await expect(page.getByRole("heading", { name: /Create your account/i })).toBeVisible()
    await expect(page.locator("input[placeholder='Alex Johnson']")).toBeVisible()
    await expect(page.locator("input[placeholder='you@company.com']")).toBeVisible()
    await expect(page.locator("input[type=password]")).toBeVisible()
    await expect(page.getByRole("button", { name: /Create account/i })).toBeVisible()
  })

  test("signup links to terms and privacy", async ({ page }) => {
    await page.goto("/signup")
    await expect(page.getByRole("link", { name: "Terms" })).toBeVisible()
    await expect(page.getByRole("link", { name: "Privacy Policy" })).toBeVisible()
  })

  test("protected route /dashboard redirects to login", async ({ page }) => {
    await page.goto("/dashboard")
    await expect(page).toHaveURL(/login/)
  })

  test("signup validation shows error for incomplete form", async ({ page }) => {
    await page.goto("/signup")
    await page.getByRole("button", { name: /Create account/i }).click()
    // Should stay on signup or show validation
    // HTML5 validation should block empty submission
    await expect(page).toHaveURL(/signup/)
  })
})
