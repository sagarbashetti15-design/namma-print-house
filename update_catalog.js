const fs = require('fs');
let content = fs.readFileSync('src/data/catalog.js', 'utf-8');

const pets = ['meow-meow-matching-t-shirts', 'sunset-cat-matching-t-shirts', 'cool-cat-matching-t-shirts', 'plans-with-my-dog-matching-t-shirts', 'bruh-dog-matching-t-shirts', 'my-world-dog-matching-t-shirts', 'colorful-beagle-matching-t-shirts', 'dog-paw-fist-bump-matching-t-shirts', 'golden-retriever-matching-t-shirts'];
const cultural = ['krishna-radha-white-matching-t-shirts', 'trishul-om-black-matching-t-shirts', 'royal-tradition-maroon-matching-t-shirts', 'rustic-romance-beige-matching-t-shirts', 'krishna-radha-black-matching-t-shirts', 'shiva-parvati-off-white-matching-t-shirts', 'mahadev-mahakali-brown-matching-t-shirts', 'culture-soul-white-matching-t-shirts', 'balance-energy-navy-matching-t-shirts', 'rooted-traditions-beige-matching-t-shirts', 'm11', 'm7', 'w17'];
const movie = ['tom-jerry-oversized-t-shirt'];

let regexPets = new RegExp(\id: '(\)',[\\\\s\\\\S]*?category: '(.*?)'\, 'g');
content = content.replace(regexPets, (match, p1) => match.replace(/category: '.*?'/, \category: 'pets'\));

let regexCultural = new RegExp(\id: '(\)',[\\\\s\\\\S]*?category: '(.*?)'\, 'g');
content = content.replace(regexCultural, (match, p1) => match.replace(/category: '.*?'/, \category: 'cultural'\));

let regexMovie = new RegExp(\id: '(\)',[\\\\s\\\\S]*?category: '(.*?)'\, 'g');
content = content.replace(regexMovie, (match, p1) => match.replace(/category: '.*?'/, \category: 'movie'\));

// Append anime product
const animeProduct = \,
  {
    id: 'anime-naruto-oversized-t-shirt',
    category: 'anime',
    title: \\\"Anime Naruto Oversized T-Shirt\\\",
    price: 699,
    originalPrice: 1299,
    tag: \\\"NEW\\\",
    image: \\\"/images/men-new-5.jpg\\\",
    images: [\\\"/images/men-new-5.jpg\\\"],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: \\\"Premium black oversized t-shirt featuring anime character graphics. 100% Cotton.\\\"
  }
];\;

content = content.replace(/\\n\\];\\s*$/, animeProduct);
fs.writeFileSync('src/data/catalog.js', content);
console.log('Updated catalog');
