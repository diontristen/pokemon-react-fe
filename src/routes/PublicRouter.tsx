import { Navigate, Outlet } from 'react-router-dom'
import LocalStorageService from '@/services/LocalStorage';


const PublicRouter = () => {
  const token = LocalStorageService.getItem(LocalStorageService.AUTH_TOKEN);
  return (
    token ? <Navigate to='/' /> : <Outlet />
  )
};

export default PublicRouter;