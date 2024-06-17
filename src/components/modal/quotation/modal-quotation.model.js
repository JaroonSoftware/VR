import { Typography } from "antd";


/** get items column */
export const customersColumn = ({handleChoose})=>{
    const Link = Typography.Link;
    return [
      {
        title: "รหัสใบเสนอราคา",
        key: "qtcode",
        width: "20%",
        dataIndex: "qtcode", 
        render: (v, record) => <Link className="text-select" onClick={()=>handleChoose(record)}>{v}</Link>
      },
      {
        title: "รหัสลูกค้า",
        key: "cuscode",
        width: "20%",
        dataIndex: "cuscode", 
        render: (v, record) => <Link className="text-select" onClick={()=>handleChoose(record)}>{v}</Link>
      },
      {
        title: "ชื่อลูกค้า",
        dataIndex: "cusname",
        width: "60%",
        key: "cusname",
        render: (v, record) => <Link className="text-select" onClick={()=>handleChoose(record)}> {v}</Link>
      } 
    ]
  };