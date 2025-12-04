import { createRoot } from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createTheme, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { BrowserRouter } from "react-router-dom";

export const queryClient = new QueryClient();
const theme = createTheme({
  components: {
    Container: {
      defaultProps: {
        size: 1320,
      },
    },
  },
});


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <App />
        <Notifications />
      </MantineProvider>
    </QueryClientProvider>
  </BrowserRouter>
);
