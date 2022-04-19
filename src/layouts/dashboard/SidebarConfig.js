import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InfoIcon from '@mui/icons-material/Info';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AppSettingsAltIcon from '@mui/icons-material/AppSettingsAlt';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useLocation } from 'react-router';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../routes/paths';
// components
import Label from '../../components/Label';
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking')
};

const sidebarConfigAdmin = [
  {
    items: [
      {
        title: 'Dashboard',
        path: PATH_DASHBOARD.general.app,
        icon: <HomeIcon />
      },
      { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
      { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
      { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
      { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking },
      {
        title: 'Manage User',
        path: PATH_DASHBOARD.eCommerce.userlist,
        icon: <ManageAccountsIcon />
      },
      {
        title: 'Manage PG',
        path: PATH_DASHBOARD.eCommerce.list,
        icon: <SettingsIcon />
      },
      {
        title: 'Manage Booking Details',
        path: PATH_DASHBOARD.eCommerce.bookPG,
        icon: <AppSettingsAltIcon />
      },
      {
        title: 'Manage Feedback',
        path: PATH_DASHBOARD.eCommerce.feedback,
        icon: <RateReviewIcon />
      }
    ]
  }
];

const sidebarConfigCustomer = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'general',
  //   items: [
  //     {
  //       title: 'app',
  //       path: PATH_DASHBOARD.general.app,
  //       icon: ICONS.dashboard
  //     },
  //     { title: 'e-commerce', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
  //     { title: 'analytics', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
  //     { title: 'banking', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
  //     { title: 'booking', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking }
  //   ]
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    // subheader: 'management',
    items: [
      // MANAGEMENT : USER
      // {
      //   title: 'user',
      //   path: PATH_DASHBOARD.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'profile', path: PATH_DASHBOARD.user.profile },
      //     { title: 'cards', path: PATH_DASHBOARD.user.cards },
      //     { title: 'list', path: PATH_DASHBOARD.user.list },
      //     { title: 'create', path: PATH_DASHBOARD.user.newUser },
      //     { title: 'edit', path: PATH_DASHBOARD.user.editById },
      //     { title: 'account', path: PATH_DASHBOARD.user.account }
      //   ]
      // },

      // MANAGEMENT : E-COMMERCE
      // {
      //   title: 'Home',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: <HomeIcon />,
      //   children: [
      //     { title: 'PG', path: PATH_DASHBOARD.eCommerce.shop },
      //     { title: 'About Us', path: '/about-us' }
      //     // { title: 'product', path: PATH_DASHBOARD.eCommerce.productById },
      //     // { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
      //     // { title: 'create', path: PATH_DASHBOARD.eCommerce.newProduct },
      //     // { title: 'edit', path: PATH_DASHBOARD.eCommerce.editById },
      //     // { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout }
      //     // { title: 'invoice', path: PATH_DASHBOARD.eCommerce.invoice }
      //   ]
      // }

      {
        title: 'Home',
        path: PATH_DASHBOARD.eCommerce.shop,
        icon: <HomeIcon />
      },
      {
        title: 'Your Book PG',
        path: PATH_DASHBOARD.eCommerce.booking,
        icon: <ShoppingCartIcon />
      },
      {
        title: 'About Us',
        path: PATH_PAGE.about,
        icon: <InfoIcon />
      },
      {
        title: 'Contact Us',
        path: PATH_PAGE.contact,
        icon: <ContactPageIcon />
      }
      // MANAGEMENT : BLOG
      // {
      //   title: 'blog',
      //   path: PATH_DASHBOARD.blog.root,
      //   icon: ICONS.blog,
      //   children: [
      //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
      //     { title: 'post', path: PATH_DASHBOARD.blog.postById },
      //     { title: 'new post', path: PATH_DASHBOARD.blog.newPost }
      //   ]
      // }
    ]
  }

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: <Label color="error">2</Label>
  //     },
  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     {
  //       title: 'kanban',
  //       path: PATH_DASHBOARD.kanban,
  //       icon: ICONS.kanban
  //     }
  //   ]
  // }
];

export { sidebarConfigCustomer, sidebarConfigAdmin };
