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

  const fetchNoteDetail = async () => {
    if (!uuid) return;

    const redirectUuid = localStorage.getItem('redirectUuid');

    // API 요청이 완료되지 않은 상태에서는 실행하지 않음
    if (isMemberLoading || isNickNameLoading) return;

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
        const detail = data.result;
        setNoteData(detail);
      }
    }
  };

  useEffect(() => {
    fetchNoteDetail();
  }, [isMember, isNickName, isMemberLoading, isNickNameLoading, uuid, nav]);

  return (
    <SocketProvider uuid={uuid!}>
      <section className="flex w-[calc(100vw-280px)] h-full">
        <NoteMain initialNoteData={noteData} uuid={uuid!} />
        <NoteAside noteData={noteData} uuid={uuid!} />
      </section>
    </SocketProvider>
  );
};
