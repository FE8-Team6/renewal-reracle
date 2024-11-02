import { Layout } from "@/components/layout/Layout";
import MyPage from "@/components/MyPage/MyPage";
import Nav from "@/components/Nav/Nav";
import CategoryDetailItems from "@/components/WasteCategory/CategoryDetailItems";
import CategoryItems from "@/components/WasteCategory/CategoryItems";
import BackHeader from "@/lib/common/BackHeader";
import {
  Login,
  MyQuestion,
  NotFound,
  PasswordReset,
  Qna,
  SignUp,
  Announcement,
} from "@/pages";
import AnnouncementDetailItem from "@/pages/AnnouncementDetailItem";
import Answer from "@/pages/Answer";
import Comments from "@/pages/Comments";
import Home from "@/pages/Home";

export const routes = [
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
        <Nav />
      </>
    ),
  },
  {
    path: "/pwreset",
    element: <PasswordReset />,
  },
  {
    path: "/signup",
    element: (
      <>
        <SignUp />
        <Nav />
      </>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "category/:categoryId",
    element: (
      <Layout>
        <CategoryItems />
      </Layout>
    ),
  },
  {
    path: "category/:categoryId/item/:itemId",
    element: (
      <>
        <BackHeader />
        <CategoryDetailItems />
        <Nav />
      </>
    ),
  },
  {
    path: "qna",
    element: (
      <Layout>
        <Qna />
      </Layout>
    ),
  },
  {
    path: "announcement",
    element: (
      <Layout>
        <Announcement />
      </Layout>
    ),
  },
  {
    path: "announcement/:announcementId",
    element: (
      <Layout>
        <AnnouncementDetailItem />
      </Layout>
    ),
  },
  {
    path: "answer/:questionId",
    element: <Answer />,
  },
  {
    path: "comments/:questionId",
    element: <Comments />,
  },
  {
    path: "mypage",
    element: (
      <Layout>
        <MyPage />
      </Layout>
    ),
  },

  {
    path: "myquestion",
    element: (
      <Layout>
        <MyQuestion />
      </Layout>
    ),
  },
];
