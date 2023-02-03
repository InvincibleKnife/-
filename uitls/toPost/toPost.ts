import { getCookises, setCookises } from "@/uitls/cookies/Cookies";
import { bd } from "@/servers/ajax";
import { message } from "antd";
import { adduser } from "@/redux/User";
import md5 from "js-md5";
import { goUser, goIndex } from "@/uitls/goRun";
//y用户状态判断 不对直接跳回首页
export function Userpd(User: any) {
  if (!User.user.username) {
    goIndex();
  }
}
//用户上传文章的函数
export function toPost(value: string, title: string) {
  const { to, code } = getCookises("to", "code");
  bd.post("/api/user/publish", {
    title,
    text: value,
    to: to,
    code: code,
  }).then(
    (val) => {
      message.success("上传成功", 1.5);
      goUser();
    },
    (res) => {
      message.error("上传失败", 1.5);
    }
  );
}
//--登录态验证(session)
export function ToDr(dispatch: (...arg: any[]) => any) {
  //获取cookie
  const { to, code } = getCookises("to", "code");
  if (to && code) {
    //登录模块
    bd.post("/api/user/cookiedl", { to, code }).then(
      (val) => {
        message.success(`欢迎回来 ${val.user.username}`, 1.5);

        val.user.text = val.text;

        dispatch(adduser(val.user));
        return true;
      },
      (err) => message.error("用户凭证已过期", 1.5)
    );
  }
  return false;
}
//登录验证
export function Dl(
  setto: string,
  setcode: string,
  fun: (val: any) => any
): any | boolean {
  const { to, code } = getCookises("to", "code");
  bd.post("api/user/yz", {
    to: setto,
    code: setcode,
    setcode: code,
    setto: to,
  }).then(
    (val) => {
      // 成功后执行的代码
      message.success("登录成功", 1.5);
      val.text = val.text.map((val: any) => val.textid);
      console.log(val.user[0]);
      val.user[0].text = val.text ?? [];
      fun(val);
      return val;
    },
    (err) => {
      message.error(err?.request?.data?.code || "验证码错误", 1.5);
      return false;
    }
  );
}
//短信发送
export function ToAuthCode(tel: string) {
  let u = bd.post("/api/user/gorun", { to: tel }).then(
    (res) => {
      message.success("请查收短信", 1.5);
      let obj = {
        to: md5(process.env.NEXT_PUBLIC_PASS + String(res.to)),
        code: res.code,
      };
      setCookises(obj);
    },
    (err) => {
      message.error("未知错误", 1.5);
    }
  );
}

export function ToLike(userid: string, textid: string) {
  let u = bd.post("/api/like/tolike", { userid, textid }).then((val) => {
    if (val.code == "200") {
      message.success("成功点赞", 1.5);
    } else if (val.code == "201") {
      message.error("成功取消", 1.5);
    } else {
      message.error("未知错误", 1.5);
    }
  });
}
