import stylecss from "./index.module.scss";
import { useState } from "react";
// 验证码
import React from "react";
import { message } from "antd";
//加密
import { ToAuthCode } from "@/uitls/toPost/toPost";
//redux
import { adduser } from "@/redux/User";
import { useDispatch } from "react-redux";
import { Dl } from "@/uitls/toPost/toPost";

const Showdl = (props: { show: boolean; onshow: any; setdata: any }) => {
  //获取 redux
  const dispatch = useDispatch();
  //获取验证信息
  const { show, onshow, setdata } = props;
  //是否获取验证码的绑定
  let [tf, ontf] = useState(true);
  //手机号的绑定
  let [tel, ontel] = useState("");
  //验证码的绑定
  let [code, oncode] = useState("");
  //倒计时的绑定
  let [num, onnum] = useState(60);
  //用户如果没有获取验证码 则不允许点击登录
  let [yzm, setyzm] = useState(false);

  //成功后执行的代码
  function scuess(val: any) {
    onshow(false);
    setdata(val.user[0]);
    dispatch(adduser(val.user[0]));
    //恢复计时器
    onnum(1);
    //恢复user名字
    ontel("");
  }

  function goin() {
    // 登录逻辑
    //获取 cookie中数据

    if (yzm) {
      // 成功后
      Dl(tel, code, scuess);
    } else {
      message.error("请先获取验证码", 1.5);
    }
  }
  function toTep() {
    if (!tel) {
      // 提示信息  自动关闭时间  回调函数
      message.error("请输入手机号", 1.5);
      return false;
    }
    //发送验证码
    ToAuthCode(tel);
  }
  if (num <= 59) {
    let on = setTimeout(() => {
      if (num == 0) {
        onnum(60);
        ontf(true);
        clearTimeout(on);
      } else {
        onnum(num - 1);
      }
    }, 1000);
  }
  return show ? (
    <>
      <div className={stylecss.box} onClick={() => onshow(false)}>
        <div
          className={stylecss.box_border}
          onClick={(event) => event.stopPropagation()}
        >
          <div className={stylecss.top}>
            <span className={stylecss.left}>登录掘金畅享更多权益</span>
            <span className={stylecss.right} onClick={() => onshow(false)}>
              x
            </span>
          </div>
          <div className={stylecss.center}>
            <div className={stylecss.left}>
              <p>验证码登录</p>
              <input
                className={stylecss.input}
                // 通过onChange完成双向绑定值
                onChange={(e) => ontel(e.target.value)}
                placeholder="请输入手机号"
                type="text"
              />
              <input
                className={stylecss.input}
                type="text"
                onChange={(e) => oncode(e.target.value)}
                placeholder="请输入验证码"
              />
              <div className={stylecss.a}>
                <a
                  style={{ display: tf ? "block" : "none" }}
                  href="#"
                  onClick={() => {
                    setyzm(true);
                    ontf(false);
                    // 获取验证码api
                    toTep();
                    // 倒计时
                    onnum(59);
                  }}
                >
                  获取验证码
                </a>
                <span style={{ display: tf ? "none" : "block" }}>
                  {num + "s"}
                </span>
              </div>

              <button onClick={goin}>登录</button>
            </div>
          </div>

          <div></div>
        </div>
      </div>
    </>
  ) : null;
};
export default Showdl;
