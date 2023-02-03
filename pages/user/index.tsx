import { NextPage } from "next";
import { useSelector } from "react-redux";
import { Userpd } from "@/uitls/toPost/toPost";
const Dev: NextPage = () => {
  const User = useSelector((state: any) => {
    return {
      user: state.User.user,
    };
  });
  //获取用户信息，如果不存在返回首页
  Userpd(User);
  return (
    <>
      <div>我是user页面 {User.user.username}</div>
    </>
  );
};
export default Dev;
