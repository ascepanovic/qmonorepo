export type MenuItemProps = {
  title: string;
  onClick: () => void;
};

export const MenuItem = ({ title, onClick }: MenuItemProps) => {
  return (
    <button
      className="rounded-lg px-16 py-10  text-2xl uppercase shadow-[0_0_0_1px_#2AE78B] transition-all ease-in-out hover:text-main hover:shadow-[0_0_0_5px_#2AE78B]"
      onClick={onClick}
    >
      {title}
    </button>
  );
};
