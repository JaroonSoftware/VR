import {
  FileTextFilled,
  FileDoneOutlined, 
  TeamOutlined,
  ReconciliationFilled,
} from "@ant-design/icons";
import { TbReportMoney } from "react-icons/tb";
import { RiTeamFill } from "react-icons/ri";
import { MdOutlineDashboard } from "react-icons/md";
let _nav = [
  {
    title: "MENU",
    type: "group",
  },
  {
    title: "หน้าหลัก",
    icon: <MdOutlineDashboard className="nav-ico" />,
    to: "/dashboard",
  },
  {
    title: "SYSTEM",
    type: "group",
  },
  {
    title: "ใบเสนอราคา",
    icon: <FileTextFilled className="nav-ico" />, 
    to: "/quotation",
  },
  {
    title: "ใบขายสินค้า",
    icon: <ReconciliationFilled className="nav-ico" />, 
    to: "/1",
  },
  {
    title: "ใบเสร็จรับเงิน",
    icon: <TbReportMoney  className="nav-ico"/>, 
    to: "/2",
  },
  {
    title: "DATA",
    type: "group",
  },  
  {
    title: "ข้อมูลสินค้า",
    icon: <FileDoneOutlined className="nav-ico" />,
    to: "/item",
  },
  {
    title: "ประเภทสินค้า",
    icon: <FileDoneOutlined className="nav-ico" />,
    to: "/typeitem",
  },
  {
    title: "ข้อมูลลูกค้า",
    icon: <RiTeamFill className="nav-ico" />,
    to: "/4",
  },
  {
    title: "ผู้ใช้งาน",
    icon: <TeamOutlined className="nav-ico" />,
    to: "/users",
  },

];

export default _nav;
