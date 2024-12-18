import { DetailLayout, MainLayout, NavLayout } from '@/layouts';
import Loading from '@/pages/Loading';
import React, { Suspense } from 'react';
import { Home, Login, SignUp, NotFound } from '@/pages';
import ReraclePuzzle from '@/pages/ReracleGame';
import BackHeader from '@/lib/common/BackHeader';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const CategoryDetailItemsPage = React.lazy(() => import('@/pages/CategoryDetailItemsPage'));
const CategoryItemsPage = React.lazy(() => import('@/pages/CategoryItemsPage'));
const Comments = React.lazy(() => import('@/pages/Comments'));
const MyQuestion = React.lazy(() => import('@/pages/MyQuestion'));
const Announcement = React.lazy(() => import('@/pages/Announcement'));
const AnnouncementDetailItem = React.lazy(() => import('@/pages/AnnouncementDetailItem'));
const Answer = React.lazy(() => import('@/pages/Answer'));
const MyPage = React.lazy(() => import('@/pages/MyPage'));
const PasswordReset = React.lazy(() => import('@/pages/PasswordReset'));
const Qna = React.lazy(() => import('@/pages/Qna'));
const Article = React.lazy(() => import('@/pages/Article'));
const ArticleItem = React.lazy(() => import('@/components/ArticleItem.tsx'));

export const routes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <ErrorBoundary>
            <Home />
          </ErrorBoundary>
        ),
      },
      {
        path: 'qna',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Qna />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: '/article',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Article />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: '/announcement',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Announcement />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: '/mypage',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <MyPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: '/myquestion',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <MyQuestion />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: 'category/:categoryId',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <CategoryItemsPage />
            </Suspense>
          </ErrorBoundary>
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
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <PasswordReset />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: '/article/:id',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <ArticleItem />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: 'category/:categoryId/item/:itemId',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <CategoryDetailItemsPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: 'announcement/:announcementId',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <AnnouncementDetailItem />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: 'answer/:questionId',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Answer />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: '/signup',
        element: (
          <ErrorBoundary>
            <SignUp />
          </ErrorBoundary>
        ),
      },
      {
        path: '/login',
        element: (
          <ErrorBoundary>
            <Login />
          </ErrorBoundary>
        ),
      },
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
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Comments />
            </Suspense>
          </ErrorBoundary>
        ),
      },
    ],
  },
  {
    element: (
      <ErrorBoundary>
        <BackHeader />
        <ReraclePuzzle />
      </ErrorBoundary>
    ),
    path: '/game',
  },
];
