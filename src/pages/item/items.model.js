import { Badge, Space } from "antd";
import { Button } from "antd";
// import { PrinterOutlined, QuestionCircleOutlined, DeleteOutlined } from "@ant-design/icons"; 
import { EditOutlined } from "@ant-design/icons"; 
// import dayjs from 'dayjs';

export const accessColumn = ({handleEdit, handleDelete, handleView}) => [
    {
      title: "รหัสสินค้า",
      key: "stcode",
      dataIndex: "stcode",
      align: "left",
      width: 110,
      sorter: (a, b) => (a?.cuscode || "").localeCompare(b?.cuscode || ""),
    },
    {
      title: "ชื่อสินค้า",
      dataIndex: "stname",
      key: "stname",
      width: '40%',
      sorter: (a, b) => (a?.cusname || "").localeCompare(b?.cusname || ""),
    },
    // {
    //   title: "",
    //   dataIndex: "",
    //   key: "",
    //   width: '28%', 
    //   sorter: (a, b) => (a?.idno || "").localeCompare(b?.idno || ""),
    //   render: (_, head) => (
    //   <Typography.Text> 
    //     {head.idno && `${head.idno}` } 
    //     {head.road && ` ${head.road}` } 
    //     {head.subdistrict && ` ${head.subdistrict}` } 
    //     {head.district && ` ${head.district}` }  
    //     {head.province && ` ${head.province}` } 
    //     {head.zipcode && ` ${head.zipcode}` } 
    //     {head.tel && ` ${head.tel}` }
    //   </Typography.Text>
    //   )
    // },
    {
      title: "ประเภทสินค้า",
      dataIndex: "typecode",
      key: "typecode",
      sorter: (a, b) => (a?.country || "").localeCompare(b?.country || ""),
      width: 140, 
    },
    {
      title: "สถานะ",
      dataIndex: "status",
      key: "status",
      width: 120,
      sorter: (a, b) => (a?.status || "").localeCompare(b?.status || ""),
      render: (data) => (
        <div>
          {data === "Y" ? <Badge status="success" text="เปิดการใช้งาน" /> : <Badge status="error" text="ปิดการใช้การ" />}
        </div>
      ),
    },
    {
      title: "Action",
      key: "operation",
      width: '60px',
      fixed: 'right',
      render: (text, record) => (
        <Space > 
          <Button
            icon={<EditOutlined />} 
            className='bn-primary-outline'
            style={{ cursor: "pointer", display: 'flex', alignItems: 'center', justifyContent: 'center'}}
            onClick={(e) => handleEdit(record) }
            size="small"
          />
        </Space>
      ),
    },    
]; 

export const Items = {
    id: null,
    cuscode: null,
    cusname: null,
    prename: null,
    idno: null,
    road: null,
    subdistrict: null,
    district: null,
    province: null,
    zipcode: null,
    country: null,
    delidno: null,
    delroad: null,
    delsubdistrict: null,
    deldistrict: null,
    delprovince: null,
    delzipcode: null,
    delcountry: null,
    tel: null,
    fax: null,
    taxnumber: null,
    email: null,
    status: "Y",
}