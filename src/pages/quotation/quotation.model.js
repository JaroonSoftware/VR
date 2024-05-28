import { Button, Popconfirm, Space } from "antd"; 
import "../../assets/styles/banks.css"
// import { Typography } from "antd"; 
// import { Popconfirm, Button } from "antd";
import { Tooltip } from "antd";
// import { EditOutlined, QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons"; 
import dayjs from 'dayjs';
import { DeleteFilled, DeleteOutlined, EditOutlined, PrinterOutlined, QuestionCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";
import { formatCommaNumber } from "../../utils/util";
/** get sample column */
export const accessColumn = ({handleEdit, handleDelete, handleView, handlePrint}) => [
  {
    title: "Quotation Code.",
    key: "quotcode",
    dataIndex: "quotcode",
    align: "left",
    sorter: (a, b) => (a.quotcode).localeCompare(b.quotcode),
    width:140,
  },
  {
    title: "Quotation Date",
    dataIndex: "quotdate",
    key: "quotdate",
    width: 140,
    sorter: (a, b) => (a.quotdate).localeCompare(b.quotdate),
    render: (v) => dayjs(v).format("DD/MM/YYYY"),
  },
  {
    title: "Product",
    dataIndex: "product_name",
    key: "product_name", 
    sorter: (a, b) => (a.quotdate).localeCompare(b.quotdate),
  },
  // {
  //   title: "Customer Code",
  //   dataIndex: "cuscode",
  //   key: "cuscode",
  //   width: 120,
  //   sorter: (a, b) => (a.cuscode).localeCompare(b.cuscode),
  // },
  {
    title: "Customer Name",
    dataIndex: "cusname",
    key: "cusname", 
    sorter: (a, b) => (a.cusname).localeCompare(b.cusname),
    ellipsis: {
      showTitle: false,
    },
    render: (v) => <Tooltip placement="topLeft" title={v}>{v}</Tooltip>, 
  },
  // {
  //   title: "Request By",
  //   dataIndex: "created_name",
  //   key: "created_name", 
  //   width: '15%',
  //   sorter: (a, b) => (a.created_name).localeCompare(b.created_name),
  //   ellipsis: {
  //     showTitle: false,
  //   },
  //   render: (v) => <Tooltip placement="topLeft" title={v}>{v}</Tooltip>, 
  // },
  {
    title: "Action",
    key: "operation", 
    fixed: 'right',
    width: 90,
    render: (text, record) => (
      <Space >
        <Button
          icon={<EditOutlined />} 
          className='bn-primary-outline'
          style={{ cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center'}}
          onClick={(e) => handleEdit(record) }
          size="small"
        />

        <Popconfirm 
          placement="topRight"
          title="Sure to delete?"  
          description="Are you sure to delete this packaging?"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={() => handleDelete(record)}
        >
          <Button
            icon={<DeleteOutlined />}
            danger
            style={{ cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
            size="small"
          />
        </Popconfirm>
        <Button
          icon={<PrinterOutlined />} 
          className='bn-warning-outline'
          style={{ cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center'}}
          onClick={(e) => handlePrint(record) }
          size="small"
        />        
        {/* <ButtonAttachFiles code={record.srcode} refs='Sample Request' showExpire={true} /> */}
      </Space>
    ),
  }, 
];

export const productColumn = ({handleRemove, handleEdit}) => [
  {
    title: "No.",
    key: "id",
    dataIndex: "id",
    align: "left", 
    width:50,
    render: (_,record, index) => (index + 1) 
  },
  {
    title: "Production Description", 
    key: "spname",
    dataIndex: "spname",
    align: "left", 
  },
  {
    title: "Unit/Carton",
    key: "unit_carton",
    dataIndex: "unit_carton",
    align: "right",
    className: "!pe-4", 
    width:'14%',
  },
  {
    title: <>Quantity<br />(Cartion)</>,
    key: "loadingtype_qty",
    dataIndex: "loadingtype_qty",
    align: "right",
    className: "!pe-4", 
    width:'14%',
    render:(v) => formatCommaNumber( Number( v || 0 ))
  }, 
  {
    title: <>Price per carton</>,
    key: "price_per_carton",
    dataIndex: "price_per_carton",
    align: "right",
    className: "!pe-4", 
    width:'14%',
    render:(v) => formatCommaNumber( Number( v || 0 ))
  },
  {
    title: <>Total amount</>,
    key: "total_amount",
    dataIndex: "total_amount",
    align: "right",
    className: "!pe-4", 
    width:'18%',
    render:(v) => formatCommaNumber( Number( v || 0 ))
  },
  {
    title: "Action",
    key: "operation", 
    fixed: 'right',
    width: 120,
    render: (text, record) => (
      <Space >
        <Button
          icon={<EditOutlined />} 
          className='bn-primary-outline'
          style={{ cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center'}}
          onClick={(e) => handleEdit(record) }
          size="small"
        />        
        <Popconfirm 
          placement="topRight"
          title="Sure to delete?"  
          description="Are you sure to delete this packaging?"
          icon={<QuestionCircleFilled style={{ color: 'red' }} />}
          onConfirm={() => handleRemove(record)}
        >
          <Button
            icon={<DeleteFilled />}
            danger
            style={{ cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            size="small"
          />
        </Popconfirm>
      </Space>
    ),
  }  
];

export const description_defualt = [
  { id: 0, detail_name : "Ref"   },
  { id: 1, detail_name : "Packing"   },
  { id: 2, detail_name : "Unit Net wt(gm)"   },
  { id: 3, detail_name : "carton size (WxLxH)"   },
  { id: 4, detail_name : "Gross wt per carton(kg)"   },
  { id: 5, detail_name : "Loading Type & Quantity"   }, 
];

export const quotationForm = {
  quotcode: null,
  quotdate: null,
  cuscode: null,
  cusname: null,
  contact: null,
  address: null,
  tel: null,
  email: null,
  valid_price_until: null,
  payment_condition: null,
  price_terms: 'FOB',
  currency: null,
  rate: null,
  remark: null,
  total_price: 0,
  vat: 7,
  grand_total_price: 0,
  acc_no: null,
  dated_price_until: null,
}

export const quotationDetailForm = {
  id : null,
  quotcode : null,
  spcode : null,
  spname : null,
  estcode : null,
  packingset_id : null,
  packingsetid : null,
  packingset_name : null,
  exworkcost_carton : 0,
  exworksell_price : 0,
  margin : null,
  loadingtype_id : null,
  loadingtype_name : null,
  loadingtype_qty : 0,
  shippingtype_name : null,
  shippingtype_price : 0,
  insurance : null,
  commission : null,
  price : 0,
  total_amount : 0,
  unit_carton : 0,
  qty : 0,
  price_per_carton : 0,
  quotations_list : description_defualt,
}


