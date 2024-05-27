import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import PageNotFound from "../pages/404";
import PrivateRoute from "../components/auth/PrivateRoutes";
import { DashBoard } from "../pages/dashboard";
import { ROLES } from "../constant/constant";
import { Users, UsersAccess, UsersManage } from "../pages/users";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />

        <Route
          element={<PrivateRoute allowdRole={[ROLES.ADMIN, ROLES.USER]} />}
        >
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route element={<PrivateRoute allowdRole={[ROLES.ADMIN]} />}>
          <Route path="/users/" exact element={<Users />}>
            <Route index element={<UsersAccess />} />
            <Route path="manage/:action" element={<UsersManage />} />
          </Route>
        </Route>

        {/* <Route element={<PrivateRoute allowdRole={[ROLES.ADMIN, ROLES.USER]} layout={LAYOUT.ALOND} />}>
              <Route path="/coa-print/:code/:print?" element={<CoaPrintPreview />} />
              <Route path="/loi-print/:code/:print?" element={<LoiPrintPreview />} />
              <Route path="/dln-print/:code/:print?" element={<DlnPrintPreview />} />
              <Route path="/quo-print/:code/:print?" element={<QuoPrintPreview />} />
              <Route path="/spt-print/:code/:print?" element={<SptPrintPreview />} />
              <Route path="/est-print/:code/:print?" element={<EstPrintPreview />} />
            </Route> */}

        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
