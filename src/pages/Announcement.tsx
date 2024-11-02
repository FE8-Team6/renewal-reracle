import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../firebase";
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
import { NavLink } from "react-router-dom";

export const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    details: "",
    author: "",
  });
  const [currentUser, setCurrentUser] = useState<{
    displayName: string;
    uid: string;
  }>({
    displayName: "",
    uid: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const storedUser = userData ? JSON.parse(userData) : null;
    if (storedUser) {
      setCurrentUser(storedUser);
    }
  }, []);

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
          author: currentUser.displayName,
        });
        setEditId(null);
      } else {
        await addDoc(collection(db, "announcements"), {
          ...newAnnouncement,
          createdAt: serverTimestamp(),
          author: currentUser.displayName,
        });
      }
      setNewAnnouncement({ title: "", details: "", author: "" });
      fetchAnnouncements();
      setIsModalOpen(false);
    } catch (error) {
      console.error("공지사항 추가 실패:", error);
    }
  };

  return (
    <>
      <div className="w-full h-[3.75vh] bg-yellow text-purple text-center align-center leading-[3.75vh] text-[2vh]">
        공지사항
      </div>
      <div className="w-[22rem] h-[67vh] relative overflow-y-auto overflow-x-hidden mx-auto my-[1.5vh] rounded-4 ">
        {isAdmin && (
          <div className="fixed bottom-[16vh] left-[50%] transform -translate-x-1/2">
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
          </div>
        )}
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className="my-3 mx-auto w-full h-[6rem] bg-[#fef3c1]  px-3 rounded-4 font-bold text-sm cursor-pointer"
          >
            <NavLink to={`/announcement/${announcement.id}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-base font-semibold">
                    {announcement.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatDateToKoreanTime(announcement.createdAt.toDate())}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{announcement.author}</p>
                </div>
              </div>
            </NavLink>
          </div>
        ))}
      </div>
    </>
  );
};
