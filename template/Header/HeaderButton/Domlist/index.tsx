import { message } from "antd";
import { useSelector } from "react-redux";
export default (props: { text: string; router: any; url: string }) => {
  const un = useSelector((state: any) => {
    return {
      user: state.User.user,
    };
  });
  return (
    <div
      onClick={() => {
        if (un.user?.username) {
          props.router.push(props.url);
        } else {
          message.error("请先登录", 1.5);
        }
      }}
    >
      {props.text}
    </div>
  );
};
