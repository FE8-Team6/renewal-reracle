import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "@shoelace-style/shoelace/dist/themes/light.css";
// import Loading from "./pages/Loading";
import { routes } from "./router/routes";
import { saveWasteCategories } from "./lib/utils/firestoreService";
// import NotificationWebApi from "./components/NotificationWebApi";

const router = createBrowserRouter(routes);

const App = () => {
  useEffect(() => {
    saveWasteCategories();
  }, []);

  return (
    <>
      <div className="absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-full max-w-[440px] h-full max-h-[920px] bg-white">
        <RouterProvider router={router} />
        {/* <NotificationWebApi /> */}
      </div>
      {/* <StyledAppContainer> */}
      {/* {isLoading ? <Loading /> : <RouterProvider router={router} />} */}
      {/* </StyledAppContainer> */}
    </>
  );
};

export default App;
