import type { NextPage } from "next";
import { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "../Footer";
//登录操作
import Showdl from "../Showdl";
import { useDispatch } from "react-redux";
import { ToDr } from "@/uitls/toPost/toPost";
import stylecss from "./style.module.scss";
const Template: NextPage<any> = ({ children }) => {
  //用户信息
  let [userstate, setuserstate] = useState({});
  const [show, endshow] = useState(false);
  const dispatch = useDispatch();
  //首次加载查看用户是否存在cookie 然后做对应操作
  useEffect(() => {
    ToDr(dispatch);
    return () => {};
  }, []);
  return (
    <>
      <Header endshow={endshow} userstate={userstate}></Header>
      <main className={stylecss.box}>{children}</main>
      <Footer></Footer>
      <Showdl show={show} setdata={setuserstate} onshow={endshow}></Showdl>
    </>
  );
};
export default Template;
