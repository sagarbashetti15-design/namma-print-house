const initialProducts = [
  {
    "id": "rzp_test_1",
    "category": "men",
    "title": "Razorpay Test Product",
    "price": 20,
    "originalPrice": 20,
    "tag": "TEST",
    "image": "/images/dslr_full_men_hero_1782625090319.png?v=2",
    "images": [
      "/images/dslr_full_men_hero_1782625090319.png?v=2"
    ],
    "sizes": [
      "XS"
    ],
    "description": "Test product for verifying Razorpay checkout."
  },
  {
    "id": "m1",
    "category": "men",
    "title": "Premium Graphic Oversized Tee",
    "price": 20,
    "originalPrice": 1299,
    "tag": "BEST SELLER",
    "image": "/images/dslr_men_hero_bg_1782596728590.png?v=2",
    "images": [
      "/images/dslr_men_hero_bg_1782596728590.png?v=2",
      "/images/men_graphic_new.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium black oversized t-shirt with gold RCB logo and 'Be bold' back print. 100% Cotton.",
    "outOfStock": true
  },
  {
    "id": "mens-rcb-white-oversized-t-shirt",
    "category": "men",
    "title": "Men's RCB White Oversized T-Shirt",
    "price": 20,
    "originalPrice": 1299,
    "tag": "TRENDING",
    "image": "/images/dslr_perfect_men_hero_1782625798307.png?v=2",
    "images": [
      "/images/dslr_perfect_men_hero_1782625798307.png?v=2",
      "/images/men-rcb-white-front.png?v=2",
      "/images/men-rcb-white-back.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium white oversized t-shirt with gold RCB logo and 'Be bold' back print. 100% Cotton.",
    "outOfStockSizes": [
      "S",
      "XL"
    ]
  },
  {
    "id": "mens-ducati-panigale-oversized-t-shirt",
    "category": "bike",
    "title": "Men's Ducati Panigale Oversized T-Shirt",
    "price": 20,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/cat_men_1782994663572.png?v=2",
    "images": [
      "/images/cat_men_1782994663572.png?v=2",
      "/images/men-model-ducati-back.jpg?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium white oversized t-shirt featuring a clean Ducati logo on the front and a high-quality Ducati Panigale motorcycle poster graphic printed on the back. 100% Cotton."
  },
  {
    "id": "mens-royal-enfield-oversized-t-shirt",
    "category": "bike",
    "title": "Men's Royal Enfield Oversized T-Shirt",
    "price": 20,
    "originalPrice": 1299,
    "tag": "HOT",
    "image": "/images/cat_men_graphic_1782994898287.png?v=2",
    "images": [
      "/images/cat_men_graphic_1782994898287.png?v=2",
      "/images/men-bike-enfield.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium white oversized t-shirt featuring a vintage Royal Enfield motorcycle graphic on the front. 100% Cotton."
  },
  {
    "id": "mens-bmw-s1000rr-oversized-t-shirt",
    "category": "bike",
    "title": "Men's BMW S1000RR Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "TRENDING",
    "image": "/images/dslr_full_men_hero_1782625090319.png?v=2",
    "images": [
      "/images/dslr_full_men_hero_1782625090319.png?v=2",
      "/images/men-bike-bmw.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium white oversized t-shirt featuring a BMW S1000RR motorcycle graphic on the front. 100% Cotton."
  },
  {
    "id": "m6",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "men",
    "title": "Men's Abstract Face Black Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/cat_men_1782994663572.png?v=2",
    "images": [
      "/images/cat_men_1782994663572.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium black oversized t-shirt featuring a vibrant abstract face graphic. 100% Cotton."
  },
  {
    "id": "m7",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "cultural",
    "title": "Men's Peaceful Buddha Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "TRENDING",
    "image": "/images/dslr_perfect_men_hero_1782625798307.png?v=2",
    "images": [
      "/images/dslr_perfect_men_hero_1782625798307.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium white oversized t-shirt with a serene Buddha watercolor style graphic. 100% Cotton."
  },
  {
    "id": "m8",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "men",
    "title": "Men's Chill Vibes Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "POPULAR",
    "image": "/images/dslr_full_men_hero_1782625090319.png?v=2",
    "images": [
      "/images/dslr_full_men_hero_1782625090319.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium white oversized t-shirt featuring a 'CHILL' typography and character graphic. 100% Cotton."
  },
  {
    "id": "anime-naruto-oversized-t-shirt",
    "category": "anime",
    "title": "Anime Naruto Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/dslr_unique_men_hero_1782622970266.png?v=2",
    "images": [
      "/images/dslr_unique_men_hero_1782622970266.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium black oversized t-shirt featuring anime character graphics. 100% Cotton."
  },
  {
    "id": "m11",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "cultural",
    "title": "Men's Divine Gods Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "BEST SELLER",
    "image": "/images/dslr_wide_men_hero_1782624596610.png?v=2",
    "images": [
      "/images/dslr_wide_men_hero_1782624596610.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium white oversized t-shirt featuring a beautiful collage of Hindu deities graphic print. 100% Cotton."
  },
  {
    "id": "m12",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "men",
    "title": "Men's One Day At A Time Off-White Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/dslr_right_men_hero_1782624165523.png?v=2",
    "images": [
      "/images/dslr_right_men_hero_1782624165523.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium off-white oversized t-shirt featuring a minimalist 'One Day At A Time' landscape graphic. 100% Cotton."
  },
  {
    "id": "m13",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "men",
    "title": "Men's Chill Swing White Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "TRENDING",
    "image": "/images/dslr_unique_men_hero_1782622970266.png?v=2",
    "images": [
      "/images/dslr_unique_men_hero_1782622970266.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium white oversized t-shirt with a cool blue character on a swing and red 'CHILL' typography. 100% Cotton."
  },
  {
    "id": "womens-positive-oversized-t-shirt",
    "category": "women",
    "title": "Women's Positive Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "BEST SELLER",
    "image": "/images/dslr_full_women_happy_hero_1782625021735.png?v=2",
    "images": [
      "/images/dslr_full_women_happy_hero_1782625021735.png?v=2",
      "/images/oversized-tee-1.jpg?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium black oversized t-shirt with a beautiful positive floral graphic print. 100% Cotton."
  },
  {
    "id": "love-yourself-oversized-t-shirt",
    "category": "women",
    "title": "Love Yourself Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "TRENDING",
    "image": "/images/dslr_full_women_hero_1782625123498.png?v=2",
    "images": [
      "/images/dslr_full_women_hero_1782625123498.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium black oversized t-shirt with a retro 'Love Yourself' graphic print. 100% Cotton."
  },
  {
    "id": "you-grow-girl-oversized-t-shirt",
    "category": "women",
    "title": "You Grow Girl Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW ARRIVAL",
    "image": "/images/dslr_girl_hero_bg_1782596897448.png?v=2",
    "images": [
      "/images/dslr_girl_hero_bg_1782596897448.png?v=2",
      "/images/oversized-tee-3.jpg?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium black oversized t-shirt with a 'You Grow Girl' floral graphic print. 100% Cotton."
  },
  {
    "id": "sunflower-oversized-t-shirt",
    "category": "women",
    "title": "Sunflower Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "HOT",
    "image": "/images/dslr_kendall_hero_bg_1782596999821.png?v=2",
    "images": [
      "/images/dslr_kendall_hero_bg_1782596999821.png?v=2",
      "/images/oversized-tee-4.jpg?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium black oversized t-shirt with a vibrant sunflower graphic print. 100% Cotton."
  },
  {
    "id": "love-parrot-oversized-t-shirt",
    "category": "women",
    "title": "Love Parrot Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/dslr_new_women_hero_1782622535422.png?v=2",
    "images": [
      "/images/dslr_new_women_hero_1782622535422.png?v=2",
      "/images/oversized-tee-5.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium white oversized t-shirt with a colorful parrot and 'LOVE' graphic print. 100% Cotton."
  },
  {
    "id": "cute-panda-heart-oversized-t-shirt",
    "category": "women",
    "title": "Cute Panda Heart Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "CUTE",
    "image": "/images/dslr_perfect_women_happy_hero_1782625731390.png?v=2",
    "images": [
      "/images/dslr_perfect_women_happy_hero_1782625731390.png?v=2",
      "/images/oversized-tee-6.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium white oversized t-shirt with an adorable panda holding a heart balloon. 100% Cotton."
  },
  {
    "id": "just-a-girl-bow-oversized-t-shirt",
    "category": "women",
    "title": "Just a Girl Bow Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "TRENDING",
    "image": "/images/dslr_right_women_happy_hero_1782624129514.png?v=2",
    "images": [
      "/images/dslr_right_women_happy_hero_1782624129514.png?v=2",
      "/images/oversized-tee-7.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium white oversized t-shirt featuring a pink bow and 'I'm just a girl' text. 100% Cotton."
  },
  {
    "id": "tom-jerry-oversized-t-shirt",
    "category": "movie",
    "title": "Tom & Jerry Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "CLASSIC",
    "image": "/images/dslr_full_men_hero_1782625090319.png?v=2",
    "images": [
      "/images/dslr_full_men_hero_1782625090319.png?v=2",
      "/images/oversized-tee-8.jpg?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium black oversized t-shirt with classic Tom & Jerry cartoon graphic. 100% Cotton."
  },
  {
    "id": "retro-flower-oversized-t-shirt",
    "category": "women",
    "title": "Retro Flower Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "VINTAGE",
    "image": "/images/dslr_unique_girl_oversized_1782598993712.png?v=2",
    "images": [
      "/images/dslr_unique_girl_oversized_1782598993712.png?v=2",
      "/images/oversized-tee-9.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium white oversized t-shirt with a retro 70s 'FLOWER' graphic print. 100% Cotton."
  },
  {
    "id": "w11",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "women",
    "title": "Women's Roll Model White Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "TRENDING",
    "image": "/images/dslr_women_happy_hero_bg_1782597287881.png?v=2",
    "images": [
      "/images/dslr_women_happy_hero_bg_1782597287881.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium white oversized t-shirt with a fun 'Roll Model' graphic print. 100% Cotton."
  },
  {
    "id": "w12",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "women",
    "title": "Women's One Day Off-White Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "POPULAR",
    "image": "/images/cat_women_1782994683790.png?v=2",
    "images": [
      "/images/cat_women_1782994683790.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium off-white oversized t-shirt featuring a minimalist 'One Day At A Time' landscape graphic. 100% Cotton."
  },
  {
    "id": "w13",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "women",
    "title": "Women's Ravaayat Punjab White Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/dslr_full_women_happy_hero_1782625021735.png?v=2",
    "images": [
      "/images/dslr_full_women_happy_hero_1782625021735.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium white oversized t-shirt featuring traditional 'Ravaayat Punjab Di Phulkari' art. 100% Cotton."
  },
  {
    "id": "w14",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "women",
    "title": "Women's Chill Black Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "HOT",
    "image": "/images/dslr_full_women_hero_1782625123498.png?v=2",
    "images": [
      "/images/dslr_full_women_hero_1782625123498.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium black oversized t-shirt with a cool blue character on a swing and red 'CHILL' typography. 100% Cotton."
  },
  {
    "id": "w15",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "women",
    "title": "Women's Mandala Pattern White Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "BEST SELLER",
    "image": "/images/dslr_girl_hero_bg_1782596897448.png?v=2",
    "images": [
      "/images/dslr_girl_hero_bg_1782596897448.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium white oversized t-shirt featuring an intricate mandala side pattern. 100% Cotton."
  },
  {
    "id": "womens-roll-model-rust-oversized-t-shirt",
    "category": "women",
    "title": "Women's Roll Model Rust Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "CLASSIC",
    "image": "/images/dslr_kendall_hero_bg_1782596999821.png?v=2",
    "images": [
      "/images/dslr_kendall_hero_bg_1782596999821.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium rust-colored oversized t-shirt featuring a 'Roll Model' graphic print. 100% Cotton."
  },
  {
    "id": "w17",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "cultural",
    "title": "Women's Kathakali Black Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW ARRIVAL",
    "image": "/images/dslr_men_hero_bg_1782596728590.png?v=2",
    "images": [
      "/images/dslr_men_hero_bg_1782596728590.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium black oversized t-shirt featuring a vibrant Kathakali face mask graphic. 100% Cotton."
  },
  {
    "id": "custom-tee",
    "category": "custom",
    "title": "Design Your Own Oversized T-Shirt",
    "price": 799,
    "originalPrice": 1499,
    "tag": "CUSTOM",
    "image": "/images/dslr_perfect_men_hero_1782625798307.png?v=2",
    "images": [
      "/images/dslr_perfect_men_hero_1782625798307.png?v=2",
      "/images/model_men_black_front.jpg?v=2",
      "/images/model_men_red_front.jpg?v=2",
      "/images/model_men_cream_front.jpg?v=2",
      "/images/model_men_brown_front.jpg?v=2"
    ],
    "colors": [
      "White",
      "Black",
      "Red",
      "Cream",
      "Brown"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "isVisualCustomizer": true,
    "description": "Upload your own design to be printed on our premium oversized t-shirts."
  },
  {
    "id": "cp1",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Brown"
    ],
    "category": "couples",
    "title": "Meow Meow Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "BEST SELLER",
    "image": "/images/dslr_couples_hero_bg_1782596616376.png?v=2",
    "images": [
      "/images/dslr_couples_hero_bg_1782596616376.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching black oversized t-shirts for couples featuring a cute cat graphic."
  },
  {
    "id": "cp2",
    "colors": [
      "Black",
      "White",
      "Cream",
      "Brown"
    ],
    "category": "couples",
    "title": "Sunset Cat Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "TRENDING",
    "image": "/images/dslr_full_couples_hero_1782625062165.png?v=2",
    "images": [
      "/images/dslr_full_couples_hero_1782625062165.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching black oversized t-shirts for couples featuring a cool sunset cat graphic."
  },
  {
    "id": "cp3",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Brown"
    ],
    "category": "couples",
    "title": "Cool Cat Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "NEW",
    "image": "/images/dslr_perfect_couples_hero_1782625770118.png?v=2",
    "images": [
      "/images/dslr_perfect_couples_hero_1782625770118.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching white oversized t-shirts for couples featuring a cool cat in sunglasses."
  },
  {
    "id": "cp4",
    "colors": [
      "Black",
      "White",
      "Cream",
      "Brown"
    ],
    "category": "couples",
    "title": "Plans With My Dog Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "CUTE",
    "image": "/images/dslr_hero_bg_1782596486969.png?v=2",
    "images": [
      "/images/dslr_hero_bg_1782596486969.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching black oversized t-shirts for couples featuring a dog graphic."
  },
  {
    "id": "cp5",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Brown"
    ],
    "category": "couples",
    "title": "Bruh Dog Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "HOT",
    "image": "/images/cat_couples_1782994706378.png?v=2",
    "images": [
      "/images/cat_couples_1782994706378.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching white oversized t-shirts for couples featuring a funny 'Bruh' dog graphic."
  },
  {
    "id": "cp6",
    "colors": [
      "Black",
      "White",
      "Cream",
      "Brown"
    ],
    "category": "couples",
    "title": "My World Dog Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "COUPLES",
    "image": "/images/dslr_couples_hero_bg_1782596616376.png?v=2",
    "images": [
      "/images/dslr_couples_hero_bg_1782596616376.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching black oversized t-shirts for couples featuring a 'My World' dog graphic."
  },
  {
    "id": "colorful-beagle-matching-t-shirts",
    "category": "pets",
    "title": "Colorful Beagle Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "NEW",
    "image": "/images/dslr_right_men_hero_1782624165523.png?v=2",
    "images": [
      "/images/dslr_right_men_hero_1782624165523.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching white oversized t-shirts for couples featuring a colorful artistic Beagle dog graphic."
  },
  {
    "id": "cp8",
    "colors": [
      "Black",
      "White",
      "Cream",
      "Brown"
    ],
    "category": "couples",
    "title": "Dog Paw Fist Bump Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "COUPLES",
    "image": "/images/dslr_full_couples_hero_1782625062165.png?v=2",
    "images": [
      "/images/dslr_full_couples_hero_1782625062165.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching black oversized t-shirts for couples featuring a cute human and dog paw fist bump design."
  },
  {
    "id": "golden-retriever-matching-t-shirts",
    "category": "pets",
    "title": "Golden Retriever Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "HOT",
    "image": "/images/dslr_unique_men_hero_1782622970266.png?v=2",
    "images": [
      "/images/dslr_unique_men_hero_1782622970266.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching black oversized t-shirts for couples featuring a cool Golden Retriever with sunglasses graphic."
  },
  {
    "id": "cp10",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "couples",
    "title": "Krishna Radha White Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "COUPLES",
    "image": "/images/dslr_perfect_couples_hero_1782625770118.png?v=2",
    "images": [
      "/images/dslr_perfect_couples_hero_1782625770118.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching white oversized t-shirts for couples featuring divine Krishna and Radha artwork."
  },
  {
    "id": "cp11",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "couples",
    "title": "Trishul Om Black Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "BEST SELLER",
    "image": "/images/dslr_hero_bg_1782596486969.png?v=2",
    "images": [
      "/images/dslr_hero_bg_1782596486969.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching black oversized t-shirts for couples featuring intricate golden Trishul and Om mandala designs."
  },
  {
    "id": "cp12",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "couples",
    "title": "Royal Tradition Maroon Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "COUPLES",
    "image": "/images/cat_couples_1782994706378.png?v=2",
    "images": [
      "/images/cat_couples_1782994706378.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching maroon oversized t-shirts for couples featuring beautiful traditional Indian couple attire graphics."
  },
  {
    "id": "cp13",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "couples",
    "title": "Rustic Romance Beige Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "NEW",
    "image": "/images/dslr_couples_hero_bg_1782596616376.png?v=2",
    "images": [
      "/images/dslr_couples_hero_bg_1782596616376.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching beige oversized t-shirts for couples featuring a traditional flute player and listener graphic."
  },
  {
    "id": "cp14",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "couples",
    "title": "Krishna Radha Black Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "TRENDING",
    "image": "/images/dslr_full_couples_hero_1782625062165.png?v=2",
    "images": [
      "/images/dslr_full_couples_hero_1782625062165.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching black oversized t-shirts for couples featuring minimalist Krishna and Radha line art."
  },
  {
    "id": "shiva-parvati-off-white-matching-t-shirts",
    "category": "cultural",
    "title": "Shiva Parvati Off-White Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "POPULAR",
    "image": "/images/dslr_wide_men_hero_1782624596610.png?v=2",
    "images": [
      "/images/dslr_wide_men_hero_1782624596610.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching off-white oversized t-shirts for couples featuring divine Shiva and Parvati line art graphics."
  },
  {
    "id": "cp16",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "couples",
    "title": "Mahadev Mahakali Brown Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "COUPLES",
    "image": "/images/dslr_perfect_couples_hero_1782625770118.png?v=2",
    "images": [
      "/images/dslr_perfect_couples_hero_1782625770118.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching brown oversized t-shirts for couples featuring Mahadev and Mahakali Hindi typography."
  },
  {
    "id": "cp17",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "couples",
    "title": "Culture Soul White Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "NEW",
    "image": "/images/dslr_hero_bg_1782596486969.png?v=2",
    "images": [
      "/images/dslr_hero_bg_1782596486969.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching white oversized t-shirts for couples featuring architectural temple 'Culture' and 'Soul' prints."
  },
  {
    "id": "cp18",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "couples",
    "title": "Balance Energy Navy Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "COUPLES",
    "image": "/images/cat_couples_1782994706378.png?v=2",
    "images": [
      "/images/cat_couples_1782994706378.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching navy oversized t-shirts for couples featuring minimalist lotus 'Balance' and 'Energy' designs."
  },
  {
    "id": "cp19",
    "colors": [
      "White",
      "Black",
      "Cream",
      "Red",
      "Brown"
    ],
    "category": "couples",
    "title": "Rooted Traditions Beige Matching T-Shirts",
    "price": 1299,
    "originalPrice": 2499,
    "tag": "HOT",
    "image": "/images/dslr_couples_hero_bg_1782596616376.png?v=2",
    "images": [
      "/images/dslr_couples_hero_bg_1782596616376.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium matching beige oversized t-shirts for couples featuring 'Rooted in Culture' and 'Grateful for Traditions' typography."
  },
  {
    "id": "hodi-maja-madi-graphic-mens-oversized-t-shirt",
    "category": "kannada",
    "title": "Hodi Maja Madi Graphic Men's Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/cat_men_1782994663572.png?v=2",
    "images": [
      "/images/cat_men_1782994663572.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium black men's oversized t-shirt featuring a stylized Kannada graphic print on the front. 100% Cotton."
  },
  {
    "id": "maa-graphic-mens-oversized-t-shirt",
    "category": "kannada",
    "title": "Maa Graphic Men's Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "TRENDING",
    "image": "/images/cat_men_graphic_1782994898287.png?v=2",
    "images": [
      "/images/cat_men_graphic_1782994898287.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium black men's oversized t-shirt featuring a beautiful 'Maa' graphic print on the front. 100% Cotton."
  },
  {
    "id": "appa-cycle-graphic-mens-oversized-t-shirt",
    "category": "kannada",
    "title": "Appa Cycle Graphic Men's Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "POPULAR",
    "image": "/images/dslr_full_men_hero_1782625090319.png?v=2",
    "images": [
      "/images/dslr_full_men_hero_1782625090319.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium black men's oversized t-shirt featuring an emotional 'Appa' graphic print on the front. 100% Cotton."
  },
  {
    "id": "deshada-bennelubu-graphic-mens-oversized-t-shirt",
    "category": "kannada",
    "title": "Deshada Bennelubu Graphic Men's Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "CLASSIC",
    "image": "/images/dslr_men_hero_bg_1782596728590.png?v=2",
    "images": [
      "/images/dslr_men_hero_bg_1782596728590.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium white men's oversized t-shirt featuring a traditional farmer graphic print on the front. 100% Cotton."
  },
  {
    "id": "payana-graphic-mens-oversized-t-shirt",
    "category": "kannada",
    "title": "Payana Graphic Men's Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/dslr_perfect_men_hero_1782625798307.png?v=2",
    "images": [
      "/images/dslr_perfect_men_hero_1782625798307.png?v=2"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium black men's oversized t-shirt featuring a journey 'Payana' graphic print on the front. 100% Cotton."
  },
  {
    "id": "mens-matte-sigona-cat-oversized-tee",
    "category": "men",
    "title": "Men's Matte Sigona Cat Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/dslr_full_men_hero_1782625090319.png?v=2",
    "images": [
      "/images/dslr_full_men_hero_1782625090319.png?v=2"
    ],
    "colors": [
      "Black",
      "White",
      "Red",
      "Cream",
      "Brown"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium oversized t-shirt featuring a playful cat graphic and 'Matte Sigona' typography. 100% Cotton."
  },
  {
    "id": "womens-matte-sigona-cat-oversized-tee",
    "category": "women",
    "title": "Women's Matte Sigona Cat Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/dslr_new_women_hero_1782622535422.png?v=2",
    "images": [
      "/images/dslr_new_women_hero_1782622535422.png?v=2"
    ],
    "colors": [
      "Black",
      "White",
      "Red",
      "Cream",
      "Brown"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium oversized t-shirt featuring a playful cat graphic and 'Matte Sigona' typography. 100% Cotton."
  },
  {
    "id": "mens-thug-life-typography-oversized-tee",
    "category": "men",
    "title": "Men's Thug Life Typography Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/dslr_men_hero_bg_1782596728590.png?v=2",
    "images": [
      "/images/dslr_men_hero_bg_1782596728590.png?v=2"
    ],
    "colors": [
      "Black",
      "White",
      "Red",
      "Cream",
      "Brown"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium oversized t-shirt featuring Kannada typography with retro pixel glasses. 100% Cotton."
  },
  {
    "id": "womens-thug-life-typography-oversized-tee",
    "category": "women",
    "title": "Women's Thug Life Typography Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/dslr_perfect_women_happy_hero_1782625731390.png?v=2",
    "images": [
      "/images/dslr_perfect_women_happy_hero_1782625731390.png?v=2"
    ],
    "colors": [
      "Black",
      "White",
      "Red",
      "Cream",
      "Brown"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium oversized t-shirt featuring Kannada typography with retro pixel glasses. 100% Cotton."
  },
  {
    "id": "mens-payana-journey-oversized-tee",
    "category": "men",
    "title": "Men's Payana Journey Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/dslr_perfect_men_hero_1782625798307.png?v=2",
    "images": [
      "/images/dslr_perfect_men_hero_1782625798307.png?v=2"
    ],
    "colors": [
      "Black",
      "White",
      "Red",
      "Cream",
      "Brown"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium oversized t-shirt with 'Payana' graphic featuring a motorcycle silhouette. Perfect for riders. 100% Cotton."
  },
  {
    "id": "womens-payana-journey-oversized-tee",
    "category": "women",
    "title": "Women's Payana Journey Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/dslr_right_women_happy_hero_1782624129514.png?v=2",
    "images": [
      "/images/dslr_right_women_happy_hero_1782624129514.png?v=2"
    ],
    "colors": [
      "Black",
      "White",
      "Red",
      "Cream",
      "Brown"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium oversized t-shirt with 'Payana' graphic featuring a motorcycle silhouette. Perfect for riders. 100% Cotton."
  },
  {
    "id": "mens-deshada-bennelubu-farmer-oversized-tee",
    "category": "men",
    "title": "Men's Deshada Bennelubu Farmer Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/dslr_right_men_hero_1782624165523.png?v=2",
    "images": [
      "/images/dslr_right_men_hero_1782624165523.png?v=2"
    ],
    "colors": [
      "Black",
      "White",
      "Red",
      "Cream",
      "Brown"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium oversized t-shirt paying tribute to farmers with 'Deshada Bennelubu' artwork. 100% Cotton."
  },
  {
    "id": "womens-deshada-bennelubu-farmer-oversized-tee",
    "category": "women",
    "title": "Women's Deshada Bennelubu Farmer Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/dslr_unique_girl_oversized_1782598993712.png?v=2",
    "images": [
      "/images/dslr_unique_girl_oversized_1782598993712.png?v=2"
    ],
    "colors": [
      "Black",
      "White",
      "Red",
      "Cream",
      "Brown"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium oversized t-shirt paying tribute to farmers with 'Deshada Bennelubu' artwork. 100% Cotton."
  },
  {
    "id": "mens-halli-life-village-oversized-tee",
    "category": "men",
    "title": "Men's Halli Life Village Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/dslr_unique_men_hero_1782622970266.png?v=2",
    "images": [
      "/images/dslr_unique_men_hero_1782622970266.png?v=2"
    ],
    "colors": [
      "Black",
      "White",
      "Red",
      "Cream",
      "Brown"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium oversized t-shirt showcasing a beautiful village sunset and bullock cart graphic. 100% Cotton."
  },
  {
    "id": "womens-halli-life-village-oversized-tee",
    "category": "women",
    "title": "Women's Halli Life Village Oversized T-Shirt",
    "price": 699,
    "originalPrice": 1299,
    "tag": "NEW",
    "image": "/images/dslr_women_happy_hero_bg_1782597287881.png?v=2",
    "images": [
      "/images/dslr_women_happy_hero_bg_1782597287881.png?v=2"
    ],
    "colors": [
      "Black",
      "White",
      "Red",
      "Cream",
      "Brown"
    ],
    "sizes": [
      "XS",
      "S",
      "M",
      "L",
      "XL",
      "XXL"
    ],
    "description": "Premium oversized t-shirt showcasing a beautiful village sunset and bullock cart graphic. 100% Cotton."
  }
];

export const products = initialProducts;
export const getProducts = () => {
  return initialProducts;
};
