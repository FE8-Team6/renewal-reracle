import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';
import { RecentSearchHistory } from '@/types/search';
import { deleteSearchHistory, getRecentSearchHistory } from '@/apis/searchssApi/recentSearch';
import { KakaoAdfit320x50 } from '@/components/KakaoAdfit';

const MyPage = () => {
  const [user, setUser] = useState<{ displayName: string; email: string }>({
    displayName: '',
    email: '',
  });
  const [recentSearchHistory, setRecentSearchHistory] = useState<RecentSearchHistory>([]);
  const [cardWidth, setCardWidth] = useState('w-[24rem]');
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

  useEffect(() => {
    const updateCardWidth = () => {
      if (window.innerWidth <= 395) {
        setCardWidth('w-[21rem]');
      } else {
        setCardWidth('w-[24rem]');
      }
    };

    updateCardWidth();
    window.addEventListener('resize', updateCardWidth);

    return () => window.removeEventListener('resize', updateCardWidth);
  }, []);

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
    <main className="flex flex-col min-h-[calc(100vh-8rem)] pb-[5rem]" aria-label="마이 페이지">
      <KakaoAdfit320x50 />
      <div className="flex-grow w-full h-full pb-4 mx-auto mt-2 overflow-y-auto">
        <div className="flex flex-col items-center space-y-4">
          <section
            className={`${cardWidth} mb-4`}
            aria-labelledby="profile-title"
            tabIndex={0}
            aria-label="프로필 정보"
          >
            <Card>
              <CardHeader>
                <CardTitle id="profile-title" className="text-lg text-purple">
                  프로필
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <img src="/REracle.svg" alt="REracle 대표 아이콘" className="w-12 h-12" />
                  <div className="flex flex-col">
                    <span aria-label={`사용자 이름: ${user.displayName}`} tabIndex={0}>
                      {user.displayName}
                    </span>
                    <span className="text-sm text-gray-500" tabIndex={0} aria-label={`이메일: ${user.email}`}>
                      {user.email}
                    </span>
                  </div>
                </div>
                <nav className="mt-4" aria-label="프로필 메뉴">
                  <button
                    onClick={() => navigate('/pwreset')}
                    type="button"
                    className="text-gray-500 hover:underline"
                    aria-label="비밀번호 변경하기"
                  >
                    <span className="text-sm font-medium text-gray-500">비밀번호 변경</span>
                  </button>
                </nav>
                <div className="mt-4">
                  <button
                    onClick={() => navigate('/myquestion')}
                    type="button"
                    className="mt-4 text-sm text-gray-500 hover:underline"
                    aria-label="나의 R지식in 페이지로 이동"
                  >
                    <span className="font-medium text-gray-500">나의 R지식in 보러가기</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </section>

          <section className={`${cardWidth} mb-4`} aria-labelledby="search-history-title">
            <Card>
              <CardHeader>
                <CardTitle id="search-history-title" className="text-lg text-purple">
                  나의 최근 재활용품 검색 목록
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2" role="list" aria-label="최근 검색 항목">
                  {recentSearchHistory.map((historyItem) => (
                    <div
                      key={historyItem.id}
                      className="relative px-3 py-1 rounded-full bg-yellow group"
                      role="listitem"
                    >
                      <button
                        type="button"
                        className="cursor-pointer text-purple hover:text-purpleDark"
                        onClick={() => handleNavClick(historyItem.categoryId, historyItem.itemId)}
                        aria-label={`${historyItem.query} 검색 결과로 이동`}
                      >
                        #{historyItem.query}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteClick(historyItem.id)}
                        className="absolute flex items-center justify-center w-4 h-4 text-white transition-opacity rounded-full -top-1 -right-1 bg-purple-500"
                        aria-label={`${historyItem.query} 검색 기록 삭제`}
                      >
                        <X size={12} aria-hidden="true" />
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <section className={`${cardWidth} mb-4`} aria-labelledby="etc-title">
            <Card>
              <CardHeader>
                <CardTitle id="etc-title" className="text-lg text-purple">
                  기타
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <button type="button" className="text-gray-500 hover:underline" aria-label="REracle 개발 과정 보기">
                    <span className="text-sm font-medium text-gray-500">REracle 개발 과정</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          </section>

          <div className={`space-y-2 text-center ${cardWidth}`}>
            <Button
              variant="secondary"
              className="w-full text-white bg-purple hover:bg-purpleDark"
              onClick={() => {
                localStorage.removeItem('userData');
                navigate('/login');
              }}
              aria-label="로그아웃하기"
            >
              로그아웃
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MyPage;
