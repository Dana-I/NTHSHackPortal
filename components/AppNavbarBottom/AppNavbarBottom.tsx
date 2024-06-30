import FilePlusIcon from '@/public/icons/file-plus.svg';
import CalendarIcon from '@/public/icons/calendar.svg';
import TrophyIcon from '@/public/icons/trophy.svg';
import QuestionIcon from '@/public/icons/question.svg';
import AdminIcon from '@/public/icons/admin.svg';
import clsx from 'clsx';

export default function AppNavbarBottom() {
  return (
    <div
      className={clsx(
        'fixed z-[1000] bottom-2 left-1/2 -translate-x-1/2',
        'flex md:hidden gap-4 bg-[rgba(0,0,0,0.70)]',
        'p-4 rounded-xl',
      )}
    >
      <FilePlusIcon />
      <CalendarIcon />
      <TrophyIcon />
      <QuestionIcon />
      <AdminIcon />
    </div>
  );
}
