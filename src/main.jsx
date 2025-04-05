import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SnackbarProvider
      maxSnack={2}
      autoHideDuration={2000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Provider store={store}>
        <App />
      </Provider>
    </SnackbarProvider>
  </BrowserRouter>
);
