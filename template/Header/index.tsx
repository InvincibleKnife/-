import { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { Ref } from "./ref";
import stylecss from "./index.module.scss";
import { useRouter } from "next/router";
import HederButton from "./HeaderButton";
import { Button } from "antd";
import User from "./UserState";
import { useSelector } from "react-redux";

const Header: NextPage<any> = (porps: { endshow: any; userstate: any }) => {
  const { pathname } = useRouter();
  const { endshow, userstate } = porps;
  //查看用户信息
  const un = useSelector((state: any) => {
    return {
      user: state.User.user,
    };
  });
  return (
    <>
      <div className={stylecss.headerTop}>
        <div className={stylecss.left}>
          <Image
            src="/img/e08da34488b114bd4c665ba2fa520a31.svg"
            alt="me"
            width="100"
            priority
            height="60"
          />
        </div>
        <div className={stylecss.center}>
          {Ref?.map((val) => (
            <Link href={val.value} key={val.label}>
              <div
                className={
                  stylecss.ae + " " + (pathname == val.value ? stylecss.as : "")
                }
              >
                {val.label}
              </div>
            </Link>
          ))}
        </div>
        <div className={stylecss.right}>
          <HederButton></HederButton>
          {un.user?.username ? (
            <User userstate={userstate}></User>
          ) : (
            <Button className={stylecss.button} onClick={() => endshow(true)}>
              登录
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
