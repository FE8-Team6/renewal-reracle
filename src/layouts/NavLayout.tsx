import Nav from '@/components/Nav/Nav';
import { Outlet } from 'react-router-dom';

export const NavLayout = () => {
  return (
    <>
      <Outlet />
      <Nav />
    </>
  );
};
