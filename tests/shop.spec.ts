import { test, expect } from '@playwright/test';

test.describe('Shop checkout flow', () => {
  test('should allow user to add a product to cart and proceed to checkout', async ({ page }) => {
    // 1. Enter the site
    await page.goto('/');

    // Ensure we are on a page that looks like the store
    // Check for some main heading or title. Let's check for the header or nav
    await expect(page.locator('nav')).toBeVisible();

    // 2. Select a product (click first product link)
    // We assume the home page lists products or categories that lead to products
    const firstProductLink = page.locator('a[href^="/product/"]').first();
    
    // Wait for product links to be visible, if none exist on home page, 
    // it means it redirects or we need to navigate to products
    await expect(firstProductLink).toBeVisible();
    await firstProductLink.click();

    // 3. Add to cart
    // Wait for the product page to load and find the "Add to cart" button
    const addToCartBtn = page.getByRole('button', { name: /Add to cart|Dodaj do koszyka/i });
    await expect(addToCartBtn).toBeVisible();
    await addToCartBtn.click();

    // Wait for cart to be updated or navigate to cart
    // The application might have a cart link in the header.
    const cartLink = page.getByRole('link', { name: /Cart|Koszyk/i });
    await cartLink.click();

    // 4. Verify cart page
    await expect(page).toHaveURL(/\/cart/);
    
    // We should see a checkout button in the cart
    const checkoutBtn = page.getByRole('button', { name: /Checkout|Pay|Zapl/i });
    await expect(checkoutBtn).toBeVisible();
    
    // 5. Click checkout
    await checkoutBtn.click();

    // Ensure it either goes to Stripe checkout or our fallback success page
    await expect(page).toHaveURL(/checkout\.stripe\.com|cart\/success/);
  });
});
