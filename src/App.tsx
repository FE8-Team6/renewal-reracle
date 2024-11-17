import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import '@shoelace-style/shoelace/dist/themes/light.css';
import { routes } from './router/routes';
import { saveWasteCategories } from './lib/utils/firestoreService';
import NotificationWebApi from './components/NotificationWebApi';

const router = createBrowserRouter(routes);

const App = () => {
  useEffect(() => {
    saveWasteCategories();
  }, []);

  return (
    <>
      <div className="relative select-none m-auto flex flex-col w-full max-w-[500px] h-full bg-white pt-[3rem]">
        <RouterProvider router={router} />
        <NotificationWebApi />
      </div>
    </>
  );
};

export default App;
