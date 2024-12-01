import Nav from '@/components/Nav/Nav';
import BackHeader from '@/lib/common/BackHeader';
import { Outlet } from 'react-router-dom';

export const DetailLayout = () => {
  return (
    <>
      <BackHeader />
      <Outlet />
      <Nav />
    </>
  );
};
