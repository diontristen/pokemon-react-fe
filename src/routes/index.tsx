import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes';
import PrivateRouter from '@/routes/PrivateRouter';
import PublicRouter from '@/routes/PublicRouter';
import Loader from '@/components/Loader/Loader';

// PUBLIC
const Login = React.lazy(() => import('@/pages/Login'));
const Register = React.lazy(() => import('@/pages/Register'));

// PRIVATE
const Home = React.lazy(() => import('@/pages/Home'));
const Collection = React.lazy(() => import('@/pages/Collection'));

const AppRouter = () => {
    return (
        <Router>
            <Suspense fallback={<Loader/>}>
                <Routes>
                    <Route element={<PublicRouter />}>
                        <Route path={PUBLIC_ROUTES.login} element={<Login />} />
                        <Route path={PUBLIC_ROUTES.signUp} element={<Register />} />
                    </Route>
                    <Route element={<PrivateRouter />}>
                        <Route path={PRIVATE_ROUTES.home} element={<Home />} />
                        <Route path={PRIVATE_ROUTES.collection} element={<Collection />} />
                    </Route>
                </Routes>
            </Suspense>
        </Router>
    );
};

export default AppRouter;