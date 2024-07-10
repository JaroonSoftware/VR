import React from 'react'
import { Route } from 'react-router-dom'

import { QuoPrintPreview,ReceiptPrintPreview } from '../components/print'


export const PrintRouter = (<>
  <Route path="/quo-print/:code/:print?" element={<QuoPrintPreview />} />
  <Route path="/receipt/:code/:print?" element={<ReceiptPrintPreview />} />
</>)
