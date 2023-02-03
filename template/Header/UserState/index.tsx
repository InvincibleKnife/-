import style from "./index.module.scss";
import Image from "next/image";
import { TwitterOutlined, DislikeOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCookies } from "@/uitls/cookies/Cookies";
import { removeuser } from "@/redux/User";
import { goUser } from "@/uitls/goRun";
const User = (props: { userstate: any }) => {
  const un = useSelector((state: any) => {
    return {
      user: state.User.user,
    };
  });
  const [show, datashow] = useState(true);

  function datashows() {
    datashow(true);
  }
  //清除凭证
  const us = useDispatch();
  function goofuser() {
    deleteCookies("to", "code");
    us(removeuser({}));
    message.success("成功退出", 1.5);
  }
  //优化 点击事件
  useEffect(() => {
    window.addEventListener("click", datashows);
    return () => {
      window.removeEventListener("click", datashows);
    };
  });

  return (
    <>
      <div
        className={style.borbox}
        onClick={(e) => {
          e.stopPropagation();
          datashow(!show);
        }}
      >
        <div className={style.box}>
          <Image
            src="/img/c4301a9c1d54580be4fb307add4a1966109b04c7fbc2-N69Ir3_fw658.webp"
            alt="me"
            width="36"
            height="36"
          />
        </div>

        <div className={style.e} style={{ display: show ? "none" : "block" }}>
          <div className={style.eTop}>
            <div className={style.box}>
              <Image
                src="/img/c4301a9c1d54580be4fb307add4a1966109b04c7fbc2-N69Ir3_fw658.webp"
                alt="me"
                width="42"
                height="42"
              />
            </div>
            <div className={style.text}>{un.user.username}</div>
          </div>
          <div className={style.eBottom}>
            <div
              onClick={() => {
                goUser();
              }}
            >
              <TwitterOutlined />
              个人首页
            </div>

            <div
              onClick={() => {
                goofuser();
              }}
            >
              <DislikeOutlined />
              退出登录
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default User;
