import { random, sample } from 'lodash';
import { paramCase } from 'change-case';
// utils
import mock from './mock';
import mockData from '../utils/mock-data';

// ----------------------------------------------------------------------

const PRODUCT_NAME = [
  'Shyam Vandana Paying Guest',
  'Living Siving',
  'R S Paying Guest',
  'Metro Inn Pg',
  'Sai Ram PG',
  'Phogat Pg',
  'Gurukulam Pg',
  'Aggarwal Pg House',
  'Maruti Pg',
  'Rajhans Pg',
  'Awesome House',
  'Pranjal Pg',
  'Unique Pg',
  'Gagan Pg',
  'Dev Bhoomi Pg',
  'Star Pg',
  'Vinayaka Homes',
  'Sri Sai Pg',
  'SRI R.D PG',
  'Nike PG',
  'Adidas PG',
  'Ranchhoddas PG ',
  'Vangdu PG',
  'Farhan Raju'
];

const PG_ADD = [
  'Opp.Hotel Salute, Someshwar Mahadev Cross Roads, Ashram Road, Navrangpura, Ahmedabad',
  'Vishesh Residency, Malabar County Rd, Jagatpur Village, Gota, Ahmedabad',
  'Opp. Vandemataram City Cross Road, Beside Swaminarayan Temple, Gota, Ahmedabad',
  'Prahlad Nagar, Shivranjani Cross Road, Shyamal crossroad, Prahlad Nagar Road, Ahmedabad',
  'Opp. Himalya mall, Sunrise park, Gurukul, Ahmedabad, Gujarat',
  'Hotel Orange Inn 1-5, Makarba, Ahmedabad',
  'Vijay Char Rasta, Naranpura, Ahmedabad',
  'NY Square Sahaj Century Rd, Gota, Ranip, Gujarat',
  'Omkara Hostel Omkara Hostel, behind Adani Pratham, Pratham Hostel Rd, Ahmedabad',
  'Sushrusha Hospital Ganga Niwas, Mithakhali, Navrangpura, Ahmedabad',
  'Hotel Classic inn, Mithakhali Six Roads, Navrangpura, Maharashtra Society, Ellisbridge, Ahmedabad',
  'Purnima Society, Nr Ishwar Bhuvan, commerce six roads, Navrangpura, Ahmedabad',
  'Gordhan Park Society, Sorabji Compound, Sardar Colony, Ahmedabad',
  'Near Nehrunagar Circle, Opposite Ocean Park, 4th Floor, Korner Complex, Satellite, Ahmedabad',
  'New Rajdeep Society, Gurukul, Memnagar, Ahmedabad',
  '110 Shivaranjini Society, Shivranjani Cross Road, Satellite, Ahmedabad',
  'Memnagar, Ahmedabad',
  'Vastrapur, Ahmedabad',
  'Prahlad Nagar, Ahmedabad',
  'Ambawadi, Ahmedabad',
  'Gurukul, Ahmedabad',
  'Bodakdev, Ahmedabad',
  'Vastrapur, Ahmedabad',
  'Sanand - Sarkhej Rd, Ahmedabad'
];

const PG_DESCRIPTION =
  ' A professionally managed PG home. A safe neighborhood, this PG offers various modern amenities for your comfort, such as AC, Power Backup, Wi-Fi etc. This PG has single, double, triple occupancy types. This PG is nearby major commercial and educational hubs. Please contact the seller to book this fast selling high in demand PG stay.';

const PG_OWNER = [
  'Bhaumik Parmar',
  'Bharat Singh Rao',
  'Anu Labana',
  'asshu',
  'Sajjan Purohit',
  'Yash bansal',
  ' Bhargav',
  ' Dhyey Pradhan',
  'vikram',
  ' Divy shah ',
  'krishan kumar',
  'parth',
  'Rajesh ',
  'sanjay patel',
  'Karan',
  'sanjay gondaliya ',
  'Suresh Solanki',
  'Jigar Karani ',
  'Dhaval Modi ',
  'Mukesh Parmar ',
  ' Sunil Patel',
  ' Krishan ',
  'Bhaumik B. Shah',
  ' Gaurav yadav'
];

