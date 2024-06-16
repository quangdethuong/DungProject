import ReactDOM from "react-dom/client";
//style
import "./assets/styles.scss";
import reportWebVitals from "./reportWebVitals";
import {
  unstable_HistoryRouter as HistoryBrowser,
  Routes,
  Route,
} from "react-router-dom";
import { history } from "./utils/config";
import HomeTemplate from "./templates/HomeTemplate";
import HomeStaff from "./pages/Staff/HomeStaff";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  <HistoryBrowser history={history}>
    <Routes>
      <Route path="" element={<HomeTemplate />}>
        <Route index element={<HomeStaff />}></Route>
      </Route>
    </Routes>
  </HistoryBrowser>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
