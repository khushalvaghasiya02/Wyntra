/* eslint-disable prettier/prettier */
import Cart from '../../screen/Cart';
import AllCategories from '../../screen/Categories';
import Home from '../../screen/Home';
import More from '../../screen/More';
import Intro from '../comman/Auth/Intro';
import Login from '../comman/Auth/Login';
import Registration from '../comman/Auth/Registration';
import Splash from '../comman/Auth/Splash';
import AllProduct from '../comman/Home/AllProduct';
import CheckOut from '../comman/Home/CheckOut';
import ProductDetail from '../comman/Home/ProductDetail';
import ProductList from '../comman/Home/ProductList';
import Search from '../comman/Home/Search';
import MainTabScreen, { DrawerMenu } from '../comman/Navbar';
import image from './Images';

export const mainStack = [
  {id: 1, name: 'Splash', component: Splash, back: false},
  {id: 2, name: 'Intro', component: Intro, back: false},
  {id: 3, name: 'Login', component: Login, back: true},
  {id: 4, name: 'Registration', component: Registration, back: true},
  {id: 5, name: 'move', component: DrawerMenu, back: false},
  {id: 6, name: 'ProductList', component: ProductList, back: true},
  {id: 7, name: 'AllProduct', component: AllProduct, back: true},
  {id: 8, name: 'ProductDetail', component: ProductDetail, back: true},
  {id: 9, name: 'Search', component: Search, back: true},
  {id: 10, name: 'CheckOut', component: CheckOut, back: true},

];

export const mainTab = [
  {id: 1, title: 'Home', component: Home, src: image.HOME_ICON},
  {
    id: 2,
    title: 'Categories',
    component: AllCategories,
    src: image.CATEGORIES_ICON,
  },
  {id: 3, title: 'MyCart', component: Cart, src: image.CART_ICON},
  {id: 4, title: 'Profile', component: More, src: image.USER_ICON},
];

export const mainDrawer = [
  {id: 1, title: 'Home',name: 'Home', component: MainTabScreen, src: image.HOME_ICON},
  {
    id: 2,
    title: 'Categories',
    name: 'Categories',
    component: AllCategories,
    src: image.CATEGORIES_ICON,
  },
  {id: 3, title: 'MyCart', name: 'MyCart', component: Cart, src: image.CART_ICON},
  {id: 4, title: 'Profile',  name: 'Profile', component: More, src: image.USER_ICON},
];
