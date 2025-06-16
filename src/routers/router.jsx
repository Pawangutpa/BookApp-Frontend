import {createBrowserRouter} from 'react-router-dom';
import SingleBook from '../pages/books/SingleBook';
import App from '../App'
import Home from '../pages/home/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Cartpage from '../pages/books/Cartpage';
import CheckoutPage from '../pages/books/CheckoutPage';
import PrivateRoute from './PrivateRoute';
import OrderPage from '../pages/books/OrderPage';
import { Provider } from 'react-redux';
import AdminRoute from './AdminRoute';
import AdminLogin from '../components/AdminLogin';
import DashboardLayout from '../pages/dashboard/DashboardLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import ManageBooks from '../pages/dashboard/manageBooks/ManageBooks';
import AddBook from '../pages/dashboard/addBook/AddBook';
import UpdateBook from '../pages/dashboard/EditBook/UpdateBook';


const router=createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/',
                element: <Home/>
            },
            {
                path: '/orders',
                element: <PrivateRoute><OrderPage/></PrivateRoute>
            },
            {
                path: '/about',
                element: <h1>order</h1>
            },
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/cart',
                element: <Cartpage/>
            },
            {
                path: '/checkout',
                element: <PrivateRoute><CheckoutPage/></PrivateRoute>
            },
            {
                path: '/books/:id',
                element:<SingleBook/>
            }

        ]
    },
    {
        path:"/admin",
        element:<AdminLogin/>
    },
    {
        path:"/dashboard",
        element:<AdminRoute><DashboardLayout/></AdminRoute>,
        children:[
             {
                path: "",
                element:<AdminRoute><Dashboard/></AdminRoute>
             },
             {
                path: "add-new-book",
                element:<AdminRoute><AddBook/></AdminRoute>
             },
             {
                path: "edit-book/:id",
                element:<AdminRoute><UpdateBook/></AdminRoute>
             },
             {
                path: "manage-books",
                element:<AdminRoute><ManageBooks/></AdminRoute>
             }
        ]
    }
]);

export default router;