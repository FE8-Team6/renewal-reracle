import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from '@/router/routes';
import NotificationWebApi from '@/components/NotificationWebApi';
import { saveArticles } from './utils/articleService';
import { saveWasteCategories } from './utils/firestoreService';

const router = createBrowserRouter(routes);

const App = () => {
  useEffect(() => {
    saveWasteCategories();
    saveArticles();
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
