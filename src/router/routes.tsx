import { DetailLayout } from '@/components/layout/DetailLayout';
import { MainLayout } from '@/components/layout/MainLayout';
import { NavLayout } from '@/components/layout/NavLayout';
import CategoryDetailItems from '@/components/WasteCategory/CategoryDetailItems';
import CategoryItems from '@/components/WasteCategory/CategoryItems';
import {
  Comments,
  Login,
  MyQuestion,
  NotFound,
  SignUp,
  Announcement,
  AnnouncementDetailItem,
  Answer,
  MyPage,
  PasswordReset,
} from '@/pages';
import Home from '@/pages/Home';
import Loading from '@/pages/Loading';
import React, { Suspense } from 'react';

const Qna = React.lazy(() => import('@/pages/Qna'));

export const routes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'qna',
        element: (
          <Suspense fallback={<Loading />}>
            <Qna />
          </Suspense>
        ),
      },
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
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/login',
        element: <Login />,
      },
    ],
  },
  {
    element: <NavLayout />,
    children: [
      {
        path: 'comments/:questionId',
        element: <Comments />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
