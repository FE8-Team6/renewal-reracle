import DetailItems from "@/components/DetailItems";
import { Layout } from "@/components/layout/Layout";
import MyPage from "@/components/MyPage/MyPage";
import CategoryDetailItems from "@/components/WasteCategory/CategoryDetailItems";
import CategoryItems from "@/components/WasteCategory/CategoryItems";
// import WasteCategoryItems from "@/components/WasteCategoryItems";
import {
  Answer,
  Login,
  MyQuestion,
  NotFound,
  PasswordReset,
  Qna,
  SignUp,
  Topic,
} from "@/pages";
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
    element: <Login />,
  },
  {
    path: "/pwreset",
    element: <PasswordReset />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "category/:categoryId",
    element: (
      <Layout>
        <CategoryItems />,
      </Layout>
    ),
  },
  {
    path: "category/:categoryId/item/:itemId",
    element: (
      <Layout>
        <CategoryDetailItems />
      </Layout>
    ),
  },
  {
    path: "qna",
    element: <Qna />,
  },
  {
    path: "topic",
    element: <Topic />,
  },
  {
    path: "answer/:questionIndex",
    element: <Answer />,
  },
  {
    path: "mypage",
    element: <MyPage />,
  },

  {
    path: "myquestion",
    element: <MyQuestion />,
  },
];
