import { DetailLayout, MainLayout, NavLayout } from '@/layouts';
import React, { Suspense } from 'react';
import { HomePage, LoginPage, SignUpPage, NotFoundPage } from '@/pages';
import ReraclePuzzle from '@/pages/ReracleGame';
import BackHeader from '@/lib/common/BackHeader';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Loading from '@/components/Loading';
import QnaPage from '@/pages/QnaPage';

const CategoryDetailItemsPage = React.lazy(() => import('@/pages/CategoryDetailItemsPage'));
const CategoryItemsPage = React.lazy(() => import('@/pages/CategoryItemsPage'));
const CommentsPage = React.lazy(() => import('@/pages/CommentsPage'));
const MyQuestionPage = React.lazy(() => import('@/pages/MyQuestionPage'));
const AnnouncementPage = React.lazy(() => import('@/pages/AnnouncementPage'));
const AnnouncementDetailItemPage = React.lazy(() => import('@/pages/AnnouncementDetailItemPage'));
const AnswerPage = React.lazy(() => import('@/pages/AnswerPage'));
const MyPage = React.lazy(() => import('@/pages/MyPage'));
const PasswordResetPage = React.lazy(() => import('@/pages/PasswordResetPage'));
const ArticlePage = React.lazy(() => import('@/pages/ArticlePage'));
const ArticleItem = React.lazy(() => import('@/components/ArticleItem'));

export const routes = [
  {
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: (
          <ErrorBoundary>
            <HomePage />
          </ErrorBoundary>
        ),
      },
      {
        path: 'qna',
        element: (
          <ErrorBoundary>
            <QnaPage />
          </ErrorBoundary>
        ),
      },
      {
        path: '/article',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <ArticlePage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: '/announcement',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <AnnouncementPage />
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
              <MyQuestionPage />
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
              <PasswordResetPage />
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
              <AnnouncementDetailItemPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: 'answer/:questionId',
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <AnswerPage />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: '/signup',
        element: (
          <ErrorBoundary>
            <SignUpPage />
          </ErrorBoundary>
        ),
      },
      {
        path: '/login',
        element: (
          <ErrorBoundary>
            <LoginPage />
          </ErrorBoundary>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
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
              <CommentsPage />
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
