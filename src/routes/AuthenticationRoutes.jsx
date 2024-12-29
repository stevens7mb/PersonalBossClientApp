import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

const AuthRegister = Loadable(lazy(() => import('views/pages/authentication/Register')));
const AuthVerifyOtp = Loadable(lazy(() => import('views/pages/authentication/AuthVerifyOtp')));
const GenerateSignedUrl = Loadable(lazy(() => import('views/pages/softwaredelivery/GenerateSignedUrl')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/pages/authentication/register',
            element: <AuthRegister />
        },
        {
            path: '/pages/authentication/verify-otp',
            element: <AuthVerifyOtp />
        },
        {
            path: '/pages/software-delivery/generate-signed-url',
            element: <GenerateSignedUrl />
        }
    ]
};

export default AuthenticationRoutes;
