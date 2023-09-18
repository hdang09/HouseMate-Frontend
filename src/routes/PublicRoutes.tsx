import Home from '../pages/home';
import Login from '../pages/login';
import NotFound from '../pages/404';
import config from '../config';

const CustomerRoutes = {
    path: '/',
    children: [
        { path: config.routes.home, element: <Home /> },
        { path: config.routes.login, element: <Login /> },
        { path: '*', element: <NotFound /> },
    ],
};

export default CustomerRoutes;
