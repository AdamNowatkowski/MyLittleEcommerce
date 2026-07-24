import { test, expect } from '@playwright/test';

// Jeśli uruchamiasz bota przeciwko produkcji, zmień poniższy adres lub ustaw zmienną BASE_URL
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test('Symulacja ruchu dla GA4: przeglądanie i dodawanie do koszyka', async ({ page }) => {
  // 1. Zdarzenie page_view na stronie głównej
  await page.goto(BASE_URL);
  await expect(page).toHaveTitle(/MyLittleEcommerce/);
  
  // Oczekujemy chwilę, by udawać prawdziwego użytkownika
  await page.waitForTimeout(2000);

  // 2. Szukamy dowolnego produktu na liście produktów (zakładamy że są widoczne)
  // Szukamy elementów z obrazkiem lub linków prowadzonych do /product/
  const productLinks = page.locator('a[href^="/product/"]');
  const count = await productLinks.count();
  
  if (count > 0) {
    // Klikamy w pierwszy produkt (zdarzenie view_item wywoła się na karcie produktu)
    await productLinks.first().click();
    
    await page.waitForTimeout(3000);
    
    // 3. Szukamy przycisku dodania do koszyka
    const addToCartBtn = page.getByTestId('add-to-cart-button');
    if (await addToCartBtn.isVisible()) {
      // Wyzwolenie zdarzenia add_to_cart (funkcja sendGAEvent w widoku AddToCartButton.tsx)
      await addToCartBtn.click();
      console.log("Kliknięto 'Add to cart' - wysłano zdarzenie add_to_cart.");
      await page.waitForTimeout(2000);
      
      // Opcjonalnie: przejście do koszyka i kasy (jeśli strona wspiera automatyczne przekierowanie lub mamy przycisk Checkout)
      // await page.goto(`${BASE_URL}/cart`);
      // const checkoutBtn = page.getByRole('button', { name: /checkout/i });
      // if (await checkoutBtn.isVisible()) {
      //   await checkoutBtn.click(); // Wywoła Stripe Checkout (begin_checkout)
      // }
    } else {
      console.log("Nie znaleziono przycisku dodania do koszyka na karcie produktu.");
    }
  } else {
    console.log("Nie znaleziono produktów na stronie głównej, bot nie mógł kontynuować.");
  }
});
