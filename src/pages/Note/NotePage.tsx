import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { instance } from '@/apis/Instance';
import { FolderBar } from '@/components/FolderBar/FolderBar';
import { NoteMain } from '@/components/Note/NoteMain/NoteMain';
import { NoteAside } from '@/components/Note/NoteAside/NoteAside';

export const NotePage = () => {
  const { uuid } = useParams(); // uuid 값 받아오기
  const nav = useNavigate();

  useEffect(() => {
    if (!uuid) return; // uuid가 없으면 아무 것도 하지 않음
    
    const fetchNoteDetail = async () => {
      try {
        await instance.get(`/notes/detail/${uuid}`);
        // 노트 정상적으로 로드됨 (로그인된 경우)
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response && error.response.status === 401) {
          // 로그인이 안 된 경우 '/'로 리다이렉트 + 로그인 모달 띄우기
          nav(`/?redirect=${uuid}`);
        } else {
          console.error('회원 상태 확인 중 오류 발생:', error);
        }
      }
    };

    fetchNoteDetail();
  }, [uuid, nav]);

  return (
    <>
      <div className="w-screen h-screen flex flex-row bg-bg font-nanum leading-[22px]">
        <FolderBar />
        <div className="flex w-[calc(100vw-280px)] h-full">
          <NoteMain />
          <NoteAside />
        </div>
      </div>
    </>
  );
};
