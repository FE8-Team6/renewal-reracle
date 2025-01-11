import { useEffect } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { routes } from '@/router/routes';
import { saveArticles } from './utils/articleService';
import { saveWasteCategories } from './utils/firestoreService';
import { NotificationWebApi } from './components/Notification';
import { GoogleAdsense } from './components/GoogleAdsense/GoogleAdsense';

const router = createBrowserRouter(routes);

const App = () => {
  useEffect(() => {
    saveWasteCategories();
    saveArticles();
  }, []);

  return (
    <div className="relative select-none m-auto flex flex-col w-full max-w-[500px] h-full bg-white pt-[3rem]">
      <RouterProvider router={router} />
      <NotificationWebApi />
      <GoogleAdsense />
    </div>
  );
};

export default App;
