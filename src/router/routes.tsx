import { DetailLayout } from '@/layout/DetailLayout';
import { MainLayout } from '@/layout/MainLayout';
import { NavLayout } from '@/layout/NavLayout';
import Loading from '@/pages/Loading';
import React, { Suspense } from 'react';

const CategoryDetailItems = React.lazy(() => import('@/components/WasteCategory/CategoryDetailItems'));
const CategoryItems = React.lazy(() => import('@/components/WasteCategory/CategoryItems'));
const Comments = React.lazy(() => import('@/pages/Comments'));
const MyQuestion = React.lazy(() => import('@/pages/MyQuestion'));
const Announcement = React.lazy(() => import('@/pages/Announcement'));
const AnnouncementDetailItem = React.lazy(() => import('@/pages/AnnouncementDetailItem'));
const Answer = React.lazy(() => import('@/pages/Answer'));
const MyPage = React.lazy(() => import('@/pages/MyPage'));
const PasswordReset = React.lazy(() => import('@/pages/PasswordReset'));
const Qna = React.lazy(() => import('@/pages/Qna'));

import { Home, Login, SignUp, NotFound } from '@/pages';
import ReraclePuzzle from '@/pages/ReracleGame';
import BackHeader from '@/lib/common/BackHeader';

export const routes = [
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      {
        path: 'qna',
        element: (
          <Suspense fallback={<Loading />}>
            <Qna />
          </Suspense>
        ),
      },
      {
        path: 'announcement',
        element: (
          <Suspense fallback={<Loading />}>
            <Announcement />
          </Suspense>
        ),
      },
      {
        path: 'mypage',
        element: (
          <Suspense fallback={<Loading />}>
            <MyPage />
          </Suspense>
        ),
      },
      {
        path: 'myquestion',
        element: (
          <Suspense fallback={<Loading />}>
            <MyQuestion />
          </Suspense>
        ),
      },
      {
        path: 'category/:categoryId',
        element: (
          <Suspense fallback={<Loading />}>
            <CategoryItems />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: <DetailLayout />,
    children: [
      {
        path: '/pwreset',
        element: (
          <Suspense fallback={<Loading />}>
            <PasswordReset />
          </Suspense>
        ),
      },
      {
        path: 'category/:categoryId/item/:itemId',
        element: (
          <Suspense fallback={<Loading />}>
            <CategoryDetailItems />
          </Suspense>
        ),
      },
      {
        path: 'announcement/:announcementId',
        element: (
          <Suspense fallback={<Loading />}>
            <AnnouncementDetailItem />
          </Suspense>
        ),
      },
      {
        path: 'answer/:questionId',
        element: (
          <Suspense fallback={<Loading />}>
            <Answer />
          </Suspense>
        ),
      },
      { path: '/signup', element: <SignUp /> },
      { path: '/login', element: <Login /> },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    element: <NavLayout />,
    children: [
      {
        path: 'comments/:questionId',
        element: (
          <Suspense fallback={<Loading />}>
            <Comments />
          </Suspense>
        ),
      },
    ],
  },
  {
    element: (
      <>
        <BackHeader />
        <ReraclePuzzle />
      </>
    ),
    path: '/game',
  },
];
