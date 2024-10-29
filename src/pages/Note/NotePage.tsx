import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMemberStatus, useNickNameStatus } from '@/apis/Member/hooks';
import { getNoteDetail } from '@/apis/Note/getNote';
import { SocketProvider } from '@/context/SocketContext';
import { NoteMain } from '@/components/Note/NoteMain/NoteMain';
import { NoteAside } from '@/components/Note/NoteAside/NoteAside';
import { LoginModal } from '@/components/Login/LoginModal/LoginModal';
import { JoinModal } from '@/components/Login/JoinModal/JoinModal';
import { NoteDetail } from '@/pages/Note/dto';

export const NotePage = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const nav = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  const { data: isMember } = useMemberStatus();
  const { data: isNickName } = useNickNameStatus();
  const [noteData, setNoteData] = useState<NoteDetail | null>(null);

  useEffect(() => {
    const fetchNoteDetail = async () => {
      if (!uuid) return;

      const redirectUuid = localStorage.getItem('redirectUuid');

      // 회원이 아니라면
      if (!isMember) {
        localStorage.setItem('redirectUuid', uuid);
        nav('/');
        setIsLoginModalOpen(true);
        return;
      }

      // 닉네임이 없다면
      if (isMember && !isNickName) {
        localStorage.setItem('redirectUuid', uuid);
        nav('/');
        setIsJoinModalOpen(true);
        return;
      }

      // 회원 + 닉네임이 있다면
      if (isMember && isNickName) {
        if (redirectUuid) {
          nav(`/note/${redirectUuid}`);
          localStorage.removeItem('redirectUuid');
        } else {
          const data = await getNoteDetail(uuid);
          const detail = data.result;
          setNoteData(detail);
        }
      }
    };
    fetchNoteDetail();
  }, [isMember, isNickName, uuid, nav]);

  return (
    <SocketProvider uuid={uuid!}>
      <section className="flex w-[calc(100vw-280px)] h-full">
        <NoteMain noteData={noteData} uuid={uuid!}/>
        <NoteAside noteData={noteData} uuid={uuid!}/>
      </section>

      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} />}
      {isJoinModalOpen && <JoinModal onClose={() => setIsJoinModalOpen(false)} />}
    </SocketProvider>
  );
};
