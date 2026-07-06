import re

catalog_path = "src/data/catalog.js"
with open(catalog_path, "r", encoding="utf-8") as f:
    content = f.read()

# Define the new products
new_products = """
  // NEW ADDITIONS
  {
    id: "mens-matte-sigona-cat-oversized-tee",
    category: "men",
    title: "Men's Matte Sigona Cat Oversized T-Shirt",
    price: 699,
    originalPrice: 1299,
    tag: "NEW",
    image: "/images/products/matte-sigona.png",
    images: ["/images/products/matte-sigona.png"],
    colors: ["Black", "White", "Red", "Cream", "Brown"],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: "Premium oversized t-shirt featuring a playful cat graphic and 'Matte Sigona' typography. 100% Cotton."
  },
  {
    id: "womens-matte-sigona-cat-oversized-tee",
    category: "women",
    title: "Women's Matte Sigona Cat Oversized T-Shirt",
    price: 699,
    originalPrice: 1299,
    tag: "NEW",
    image: "/images/products/matte-sigona.png",
    images: ["/images/products/matte-sigona.png"],
    colors: ["Black", "White", "Red", "Cream", "Brown"],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: "Premium oversized t-shirt featuring a playful cat graphic and 'Matte Sigona' typography. 100% Cotton."
  },
  {
    id: "mens-thug-life-typography-oversized-tee",
    category: "men",
    title: "Men's Thug Life Typography Oversized T-Shirt",
    price: 699,
    originalPrice: 1299,
    tag: "NEW",
    image: "/images/products/thug-life.png",
    images: ["/images/products/thug-life.png"],
    colors: ["Black", "White", "Red", "Cream", "Brown"],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: "Premium oversized t-shirt featuring Kannada typography with retro pixel glasses. 100% Cotton."
  },
  {
    id: "womens-thug-life-typography-oversized-tee",
    category: "women",
    title: "Women's Thug Life Typography Oversized T-Shirt",
    price: 699,
    originalPrice: 1299,
    tag: "NEW",
    image: "/images/products/thug-life.png",
    images: ["/images/products/thug-life.png"],
    colors: ["Black", "White", "Red", "Cream", "Brown"],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: "Premium oversized t-shirt featuring Kannada typography with retro pixel glasses. 100% Cotton."
  },
  {
    id: "mens-payana-journey-oversized-tee",
    category: "men",
    title: "Men's Payana Journey Oversized T-Shirt",
    price: 699,
    originalPrice: 1299,
    tag: "NEW",
    image: "/images/products/payana.png",
    images: ["/images/products/payana.png"],
    colors: ["Black", "White", "Red", "Cream", "Brown"],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: "Premium oversized t-shirt with 'Payana' graphic featuring a motorcycle silhouette. Perfect for riders. 100% Cotton."
  },
  {
    id: "womens-payana-journey-oversized-tee",
    category: "women",
    title: "Women's Payana Journey Oversized T-Shirt",
    price: 699,
    originalPrice: 1299,
    tag: "NEW",
    image: "/images/products/payana.png",
    images: ["/images/products/payana.png"],
    colors: ["Black", "White", "Red", "Cream", "Brown"],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: "Premium oversized t-shirt with 'Payana' graphic featuring a motorcycle silhouette. Perfect for riders. 100% Cotton."
  },
  {
    id: "mens-deshada-bennelubu-farmer-oversized-tee",
    category: "men",
    title: "Men's Deshada Bennelubu Farmer Oversized T-Shirt",
    price: 699,
    originalPrice: 1299,
    tag: "NEW",
    image: "/images/products/deshada-bennelubu.png",
    images: ["/images/products/deshada-bennelubu.png"],
    colors: ["Black", "White", "Red", "Cream", "Brown"],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: "Premium oversized t-shirt paying tribute to farmers with 'Deshada Bennelubu' artwork. 100% Cotton."
  },
  {
    id: "womens-deshada-bennelubu-farmer-oversized-tee",
    category: "women",
    title: "Women's Deshada Bennelubu Farmer Oversized T-Shirt",
    price: 699,
    originalPrice: 1299,
    tag: "NEW",
    image: "/images/products/deshada-bennelubu.png",
    images: ["/images/products/deshada-bennelubu.png"],
    colors: ["Black", "White", "Red", "Cream", "Brown"],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: "Premium oversized t-shirt paying tribute to farmers with 'Deshada Bennelubu' artwork. 100% Cotton."
  },
  {
    id: "mens-halli-life-village-oversized-tee",
    category: "men",
    title: "Men's Halli Life Village Oversized T-Shirt",
    price: 699,
    originalPrice: 1299,
    tag: "NEW",
    image: "/images/products/halli-life.png",
    images: ["/images/products/halli-life.png"],
    colors: ["Black", "White", "Red", "Cream", "Brown"],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: "Premium oversized t-shirt showcasing a beautiful village sunset and bullock cart graphic. 100% Cotton."
  },
  {
    id: "womens-halli-life-village-oversized-tee",
    category: "women",
    title: "Women's Halli Life Village Oversized T-Shirt",
    price: 699,
    originalPrice: 1299,
    tag: "NEW",
    image: "/images/products/halli-life.png",
    images: ["/images/products/halli-life.png"],
    colors: ["Black", "White", "Red", "Cream", "Brown"],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: "Premium oversized t-shirt showcasing a beautiful village sunset and bullock cart graphic. 100% Cotton."
  },
"""

# Find the end of the initialProducts array
# It ends with '];' after all objects.
match = re.search(r'\];[\s\n]*export const', content)
if match:
    insert_pos = match.start()
    # If the last item before ] doesn't have a comma, we might need one, but usually it does or it's fine in JS.
    # We will just insert it safely before the closing bracket.
    # To be safe, we'll prepend a comma if there isn't one
    new_content = content[:insert_pos] + ",\n" + new_products + content[insert_pos:]
    with open(catalog_path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Products added successfully!")
else:
    print("Could not find the end of the initialProducts array.")
