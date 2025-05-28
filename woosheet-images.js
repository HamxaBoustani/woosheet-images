function getProductImageBySKU(sku) {
  // Return empty if SKU is null, not a string, or just whitespace
  if (!sku || typeof sku !== "string" || sku.trim() === "") {
    return "";
  }

  sku = sku.trim();
  var cache = CacheService.getScriptCache();
  var cachedImage = cache.get(sku);

  // If image URL is already cached, return it
  if (cachedImage !== null) {
    return cachedImage;
  }

  try {
    var consumerKey = "ck_xxx";
    var consumerSecret = "cs_xxx";
    var siteUrl = "https://you.com";

    var endpoint = siteUrl + "/wp-json/wc/v3/products?sku=" + encodeURIComponent(sku);
    var headers = {
      "Authorization": "Basic " + Utilities.base64Encode(consumerKey + ":" + consumerSecret)
    };

    var response = UrlFetchApp.fetch(endpoint, {
      method: "get",
      headers: headers,
      muteHttpExceptions: true // Prevents script from stopping on API errors
    });

    if (response.getResponseCode() !== 200) {
      return "";
    }

    var data = JSON.parse(response.getContentText());

    // If product and its images are found, return the first image URL and cache it
    if (Array.isArray(data) && data.length > 0 && data[0].images && data[0].images.length > 0) {
      var imageUrl = data[0].images[0].src;
      cache.put(sku, imageUrl, 1); // Cache for 6 hours (in seconds)
      return imageUrl;
    } else {
      return "No image found";
    }
  } catch (e) {
    console.error("Error:", e.message);
    return "Error fetching image";
  }
}