# Setup Guide: Meta Ads (Facebook Pixel) & Google Analytics (GA4)

This project has been prepared to serve as a high-quality data source (mock-up store) for the **AI E-com Analyst** project.

We have integrated tracking for both **Google Analytics 4 (GA4)** and **Meta Ads (Facebook Pixel)** using Next.js modern best practices (`@next/third-parties/google` and `next/script`).

## 1. Environment Variables Configuration

To enable tracking, you need to provide your unique tracking IDs via environment variables.

Create or update the `.env.local` file in the root directory:

```env
# Google Analytics 4 Measurement ID (usually starts with "G-")
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Meta (Facebook) Pixel ID (numeric string)
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
```

If these variables are present, the tracking scripts will be automatically injected into the `<head>` of your application and will fire page views across the entire store.

## 2. Google Analytics (GA4) Setup

1. Go to [Google Analytics](https://analytics.google.com/) and create a new Web Data Stream.
2. Copy your **Measurement ID** (e.g., `G-12345ABCDE`).
3. Set this as `NEXT_PUBLIC_GA_ID` in your `.env.local`.
4. Our integration uses `@next/third-parties/google`. It automatically tracks `page_view` events whenever a user navigates between routes.

### Sending Custom Events to GA4
If you want to track custom ecommerce events (like `add_to_cart` or `purchase`), you can use the `sendGAEvent` function from the `@next/third-parties/google` library:

```tsx
import { sendGAEvent } from '@next/third-parties/google'

export function AddToCartButton({ productId }) {
  return (
    <button
      onClick={() => sendGAEvent({ event: 'add_to_cart', value: productId })}
    >
      Add to Cart
    </button>
  )
}
```

## 3. Meta Ads (Facebook Pixel) Setup

1. Go to [Meta Events Manager](https://business.facebook.com/events_manager2/).
2. Create a new Data Source (Web) and get your **Pixel ID**.
3. Set this as `NEXT_PUBLIC_META_PIXEL_ID` in your `.env.local`.
4. Our custom `<MetaPixel />` component in `src/app/ui/MetaPixel.tsx` handles the initialization and tracks the standard `PageView` event.

### Sending Custom Events to Meta Pixel
To send custom events, you can call the global `fbq` function directly in your client components:

```tsx
export function CheckoutButton() {
  const handleCheckout = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'InitiateCheckout');
    }
  }

  return <button onClick={handleCheckout}>Checkout</button>
}
```

## 4. Verification

1. Install the **Google Analytics Debugger** and **Meta Pixel Helper** Chrome extensions.
2. Run your app locally: `pnpm run dev`.
3. Browse the store and verify in the extensions that the PageView events are firing correctly for both platforms.
4. The collected data will start appearing in your Analytics and Meta dashboards, ready to be ingested by your AI E-com Analyst project.
