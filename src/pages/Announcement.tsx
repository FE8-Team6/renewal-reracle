import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  Timestamp,
  query,
  orderBy,
  doc,
  deleteDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { GoPencil } from "react-icons/go";
import { formatDateToKoreanTime } from "@/lib/utils/dateKoreanTime";

const TopicItem = ({
  date,
  title,
  details,
  onDelete,
  onEdit,
}: {
  date: string;
  title: string;
  details: string;
  onDelete?: () => void;
  onEdit?: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`my-[1.5vh] mx-auto w-[23rem] ${
        isExpanded
          ? "h-auto bg-[#9747ff] text-white"
          : "h-[5.75vh] bg-[#fef3c1] text-black "
      } rounded-xl text-center pt-4 font-bold text-sm cursor-pointer  transition-all duration-300 ease-in-out overflow-hidden`}
      onClick={handleToggle}
    >
      {date} 점검 예정입니다.
      {isExpanded && (
        <div>
          <h3>{title}</h3>
          <p>{details}</p>
          {onDelete && <Button onClick={onDelete}>삭제</Button>}
          {onEdit && <Button onClick={onEdit}>수정</Button>}
        </div>
      )}
    </div>
  );
};

export const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    details: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      const user = auth.currentUser;
      if (user && user.uid === "vzFV5N4PH1VjKNeZoClT83fTibN2") {
        setIsAdmin(true);
      }
    };

    checkAdmin();
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    const queryOrderBy = query(
      collection(db, "announcements"),
      orderBy("createdAt", "desc")
    );
    const querySnapshot = await getDocs(queryOrderBy);
    const announcementList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAnnouncements(announcementList);
  };

  const handleAddAnnouncement = async () => {
    if (
      newAnnouncement.title.trim() === "" ||
      newAnnouncement.details.trim() === ""
    ) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }
    try {
      if (editId) {
        await setDoc(doc(db, "announcements", editId), {
          ...newAnnouncement,
          createdAt: serverTimestamp(),
        });
        setEditId(null);
      } else {
        await addDoc(collection(db, "announcements"), {
          ...newAnnouncement,
          createdAt: serverTimestamp(),
        });
      }
      setNewAnnouncement({ title: "", details: "" });
      fetchAnnouncements();
      setIsModalOpen(false);
    } catch (error) {
      console.error("공지사항 추가 실패:", error);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await deleteDoc(doc(db, "announcements", id));
      fetchAnnouncements();
    } catch (error) {
      console.error("공지사항 삭제 실패:", error);
    }
  };

  const handleEditAnnouncement = (announcement: any) => {
    setNewAnnouncement({
      title: announcement.title,
      details: announcement.details,
    });
    setEditId(announcement.id);
    setIsModalOpen(true);
  };

  return (
    <Layout>
      <div className="w-full h-[3.75vh] bg-[#fcd118] text-[#9747ff] text-center align-center leading-[3.75vh] text-[2vh]">
        공지사항
      </div>
      <div className="w-[22rem] h-[67vh] relative overflow-y-auto overflow-x-hidden mx-auto my-[1.5vh] rounded-4 ">
        {isAdmin && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <button className=" border bg-purple p-2 rounded-10">
                <GoPencil className="w-5 h-5 text-white" />
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>공지사항</DialogTitle>
                <DialogDescription>
                  새로운 공지사항을 작성하세요.
                </DialogDescription>
              </DialogHeader>
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
                className="w-full h-[10rem] "
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
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
                  onClick={handleAddAnnouncement}
                >
                  {editId ? "수정" : "추가"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        {announcements.map((announcement) => (
          <TopicItem
            key={announcement.id}
            date={formatDateToKoreanTime(announcement.createdAt.toDate())}
            title={announcement.title}
            details={announcement.details}
            onDelete={
              isAdmin
                ? () => handleDeleteAnnouncement(announcement.id)
                : undefined
            }
            onEdit={
              isAdmin ? () => handleEditAnnouncement(announcement) : undefined
            }
          />
        ))}
      </div>
    </Layout>
  );
};
