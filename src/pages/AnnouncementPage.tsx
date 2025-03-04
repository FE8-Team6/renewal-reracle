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
import { formatDateToKoreanTime } from '@/utils/dateKoreanTime';
import { NavLink } from 'react-router-dom';
import { AnnouncementCategoryButton } from '@/lib/common/CategoryButton';
import { KakaoAdfit320x100, KakaoAdfit320x50 } from '@/components/KakaoAdfit';

type Announcement = {
  id: string;
  title: string;
  details: string;
  createdAt: Date;
  author: string;
  category: string;
};

const AnnouncementPage = () => {
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
  const [selectedAnnouncementCategory, setselectedAnnouncementCategory] = useState<string>('전체');

  const announcementCategories = ['전체', '개발', '업데이트', '기타'];

  const filteredAnnouncements =
    selectedAnnouncementCategory === '전체'
      ? announcements
      : announcements.filter((announcement) => announcement.category === selectedAnnouncementCategory);

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
    <main aria-label="공지사항 페이지">
      <KakaoAdfit320x50 />
      <nav className="flex justify-center mt-2" role="navigation" aria-label="공지사항 카테고리">
        {announcementCategories.map((announcementCategory) => (
          <AnnouncementCategoryButton
            key={announcementCategory}
            postCategory={announcementCategory}
            isActive={selectedAnnouncementCategory === announcementCategory}
            onClick={() => setselectedAnnouncementCategory(announcementCategory)}
            aria-selected={selectedAnnouncementCategory === announcementCategory}
            aria-label={`${announcementCategory} 카테고리`}
          />
        ))}
      </nav>
      <section
        className="w-full min-h-[calc(100vh-12rem)] relative overflow-y-auto overflow-x-hidden mx-auto my-3 rounded-4 pb-[5rem] px-8"
        aria-label="공지사항 목록"
      >
        <KakaoAdfit320x100 />
        {isAdmin && (
          <div className="fixed bottom-[16vh] left-[50%] transform -translate-x-1/2">
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <button className="p-2 border bg-yellow rounded-10" type="button" aria-label="공지사항 작성하기">
                  <GoPencil className="w-5 h-5 text-white" aria-hidden="true" />
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
                  defaultValue="카테고리 선택"
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="카테고리 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="업데이트">업데이트</SelectItem>
                    <SelectItem value="개발">개발</SelectItem>
                    <SelectItem value="기타">기타</SelectItem>
                  </SelectContent>
                </Select>
                <label htmlFor="announcement-title" className="sr-only">
                  제목
                </label>
                <Input
                  id="announcement-title"
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
                <label htmlFor="announcement-details" className="sr-only">
                  상세 내용
                </label>
                <textarea
                  id="announcement-details"
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
        <ul className="space-y-3" role="list" aria-label="공지사항 목록">
          {filteredAnnouncements.map((announcement) => (
            <li
              key={announcement.id}
              className="bg-yellowLight w-full h-[6rem] mx-auto flex items-center justify-between px-3 rounded-4 text-black"
            >
              <NavLink
                to={`/announcement/${announcement.id}`}
                className="flex flex-col"
                aria-label={`${announcement.title} 공지사항 상세보기`}
              >
                <article>
                  <h2
                    className="text-base font-semibold text-gray-900 truncate"
                    tabIndex={0}
                    aria-label={`제목: ${announcement.title}`}
                  >
                    {truncateTitle(announcement.title)}
                  </h2>
                  <p className="text-sm text-gray-500" tabIndex={0} aria-label={`작성자: ${announcement.author}`}>
                    {announcement.author}
                  </p>
                  {announcement.createdAt && (
                    <time
                      tabIndex={0}
                      dateTime={announcement.createdAt.toISOString()}
                      className="text-sm"
                      aria-label={`작성일: ${formatDateToKoreanTime(announcement.createdAt)}`}
                    >
                      {formatDateToKoreanTime(announcement.createdAt)}
                    </time>
                  )}
                </article>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default AnnouncementPage;
