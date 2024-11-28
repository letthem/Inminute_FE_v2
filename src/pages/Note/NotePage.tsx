import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemberStatus, useNickNameStatus } from '@/apis/Member/hooks';
import { getNoteDetail } from '@/apis/Note/getNote';
import { SocketProvider } from '@/context/SocketContext';
import { NoteMain } from '@/components/Note/NoteMain/NoteMain';
import { NoteAside } from '@/components/Note/NoteAside/NoteAside';
import { NoteDetail } from '@/pages/Note/dto';

export const NotePage = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const nav = useNavigate();

  const { data: isMember, isLoading: isMemberLoading } = useMemberStatus();
  const { data: isNickName, isLoading: isNickNameLoading } = useNickNameStatus();
  const [noteData, setNoteData] = useState<NoteDetail | null>(null);
  const [isAsideVisible, setIsAsideVisible] = useState(false); // Aside 표시 상태

  const handleMeetingStart = () => {
    setIsAsideVisible(true); // 회의 시작 시 Aside 기본 열림
  };
  
  const fetchNoteDetail = async () => {
    if (!uuid || isMemberLoading || isNickNameLoading) return; // 로딩 중이거나 uuid 없으면 중단

    const redirectUuid = localStorage.getItem('redirectUuid');

    // 회원이 아니라면
    if (!isMember) {
      localStorage.setItem('redirectUuid', uuid);
      nav('/login');
      return;
    }

    // 닉네임이 없다면
    if (isMember && !isNickName) {
      localStorage.setItem('redirectUuid', uuid);
      nav('/join');
      return;
    }

    // 회원 + 닉네임이 있다면
    if (isMember && isNickName) {
      if (redirectUuid) {
        nav(`/note/${redirectUuid}`);
        localStorage.removeItem('redirectUuid');
      } else {
        const data = await getNoteDetail(uuid);
        setNoteData(data.result);
      }
    }
  };

  useEffect(() => {
    fetchNoteDetail();
  }, [isMember, isNickName, isMemberLoading, isNickNameLoading, uuid, nav]);

  return (
    <SocketProvider uuid={uuid!}>
      <section className="flex w-[calc(100vw-280px)] h-full">
        <NoteMain initialNoteData={noteData} uuid={uuid!} onMeetingStart={handleMeetingStart} />
        <NoteAside
          noteData={noteData}
          uuid={uuid!}
          isAsideVisible={isAsideVisible}
          setIsAsideVisible={setIsAsideVisible}
        />
      </section>
    </SocketProvider>
  );
};
