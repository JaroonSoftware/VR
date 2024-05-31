import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import PageNotFound from "../pages/404";
import PrivateRoute from "../components/auth/PrivateRoutes";
import { DashBoard } from "../pages/dashboard";
import { ROLES } from "../constant/constant";
import { WarehouseRouter } from "./warehouse.router";
import { Users, UsersAccess, UsersManage } from "../pages/users";
import { Items, ItemsAccess, ItemsManage } from "../pages/items";
import { Itemtype, ItemtypeAccess, ItemtypeManage } from "../pages/itemtype";
import {  Unit, UnitAccess, UnitManage } from "../pages/unit";
import {  Customer, CustomerAccess, CustomerManage } from "../pages/customers";
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

          <Route path="/items/" exact element={<Items />}>
            <Route index element={<ItemsAccess />} />
            <Route path="manage/:action" element={<ItemsManage />} />
          </Route>

          <Route path="/itemtype/" exact element={<Itemtype />}>
            <Route index element={<ItemtypeAccess />} />
            <Route path="manage/:action" element={<ItemtypeManage />} />
          </Route>

          <Route path="/unit/" exact element={<Unit />}>
            <Route index element={<UnitAccess />} />
            <Route path="manage/:action" element={<UnitManage />} />
          </Route>


          <Route path="/customers/" exact element={<Customer />}>
            <Route index element={<CustomerAccess />} />
            <Route path="manage/:action" element={<CustomerManage />} />
          </Route>

       
          {WarehouseRouter}
        </Route>

        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
