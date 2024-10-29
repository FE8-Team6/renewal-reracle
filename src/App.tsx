import { useEffect } from "react";
// import { setBasePath } from "@shoelace-style/shoelace/dist/utilities/base-path";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "@shoelace-style/shoelace/dist/themes/light.css";
// import Loading from "./pages/Loading";
import { routes } from "./router/routes";
import { saveWasteCategories } from "./lib/utils/firestoreService";
// setBasePath(
//   "https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.15.0/cdn/"
// );

const router = createBrowserRouter(routes);

const App = () => {
  useEffect(() => {
    saveWasteCategories();
  }, []);

  return (
    <>
      <div className="absolute top-1/2 left-1/2  transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-full max-w-[440px] h-full max-h-[920px] bg-white">
        <RouterProvider router={router} />
      </div>
      {/* <StyledAppContainer> */}
      {/* {isLoading ? <Loading /> : <RouterProvider router={router} />} */}
      {/* </StyledAppContainer> */}
    </>
  );
};

export default App;
