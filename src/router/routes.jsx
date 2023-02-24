import * as RouteNames from './routeNames';
import Home from '../pages/Home/Home';
import Orders from '../pages/Orders/Orders';
import Favourites from '../pages/Favourites/Favourites';

const routes = [
   {
      path: RouteNames.HOME,
      Component: Home
   },
   {
      path: RouteNames.ORDERS,
      Component: Orders
   },
   {
      path: RouteNames.FAVOURITES,
      Component: Favourites
   }
];

export default routes;