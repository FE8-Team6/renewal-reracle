import { db } from '@/firebase';
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { AiOutlineNotification } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';

const NotificationBanner = () => {
  const [latestAnnouncement, setLatestAnnouncement] = useState<string>('');

  useEffect(() => {
    const fetchLatestAnnouncement = async () => {
      const q = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const latestDoc = querySnapshot.docs[0];
        setLatestAnnouncement(truncateTitle(latestDoc.data().title));
      }
    };

    fetchLatestAnnouncement();
  }, []);

  const truncateTitle = (title: string) => {
    return title.length > 33 ? `${title.slice(0, 33)}...` : title;
  };

  return (
    <div className="w-full h-[3.75vh] absolute border-t border-b border-purple bg-purpleLight text-[1.5vh] font-bold text-purple flex justify-center items-center gap-2">
      <NavLink to="/announcement">
        <div className="flex items-center gap-2">
          <AiOutlineNotification className="w-4 h-4" />
          {latestAnnouncement ? ` ${latestAnnouncement}` : '공지사항이 없습니다.'}
        </div>
      </NavLink>
    </div>
  );
};

export default NotificationBanner;
