import { UserIcon } from '@/components/UI/UserIcon';
import { Link, Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <>
      <div className="bg-main-bg h-[100vh] flex items-center flex-col">
        <div className=" px-8 md:px-16 py-8 flex justify-between w-full">
          <Link to={'/'} className="text-main md:text-3xl md:tracking-[4rem]">
            QUIZ
          </Link>
          <UserIcon />
        </div>
        <Outlet />
      </div>
    </>
  );
};
