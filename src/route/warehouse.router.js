import React from "react";
import { Route } from "react-router-dom";

import {
  Quotation,
  QuotationAccess,
  QuotationManage,
} from "../pages/quotation";

import { IV, IVAccess, IVManage } from "../pages/iv";

import { Receipt, ReceiptAccess, ReceiptManage } from "../pages/receipt";

export const WarehouseRouter = (
  <>
    <Route path="/quotation/" exact element={<Quotation />}>
      <Route index element={<QuotationAccess />} />
      <Route path="manage/:action" element={<QuotationManage />} />
    </Route>

    <Route path="/iv/" exact element={<IV />}>
      <Route index element={<IVAccess />} />
      <Route path="manage/:action" element={<IVManage />} />
    </Route>

    <Route path="/receipt/" exact element={<Receipt />}>
      <Route index element={<ReceiptAccess />} />
      <Route path="manage/:action" element={<ReceiptManage />} />
    </Route>
  </>
);
