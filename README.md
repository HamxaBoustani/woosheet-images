# getProductImageBySKU

A simple Google Apps Script function to fetch the product image URL from a WooCommerce store by SKU.

## What it does

- Takes an SKU string as input.
- Returns the first product image URL from your WooCommerce site (`YOU.com`).
- Uses WooCommerce REST API with Basic Auth.
- Caches the result for faster repeated calls (6 hours cache).
- Handles errors and returns empty or friendly messages if no image found.

## How to use

Just call `getProductImageBySKU("your-product-sku")` and get back the image URL or an empty string if not found.

## Notes

- Make sure to update the consumer key, secret, and site URL to your own WooCommerce credentials.
- The cache saves the image URL per SKU to speed up future requests.
- If something goes wrong, you'll get `"Error fetching image"` or `"No image found"` instead of breaking your script.

---

Easy, fast, and keeps your API calls in check. Enjoy! 🚀
