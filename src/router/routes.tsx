import { Layout } from '@/components/layout/Layout';
import MyPage from '@/components/MyPage/MyPage';
import Nav from '@/components/Nav/Nav';
import CategoryDetailItems from '@/components/WasteCategory/CategoryDetailItems';
import CategoryItems from '@/components/WasteCategory/CategoryItems';
import BackHeader from '@/lib/common/BackHeader';
import {
  Home,
  Comments,
  Login,
  MyQuestion,
  NotFound,
  PasswordReset,
  Qna,
  SignUp,
  Announcement,
  AnnouncementDetailItem,
  Answer,
} from '@/pages';
import { Outlet } from 'react-router-dom';

export const routes = [
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <>
        <Login />
        <Nav />
      </>
    ),
  },
  {
    path: '/pwreset',
    element: <PasswordReset />,
  },
  {
    path: '/signup',
    element: (
      <>
        <SignUp />
        <Nav />
      </>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: 'category',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: ':categoryId',
        element: <CategoryItems />,
      },
      {
        path: ':categoryId/item/:itemId',
        element: (
          <>
            <BackHeader />
            <CategoryDetailItems />
            <Nav />
          </>
        ),
      },
    ],
  },
  {
    path: 'qna',
    element: (
      <Layout>
        <Qna />
      </Layout>
    ),
  },
  {
    path: 'announcement',
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: '',
        element: <Announcement />,
      },
      {
        path: ':announcementId',
        element: (
          <>
            <BackHeader />
            <AnnouncementDetailItem />
            <Nav />
          </>
        ),
      },
    ],
  },
  {
    path: 'answer/:questionId',
    element: <Answer />,
  },
  {
    path: 'comments/:questionId',
    element: <Comments />,
  },
  {
    path: 'mypage',
    element: (
      <Layout>
        <MyPage />
      </Layout>
    ),
  },
  {
    path: 'myquestion',
    element: (
      <Layout>
        <MyQuestion />
      </Layout>
    ),
  },
];
