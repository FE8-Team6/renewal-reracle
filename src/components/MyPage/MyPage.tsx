// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Button } from '../ui/button';
// import { Input } from '../ui/input';
// import { MdAlternateEmail, MdOutlineDriveFileRenameOutline } from 'react-icons/md';

// import { X } from 'lucide-react';
// import { RecentSearchHistory } from '@/lib/types/search';
// import { deleteSearchHistory, getRecentSearchHistory } from '@/api/searchssApi/recentSearch';

// const MyPage = () => {
//   const [user, setUser] = useState<{ displayName: string; email: string }>({
//     displayName: '',
//     email: '',
//   });
//   const [recentSearchHistory, setRecentSearchHistory] = useState<RecentSearchHistory>([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const userData = localStorage.getItem('userData');
//     const storedUser = userData ? JSON.parse(userData) : null;
//     if (storedUser) {
//       setUser(storedUser);
//       fetchRecentSearchHistory(storedUser.uid);
//     }
//   }, []);

//   const fetchRecentSearchHistory = async (uid: string) => {
//     const history = await getRecentSearchHistory(uid);
//     setRecentSearchHistory(history);
//   };

//   const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUser((user) => ({ ...user, displayName: event.target!.value }));
//   };

//   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setUser((user) => ({ ...user, email: event.target!.value }));
//   };

//   const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     event.preventDefault();
//     localStorage.setItem('userData', JSON.stringify(user));
//     alert('회원정보가 수정되었습니다');
//   };

//   const handleNavClick = (categoryId: string, itemId: string) => {
//     navigate(`/category/${categoryId}/item/${itemId}`);
//   };

//   const handleDeleteClick = async (docId: string) => {
//     await deleteSearchHistory(docId);
//     const userData = localStorage.getItem('userData');
//     if (userData) {
//       const { uid } = JSON.parse(userData);
//       fetchRecentSearchHistory(uid);
//     }
//   };

//   return (
//     <section className="w-full h-[75vh] bg-white relative flex flex-col items-center gap-[2vh] overflow-y-auto">
//       <div className="mt-4">
//         <div className="w-full h-[5rem] relative">
//           <label htmlFor="displayName" className="text-lg font-bold text-purple">
//             닉네임
//           </label>
//           <MdOutlineDriveFileRenameOutline className="absolute text-xl left-3 top-10 text-purple" />
//           <Input
//             id="displayName"
//             type="text"
//             value={user.displayName}
//             onChange={handleNameChange}
//             placeholder="닉네임을 입력해주세요"
//             className="w-full h-[2.5rem] text-xl bg-transparent focus:outline-none focus:shadow-none pl-10"
//           />
//         </div>
//         <div className="w-full h-[5rem] relative">
//           <label htmlFor="email" className="text-lg font-bold text-purple">
//             이메일
//           </label>
//           <MdAlternateEmail className="absolute text-xl left-3 top-10 text-purple" />
//           <Input
//             id="email"
//             type="email"
//             value={user.email}
//             onChange={handleEmailChange}
//             placeholder="이메일을 입력해주세요"
//             className="w-full h-[2.5rem] text-xl bg-transparent focus:outline-none focus:shadow-none pl-10"
//             readOnly
//           />
//         </div>
//       </div>
//       <Button variant="default" type="submit" size="default" onClick={handleClick}>
//         회원정보 수정
//       </Button>
//       <Button
//         variant="secondary"
//         size="default"
//         onClick={() => {
//           localStorage.removeItem('userData');
//           navigate('/login');
//         }}>
//         로그아웃
//       </Button>
//       <Button variant="link" size="sm" onClick={() => navigate('/myquestion')}>
//         <h2> 나의 R지식in 보러가기</h2>
//       </Button>
//       <div className="w-full h-[1px] mt-2 mb-1 bg-purple" />
//       <div className="w-[23rem]">
//         <span className="ml-2 text-lg font-bold text-purple">나의 최근 재활용품 검색 리스트</span>
//         <ul className="flex flex-wrap w-full h-auto gap-4 py-2 mx-auto">
//           {recentSearchHistory.map((historyItem) => (
//             <li
//               key={historyItem.id}
//               className="relative p-[1vh] bg-yellow text-purple cursor-pointer text-center text-lg font-bold rounded-4 hover:text-purpleDark">
//               <span onClick={() => handleNavClick(historyItem.categoryId, historyItem.itemId)}>
//                 {`#${historyItem.query}`}
//               </span>
//               <X
//                 className="absolute top-0 right-0 w-4 h-4 cursor-pointer"
//                 onClick={() => handleDeleteClick(historyItem.id)}
//               />
//             </li>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// };

// export default MyPage;

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { RecentSearchHistory } from '@/lib/types/search';
import { deleteSearchHistory, getRecentSearchHistory } from '@/api/searchssApi/recentSearch';

const MyPage = () => {
  const [user, setUser] = useState<{ displayName: string; email: string }>({
    displayName: '',
    email: '',
  });
  const [recentSearchHistory, setRecentSearchHistory] = useState<RecentSearchHistory>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const storedUser = userData ? JSON.parse(userData) : null;
    if (storedUser) {
      setUser(storedUser);
      fetchRecentSearchHistory(storedUser.uid);
    }
  }, []);

  const fetchRecentSearchHistory = async (uid: string) => {
    const history = await getRecentSearchHistory(uid);
    setRecentSearchHistory(history);
  };

  const handleNavClick = (categoryId: string, itemId: string) => {
    navigate(`/category/${categoryId}/item/${itemId}`);
  };

  const handleDeleteClick = async (docId: string) => {
    await deleteSearchHistory(docId);
    const userData = localStorage.getItem('userData');
    if (userData) {
      const { uid } = JSON.parse(userData);
      fetchRecentSearchHistory(uid);
    }
  };

  return (
    <div className="w-full h-[75vh] p-4 space-y-4 overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">프로필</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <img src="/REracle.svg" alt="REracle 대표 아이콘" className="w-12 h-12" />
            <div className="flex flex-col">
              <span>{user.displayName}</span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">나의 최근 재활용품 검색 리스트</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {recentSearchHistory.map((historyItem) => (
              <div key={historyItem.id} className="relative px-3 py-1 rounded-full bg-yellow group">
                <span
                  className="cursor-pointer text-purple hover:text-purpleDark"
                  onClick={() => handleNavClick(historyItem.categoryId, historyItem.itemId)}>
                  #{historyItem.query}
                </span>
                <button
                  onClick={() => handleDeleteClick(historyItem.id)}
                  className="absolute flex items-center justify-center w-4 h-4 text-white transition-opacity rounded-full opacity-0 -top-1 -right-1 bg-purple group-hover:opacity-100">
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">기타</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <button>
              <span className="text-sm text-gray-500 ">REracle 개발 과정</span>
            </button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2 text-center">
        <Button variant="link" onClick={() => navigate('/myquestion')} className="text-sm">
          나의 R지식in 보러가기
        </Button>
      </div>

      <Button
        variant="secondary"
        className="w-full text-white bg-blue-400 hover:bg-blue-500"
        onClick={() => {
          localStorage.removeItem('userData');
          navigate('/login');
        }}>
        로그아웃
      </Button>
    </div>
  );
};

export default MyPage;
