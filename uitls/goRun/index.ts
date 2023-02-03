import Router from "next/router";
const { push } = Router;
export function goUser() {
  //用户个人主页
  push("/user");
}

export function goIndex() {
  //首页
  push("/user");
}
