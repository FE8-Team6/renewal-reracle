import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, deleteDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { formatDateToKoreanTime } from '@/utils/dateKoreanTime';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { formatContent } from '@/constant/formatContent';
import { KakaoAdfit320x50 } from '@/components/KakaoAdfit';

const AnnouncementDetailItemPage = () => {
  const { announcementId } = useParams();
  const [announcement, setAnnouncement] = useState<{
    title: string;
    details: string;
    createdAt: Date;
    author: string;
  }>({
    title: '',
    details: '',
    createdAt: new Date(),
    author: '',
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editAnnouncement, setEditAnnouncement] = useState<{
    title: string;
    details: string;
  }>({
    title: '',
    details: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (user && user.uid === 'vzFV5N4PH1VjKNeZoClT83fTibN2') {
        setIsAdmin(true);
      }
    };

    const fetchAnnouncement = async () => {
      if (announcementId) {
        const docRef = doc(db, 'announcements', announcementId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setAnnouncement({
            title: data.title,
            details: data.details,
            createdAt: data.createdAt.toDate(),
            author: data.author,
          });
          setEditAnnouncement({
            title: data.title,
            details: data.details,
          });
        }
      }
    };

    checkAdmin();
    fetchAnnouncement();
  }, [announcementId]);

  const handleDeleteAnnouncement = async () => {
    try {
      if (announcementId) {
        await deleteDoc(doc(db, 'announcements', announcementId));
        navigate('/announcement');
      }
    } catch (error) {
      console.error('공지사항 삭제 실패:', error);
    }
  };

  const handleEditAnnouncement = async () => {
    try {
      if (announcementId) {
        await setDoc(doc(db, 'announcements', announcementId), {
          ...editAnnouncement,
          createdAt: serverTimestamp(),
          author: announcement.author,
        });
        setIsEditModalOpen(false);
        navigate('/announcement');
      }
    } catch (error) {
      console.error('공지사항 수정 실패:', error);
    }
  };

  return (
    <main aria-label="공지사항 상세 페이지">
      <KakaoAdfit320x50 />
      <section className="px-4 py-2 min-h-[calc(100vh-8rem)]" aria-label="공지사항 내용">
        {announcement ? (
          <article>
            <header>
              <h1 className="text-xl" tabIndex={0} aria-label={`공지사항 제목: ${announcement.title}`}>
                {announcement.title}
              </h1>
            </header>
            <div className="flex items-center justify-between">
              <div className="mt-2">
                <p className="font-semibold" tabIndex={0} aria-label={`작성자: ${announcement.author}`}>
                  {announcement.author}
                </p>
              </div>
              {isAdmin && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" aria-label="관리자 메뉴">
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[6rem]">
                    <Button
                      variant="default"
                      size="sm"
                      className="w-full"
                      aria-label="공지사항 수정하기"
                      onClick={() => setIsEditModalOpen(true)}
                    >
                      수정
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      aria-label="공지사항 삭제하기"
                      onClick={handleDeleteAnnouncement}
                    >
                      삭제
                    </Button>
                  </PopoverContent>
                </Popover>
              )}
            </div>
            <time
              dateTime={announcement.createdAt.toISOString()}
              tabIndex={0}
              className="text-sm"
              aria-label={`작성일: ${formatDateToKoreanTime(announcement.createdAt)}`}
            >
              {formatDateToKoreanTime(announcement.createdAt)}
            </time>
            <div className="mt-2" tabIndex={0} aria-label={`공지사항 내용: ${announcement.details}`}>
              <hr />
              <p className="mt-2 ">{formatContent(announcement.details)}</p>
            </div>
          </article>
        ) : (
          <p role="alert" aria-live="polite">
            공지사항이 없습니다.
          </p>
        )}
        <Dialog aria-labelledby="dialog-title" open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent role="dialog">
            <DialogHeader>
              <DialogTitle id="dialog-title">공지사항 수정</DialogTitle>
              <DialogDescription>공지사항을 수정하세요.</DialogDescription>
            </DialogHeader>
            <label htmlFor="edit-title" className="sr-only">
              제목
            </label>
            <Input
              type="text"
              placeholder="제목"
              value={editAnnouncement.title}
              className="w-full p-2 mb-2 border"
              onChange={(event) =>
                setEditAnnouncement({
                  ...editAnnouncement,
                  title: event.target.value,
                })
              }
            />
            <label htmlFor="edit-details" className="sr-only">
              상세 내용
            </label>
            <textarea
              placeholder="상세 내용"
              value={editAnnouncement.details}
              className="w-full h-[10rem] "
              onChange={(event) =>
                setEditAnnouncement({
                  ...editAnnouncement,
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
              <Button variant="default" size="lg" onClick={handleEditAnnouncement}>
                수정
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </section>
    </main>
  );
};
export default AnnouncementDetailItemPage;
