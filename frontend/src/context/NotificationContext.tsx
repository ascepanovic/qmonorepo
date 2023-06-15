import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { BiErrorCircle } from "react-icons/bi";

type NotificationContextType = {
  notify: (message: string) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

type NotificationContextProps = {
  children: ReactNode;
};

export const useNotificationContext = () => {
  const notificationContext = useContext(NotificationContext);

  if (!notificationContext) {
    throw new Error(
      "useNotificationContext has to be used within <NotificationContext.Provider>",
    );
  }

  return notificationContext;
};

export const NotificationProvider = ({
  children,
}: NotificationContextProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [show, setShow] = useState(false);
  const notify = useCallback((message: string) => {
    setMessages((prev) => [message, ...prev]);
    setShow(true);
    setTimeout(() => {
      setMessages((prev) => prev.slice(0, -1));
    }, 5000);
  }, []);

  const value = useMemo(
    () => ({
      notify,
    }),
    [notify],
  );

  return (
    <NotificationContext.Provider value={value}>
      <div className="fixed left-1/2 top-8 flex -translate-x-1/2 flex-col gap-2">
        {messages.map((message, id) => (
          <div
            key={message + `${id}` + `${Date()}`}
            className={`flex
          items-center justify-center gap-2 rounded-md border-2 border-[red] bg-main-bg px-4 py-2 text-xs text-[red] transition-opacity ${
            show ? "opacity-100" : "opacity-0"
          }`}
          >
            <BiErrorCircle className="h-6 w-6" />
            <span>{message}</span>
          </div>
        ))}
      </div>
      {children}
    </NotificationContext.Provider>
  );
};
