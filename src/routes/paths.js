// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login/:role'),
  // loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register/customer'),
  // registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  // pricing: '/pricing',
  // payment: '/payment',
  about: '/dashboard/pg-finder/customer/about-us',
  contact: '/dashboard/pg-finder/customer/contact-us',
  // faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/pg-finder/Admin/app')
    // ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    // analytics: path(ROOTS_DASHBOARD, '/analytics'),
    // banking: path(ROOTS_DASHBOARD, '/banking'),
    // booking: path(ROOTS_DASHBOARD, '/booking')
  },
  // mail: {
  //   root: path(ROOTS_DASHBOARD, '/mail'),
  //   all: path(ROOTS_DASHBOARD, '/mail/all')
  // },
  // chat: {
  //   root: path(ROOTS_DASHBOARD, '/chat'),
  //   new: path(ROOTS_DASHBOARD, '/chat/new'),
  //   conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  // },
  // calendar: path(ROOTS_DASHBOARD, '/calendar'),
  // kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    //   root: path(ROOTS_DASHBOARD, '/user'),
    //   profile: path(ROOTS_DASHBOARD, '/user/profile'),
    //   cards: path(ROOTS_DASHBOARD, '/user/cards'),
    //   // list: path(ROOTS_DASHBOARD, '/user/list'),
    //   newUser: path(ROOTS_DASHBOARD, '/user/new'),
    //   editById: path(ROOTS_DASHBOARD, '/user/reece-chung/edit'),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },

  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/pg-finder/customer'),
    shop: path(ROOTS_DASHBOARD, '/pg-finder/customer/home'),
    product: path(ROOTS_DASHBOARD, '/pg-finder/customer/pg/:name'),
    checkout: path(ROOTS_DASHBOARD, '/pg-finder/customer/checkout'),
    payment: path(ROOTS_DASHBOARD, '/pg-finder/customer/payment'),
    invoice: path(ROOTS_DASHBOARD, '/pg-finder/customer/invoice'),
    booking: path(ROOTS_DASHBOARD, '/pg-finder/customer/booking'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    list: path(ROOTS_DASHBOARD, '/pg-finder/Admin/list'),
    userlist: path(ROOTS_DASHBOARD, '/pg-finder/Admin/user/list'),
    newProduct: path(ROOTS_DASHBOARD, '/pg-finder/Admin/pg/new'),
    bookPG: path(ROOTS_DASHBOARD, '/pg-finder/Admin/pgbookDetails'),
    feedback: path(ROOTS_DASHBOARD, '/pg-finder/Admin/feedback')
  }
  // blog: {
  //   root: path(ROOTS_DASHBOARD, '/blog'),
  //   posts: path(ROOTS_DASHBOARD, '/blog/posts'),
  //   post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
  //   postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  //   newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  // }
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
