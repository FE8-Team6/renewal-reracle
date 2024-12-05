import Header from '@/components/Header';
import { Nav } from '@/components/Nav';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Nav />
    </>
  );
};
