import { DetailLayout } from '@/components/layout/DetailLayout';
import { MainLayout } from '@/components/layout/MainLayout';
import { NavLayout } from '@/components/layout/NavLayout';
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
    element: <NavLayout />,
    children: [
      {
        path: 'comments/:questionId',
        element: <Comments />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
