import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../layout/MainLayout';
import Login from '../pages/Login';
import Register from '../pages/Register'
import Home from '../pages/Home';
import Privateroute from '../components/Privateroute';
//import ErrorPage from '../components/ErrorPage'
export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        
        children: [
            {
                path: '/',
                element: <Login/>,
                
            },
            {
                path: '/home',
                element: <Privateroute>
                    <Home />,
                </Privateroute>
                
            },
            {
                path: '/register',
                element: <Register />,
            },
        ],
    },

]);