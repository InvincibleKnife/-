import { bd } from "@/servers/ajax";
import Listindex from "@/template/IndexList";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import classstyle from "./index.module.scss";
const app = (props: { muser: any[] }) => {
  const { muser } = props;
  const state = useSelector((state: any) => {
    return {
      user: state.User.user,
    };
  });
  //渲染首页的请求
  const [list, getlist] = useState([]);
  useEffect(() => {
    bd.post("/api/toindex").then((val) => {
      getlist(val.list);
    });
  }, []);

  return (
    <div className={classstyle.box}>
      <div className={classstyle.lbox}>
        {list.map((val, index) => {
          return <Listindex key={index} list={val} user={state.user} />;
        })}
      </div>
    </div>
  );
};

export default app;
