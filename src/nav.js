import { FileTextFilled, ReconciliationFilled } from "@ant-design/icons";
import { TbReportMoney } from "react-icons/tb";
import { RiTeamFill } from "react-icons/ri";
import { MdOutlineDashboard } from "react-icons/md";
import { TiThLarge } from "react-icons/ti";
import { GiDatabase } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { RiBox3Fill } from "react-icons/ri";
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
    title: "SELL",
    type: "group",
  },
  {
    title: "ใบเสนอราคา",
    icon: <FileTextFilled className="nav-ico" />,
    to: "/quotation",
  },
  {
    title: "ใบวางบิล",
    icon: <ReconciliationFilled className="nav-ico" />,
    to: "/iv",    
  },
  {
    title: "ใบเสร็จรับเงิน",
    icon: <TbReportMoney className="nav-ico" />,
    to: "/receipt",
  },
  {
    title: "ข้อมูลลูกค้า",
    icon: <RiTeamFill className="nav-ico" />,
    to: "/customers",
  },
  {
    title: "DATA",
    type: "group",
  },
  {
    title: "ข้อมูลสินค้า",
    icon: <GiDatabase className="nav-ico" />,
    to: "/items",
  },
  {
    title: "ประเภทสินค้า",
    icon: <TiThLarge className="nav-ico" />,
    to: "/itemtype",
  },
  {
    title: "หน่วยสินค้า",
    icon: <RiBox3Fill className="nav-ico" />,
    to: "/unit",
  },
  {
    title: "ผู้ใช้งาน",
    icon: <FaUserCircle className="nav-ico" />,
    to: "/users",
  },
  // {
  //   title: "กำลังปรับปรุง",
  //   type: "group",
  // },  
];

export default _nav;
