import CategoryItems from "@/components/CategoryItems";
import DetailItems from "@/components/DetailItems";
import MyPage from "@/components/MyPage/MyPage";
// import WasteCategoryItems from "@/components/WasteCategoryItems";
import {
  Answer,
  Home,
  Login,
  MyQuestion,
  NotFound,
  PasswordReset,
  Qna,
  SignUp,
  Topic,
} from "@/pages";

export const routes = [
  {
    path: "/",
    element: <Home />,
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
    path: "/:categoryId",
    element: <CategoryItems />,
  },
  {
    path: "/:categoryId/:itemId",
    element: <DetailItems />,
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
