import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  doc,
  getDoc,
  deleteDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { formatDateToKoreanTime } from "@/lib/utils/dateKoreanTime";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { MoreHorizontal } from "lucide-react";

const AnnouncementDetailItem = () => {
  const { announcementId } = useParams();
  const [announcement, setAnnouncement] = useState<{
    title: string;
    details: string;
    createdAt: Date;
    author: string;
  }>({
    title: "",
    details: "",
    createdAt: new Date(),
    author: "",
  });
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editAnnouncement, setEditAnnouncement] = useState<{
    title: string;
    details: string;
  }>({
    title: "",
    details: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (user && user.uid === "vzFV5N4PH1VjKNeZoClT83fTibN2") {
        setIsAdmin(true);
      }
    };

    const fetchAnnouncement = async () => {
      if (announcementId) {
        const docRef = doc(db, "announcements", announcementId);
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
        await deleteDoc(doc(db, "announcements", announcementId));
        navigate("/announcement");
      }
    } catch (error) {
      console.error("공지사항 삭제 실패:", error);
    }
  };

  const handleEditAnnouncement = async () => {
    try {
      if (announcementId) {
        await setDoc(doc(db, "announcements", announcementId), {
          ...editAnnouncement,
          createdAt: serverTimestamp(),
          author: announcement.author,
        });
        setIsEditModalOpen(false);
        navigate("/announcement");
      }
    } catch (error) {
      console.error("공지사항 수정 실패:", error);
    }
  };

  return (
    <div className="p-4">
      {announcement ? (
        <>
          <div className="flex items-center justify-between">
            <p className="font-semibold">{announcement.author}</p>
            {isAdmin && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[6rem]">
                  <Button
                    variant="default"
                    size="sm"
                    className="w-full"
                    onClick={() => setIsEditModalOpen(true)}
                  >
                    수정
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full"
                    onClick={handleDeleteAnnouncement}
                  >
                    삭제
                  </Button>
                </PopoverContent>
              </Popover>
            )}
          </div>
          <p className="text-sm">
            {formatDateToKoreanTime(announcement.createdAt)}
          </p>
          <div className="mt-2">
            <p className="text-lg text-center">{announcement.title}</p>
            <p className="mt-2 text-base text-center">{announcement.details}</p>
          </div>
        </>
      ) : (
        <p className="text-black">공지사항이 없습니다.</p>
      )}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>공지사항 수정</DialogTitle>
            <DialogDescription>공지사항을 수정하세요.</DialogDescription>
          </DialogHeader>
          <Input
            type="text"
            placeholder="제목"
            value={editAnnouncement.title}
            className="w-full p-2 mb-2 border"
            onChange={(e) =>
              setEditAnnouncement({
                ...editAnnouncement,
                title: e.target.value,
              })
            }
          />
          <textarea
            placeholder="상세 내용"
            value={editAnnouncement.details}
            className="w-full h-[10rem] "
            onChange={(e) =>
              setEditAnnouncement({
                ...editAnnouncement,
                details: e.target.value,
              })
            }
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary" size="lg">
                닫기
              </Button>
            </DialogClose>
            <Button
              variant="default"
              size="lg"
              onClick={handleEditAnnouncement}
            >
              수정
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AnnouncementDetailItem;
