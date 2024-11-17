import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, query, orderBy, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GoPencil } from 'react-icons/go';
import { formatDateToKoreanTime } from '@/lib/utils/dateKoreanTime';
import { NavLink } from 'react-router-dom';
import KakaoAdfit320x50 from '@/components/KakaoAdfit320x50';
import KakaoAdfit320x100 from '@/components/KakaoAdfit320x100';
import AnnouncementCategoryButton from '@/lib/styles/CategoryButton/AnnouncementCategoryButton';

type Announcement = {
  id: string;
  title: string;
  details: string;
  createdAt: Date;
  author: string;
  category: string;
};

export const Announcement = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    details: '',
    author: '',
    category: '',
  });
  const [currentUser, setCurrentUser] = useState<{
    displayName: string;
    uid: string;
  }>({
    displayName: '',
    uid: '',
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>('');
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const [selectedAnnouncementCategory, setselectedAnnouncementCategory] = useState<string>('전체');

  const announcementCategories = ['전체', '개발', '업데이트', '기타'];

  const filteredAnnouncements =
    selectedAnnouncementCategory === '전체'
      ? announcements
      : announcements.filter((announcement) => announcement.category === selectedAnnouncementCategory);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 395);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const storedUser = userData ? JSON.parse(userData) : null;
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (user && user.uid === 'vzFV5N4PH1VjKNeZoClT83fTibN2') {
        setIsAdmin(true);
      }
    };

    checkAdmin();
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const queryOrderBy = query(collection(db, 'announcements'), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(queryOrderBy);
    const announcementList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      title: doc.data().title,
      details: doc.data().details,
      createdAt: doc.data().createdAt.toDate(),
      author: doc.data().author,
      category: doc.data().category,
    }));
    setAnnouncements(announcementList);
  };

  const handleAddAnnouncement = async () => {
    if (
      newAnnouncement.title.trim() === '' ||
      newAnnouncement.details.trim() === '' ||
      newAnnouncement.category === ''
    ) {
      alert('제목, 내용 및 카테고리를 입력해주세요.');
      return;
    }
    try {
      if (editId) {
        await setDoc(doc(db, 'announcements', editId), {
          ...newAnnouncement,
          createdAt: serverTimestamp(),
          author: currentUser.displayName,
        });
        setEditId('');
      } else {
        await addDoc(collection(db, 'announcements'), {
          ...newAnnouncement,
          createdAt: serverTimestamp(),
          author: currentUser.displayName,
        });
      }
      setNewAnnouncement({ title: '', details: '', author: '', category: '' });
      fetchAnnouncements();
      setIsModalOpen(false);
    } catch (error) {
      console.error('공지사항 추가 실패:', error);
    }
  };

  const truncateTitle = (title: string) => {
    return title.length > 28 ? `${title.slice(0, 28)}...` : title;
  };

  return (
    <main>
      <KakaoAdfit320x50 />
      <div className="flex justify-center mt-2">
        {announcementCategories.map((announcementCategory) => (
          <AnnouncementCategoryButton
            key={announcementCategory}
            postCategory={announcementCategory}
            isActive={selectedAnnouncementCategory === announcementCategory}
            onClick={() => setselectedAnnouncementCategory(announcementCategory)}
          />
        ))}
      </div>
      <section
        className={`${isSmallScreen ? 'w-[20rem]' : 'w-[23rem]'} min-h-[calc(100vh-16rem)] relative overflow-y-auto overflow-x-hidden mx-auto my-[1.5vh] rounded-4 pb-[5rem]`}>
        <KakaoAdfit320x100 />
        {isAdmin && (
          <div className="fixed bottom-[16vh] left-[50%] transform -translate-x-1/2">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <button className="p-2 border bg-yellow rounded-10">
                  <GoPencil className="w-5 h-5 text-white" />
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>공지사항</DialogTitle>
                  <DialogDescription>새로운 공지사항을 작성하세요.</DialogDescription>
                </DialogHeader>
                <Select
                  onValueChange={(value) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      category: value,
                    })
                  }
                  defaultValue="카테고리 선택">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="업데이트">업데이트</SelectItem>
                    <SelectItem value="개발">개발</SelectItem>
                    <SelectItem value="기타">기타</SelectItem>
                  </SelectContent>
                </Select>
                <Input
                  type="text"
                  placeholder="제목"
                  value={newAnnouncement.title}
                  className="w-full p-2 mb-2 border"
                  onChange={(e) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      title: e.target.value,
                    })
                  }
                />
                <textarea
                  placeholder="상세 내용"
                  value={newAnnouncement.details}
                  className="w-full h-[10rem] border border-purple rounded-4 p-2 mb-2 "
                  onChange={(event) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      details: event.target.value,
                    })
                  }
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary" size="lg">
                      닫기
                    </Button>
                  </DialogClose>
                  <Button variant="default" size="lg" onClick={handleAddAnnouncement}>
                    {editId ? '수정' : '추가'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        )}
        {filteredAnnouncements.map((announcement) => (
          <div
            key={announcement.id}
            className=" bg-yellowLight w-full h-[6rem] mx-auto my-3 flex items-center justify-between px-3 rounded-4 text-black ">
            <NavLink to={`/announcement/${announcement.id}`} className="flex flex-col flex-grow">
              <div className="flex flex-col">
                <h2 className="text-base font-semibold text-gray-900 truncate">{truncateTitle(announcement.title)}</h2>
                <p className="text-sm text-gray-500">{announcement.author}</p>
              </div>
              <div className="flex items-center justify-between mt-1">
                <div className="flex gap-2">
                  {announcement.createdAt && (
                    <time className="text-sm">{formatDateToKoreanTime(announcement.createdAt)}</time>
                  )}
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </section>
    </main>
  );
};
