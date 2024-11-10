import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { RecentSearchHistory } from '@/lib/types/search';
import { deleteSearchHistory, getRecentSearchHistory } from '@/api/searchssApi/recentSearch';
import KakaoAdfit320x100 from '../KakaoAdfit320x100';

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
    <div className="flex flex-col h-[calc(100vh-7rem)]">
      <KakaoAdfit320x100 />
      <section className="flex-grow overflow-y-auto w-[22rem] mx-auto pb-4 mt-2">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg text-purple">프로필</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <img src="/REracle.svg" alt="REracle 대표 아이콘" className="w-12 h-12" />
              <div className="flex flex-col">
                <span>{user.displayName}</span>
                <span className="text-sm text-gray-500">{user.email}</span>
              </div>
            </div>
            <div className="space-y-2">
              <button>
                <span className="text-sm text-gray-500">닉네임 변경</span>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg text-purple">나의 최근 재활용품 검색 목록</CardTitle>
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
                    className="absolute flex items-center justify-center w-4 h-4 text-white transition-opacity rounded-full -top-1 -right-1 bg-purple">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="text-lg text-purple">기타</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <button>
                <span className="text-sm text-gray-500">REracle 개발 과정</span>
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-2 text-center">
          <Button variant="link" onClick={() => navigate('/myquestion')} className="text-sm">
            나의 R지식in 보러가기
          </Button>
        </div>
        <div className="space-y-2 text-center">
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
      </section>
    </div>
  );
};

export default MyPage;
