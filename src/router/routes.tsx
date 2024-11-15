import { MainLayout } from '@/components/layout/MainLayout';
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
  Qna,
  SignUp,
  Announcement,
  AnnouncementDetailItem,
  Answer,
  MyPage,
  PasswordReset,
} from '@/pages';

export const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'qna', element: <Qna /> },
      { path: 'announcement', element: <Announcement /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'myquestion', element: <MyQuestion /> },
      { path: 'category/:categoryId', element: <CategoryItems /> },
    ],
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
    element: (
      <>
        <BackHeader />
        <PasswordReset />
        <Nav />
      </>
    ),
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
    path: 'category/:categoryId/item/:itemId',
    element: (
      <>
        <BackHeader />
        <CategoryDetailItems />
        <Nav />
      </>
    ),
  },
  {
    path: 'announcement/:announcementId',
    element: (
      <>
        <BackHeader />
        <AnnouncementDetailItem />
        <Nav />
      </>
    ),
  },
  {
    path: 'answer/:questionId',
    element: (
      <>
        <BackHeader />
        <Answer />
        <Nav />
      </>
    ),
  },
  {
    path: 'comments/:questionId',
    element: (
      <>
        <Comments />
        <Nav />
      </>
    ),
  },
];
