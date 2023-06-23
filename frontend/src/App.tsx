import { useEffect } from "react";

import { socket } from "./lib/socket";
import { AppProvider } from "./providers";
import { AppRoutes } from "./routes";

function App() {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
