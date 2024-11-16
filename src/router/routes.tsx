import { DetailLayout } from '@/components/layout/DetailLayout';
import { MainLayout } from '@/components/layout/MainLayout';
import Nav from '@/components/Nav/Nav';
import CategoryDetailItems from '@/components/WasteCategory/CategoryDetailItems';
import CategoryItems from '@/components/WasteCategory/CategoryItems';
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
    element: <DetailLayout />,
    children: [
      { path: '/pwreset', element: <PasswordReset /> },
      { path: 'category/:categoryId/item/:itemId', element: <CategoryDetailItems /> },
      { path: 'announcement/:announcementId', element: <AnnouncementDetailItem /> },
      { path: 'answer/:questionId', element: <Answer /> },
    ],
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
];
