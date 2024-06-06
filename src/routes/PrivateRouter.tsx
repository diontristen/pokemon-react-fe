import { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom'
import Layout from '@/components/Layout/Layout';
import LocalStorageService from '@/services/LocalStorage';
import { useUser } from '@/hooks/useUser';
import { useLogout } from '@/hooks/useLogout';
import Loader from '@/components/Loader/Loader';

const PrivateRouter = () => {
  const token = LocalStorageService.getItem(LocalStorageService.AUTH_TOKEN);
  const { getUser, loading, error, user } = useUser();
  const { logout } = useLogout();
  const onGetUser = async () => {
    await getUser();
  }
  useEffect(() => {
    onGetUser();
  }, []);

  if (loading) {
    return <Loader />
  }
  if (error) {
    logout();
    return <Navigate to='/login' />
  }

  return (
    token ? <Layout><Outlet /> </Layout> : <Navigate to='/login' />
  )
};


export default PrivateRouter;