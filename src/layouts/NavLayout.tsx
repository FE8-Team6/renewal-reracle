import { Nav } from '@/components/Nav';
import { Outlet } from 'react-router-dom';

export const NavLayout = () => {
  return (
    <>
      <Outlet />
      <Nav />
    </>
  );
};