const PRODUCT_TAGS = ['Dangal', 'The Sting', '2001: A Space Odyssey', "Singin' in the Rain"];

// const PRODUCT_DESCRIPTION = `
// <p><strong><small> SPECIFICATION</small></strong></p>
// <p>Leather panels. Laces. Rounded toe. Rubber sole.
// <br /><br />
// <p><strong><small> MATERIAL AND WASHING INSTRUCTIONS</small></strong></p>
// <p>Shoeupper: 54% bovine leather,46% polyurethane. Lining: 65% polyester,35% cotton. Insole: 100% polyurethane. Sole: 100% thermoplastic. Fixing sole: 100% glued.</p>
// `;
const PRODUCT_SIZE = ['6', '7', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'];

// ----------------------------------------------------------------------

const products = [...Array(24)].map((_, index) => ({
  id: mockData.id(index),
  cover: mockData.image.product(index),
  images: [...Array(8)].map((_, index) => mockData.image.product(index)),
  name: PRODUCT_NAME[index],
  owner: PG_OWNER[index],
  add: PG_ADD[index],
  code: `38BEE27${index}`,
  sku: `WW75K521${index}YW/SV`,
  tags: PRODUCT_TAGS,
  price: mockData.number.price(index),
  // priceSale: index % 3 ? null : mockData.number.price(index),
  totalRating: mockData.number.rating(index),
  totalReview: random(9999),
  ratings: [...Array(5)].map((_, index) => ({
    name: `${index + 1} Star`,
    starCount: random(9999),
    reviewCount: random(9999)
  })),
  reviews: [...Array(8)].map((_, index) => ({
    id: mockData.id(index),
    name: mockData.name.fullName(index),
    avatarUrl: `/static/mock-images/avatars/avatar_${index + 1}.jpg`,
    comment: mockData.text.sentence(index),
    rating: mockData.number.rating(index),
    isPurchased: mockData.boolean(index),
    helpful: random(9999),
    postedAt: mockData.time(index)
  })),
  // colors:
  //   (index === 1 && PRODUCT_COLOR.slice(0, 2)) ||
  //   (index === 2 && PRODUCT_COLOR.slice(1, 3)) ||
  //   (index === 3 && PRODUCT_COLOR.slice(2, 4)) ||
  //   (index === 4 && PRODUCT_COLOR.slice(3, 6)) ||
  //   (index === 23 && PRODUCT_COLOR.slice(4, 6)) ||
  //   (index === 24 && PRODUCT_COLOR.slice(5, 6)) ||
  //   PRODUCT_COLOR,
  status: index % 3 ? sample(['boys', 'boys', 'boys', 'boys&girls']) : 'girls',
  inventoryType: sample(['Available', 'Available']),
  sizes: PRODUCT_SIZE,
  available: index % 3 === 0 ? random(19, 100) : 2,
  // description: PRODUCT_DESCRIPTION,
  description: PG_DESCRIPTION,
  sold: random(999),
  createdAt: mockData.time(index),
  rooms: sample(['Double Sharing', 'Triple Sharing', '3+ Sharing']),
  gender: sample(['Boys', 'Girls', 'Both']),
  food: sample(['Food Provided', 'Non Veg allowed', 'Self Cooking Kitchen']),
  amenities: sample(['Ac', 'Power backup', 'Washing Machine', 'Wifi', 'Room cleaning', 'Parking'])
}));

// ----------------------------------------------------------------------

mock.onGet('/api/products').reply(200, { products });

// ----------------------------------------------------------------------

mock.onGet('/api/products/product').reply((config) => {
  try {
    const { name } = config.params;
    const product = products.find((_product) => paramCase(_product.name) === name);

    if (!product) {
      return [404, { message: 'product not found' }];
    }

    return [200, { product }];
  } catch (error) {
    console.error(error);
    return [500, { message: 'Internal server error' }];
  }
});
