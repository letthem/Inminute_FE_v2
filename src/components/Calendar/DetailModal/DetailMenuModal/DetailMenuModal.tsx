import React, { useEffect, useRef } from 'react';
import editBlack from '@/assets/webps/FolderBar/editBlack.webp';
import deleteBlack from '@/assets/webps/FolderBar/deleteBlack.webp';

interface DetailMenuModalProps {
  onEdit: () => void;
  onDelete: () => void;
  onClose: () => void;
}

export const DetailMenuModal: React.FC<DetailMenuModalProps> = ({ onEdit, onDelete, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // 모달 바깥 클릭 시 닫히도록 처리
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      style={{ boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.25)' }}
      className="absolute top-[15px] right-[-10px] bg-white rounded-[6px] w-[48px] h-[26px] px-1 py-[3px] z-20 flex"
    >
      <div className="w-5 h-5 hover:bg-gray02 rounded-[6px] flex justify-center items-center">
        <img
          src={editBlack}
          alt="edit button"
          onClick={onEdit}
          className="w-3 h-3 cursor-pointer"
        />
      </div>
      <div className="w-5 h-5 hover:bg-gray02 rounded-[6px] flex justify-center items-center">
        <img
          src={deleteBlack}
          alt="delete button"
          onClick={onDelete}
          className="w-3 h-3 cursor-pointer"
        />
      </div>
    </div>
  );
};
