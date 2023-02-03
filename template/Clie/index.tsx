import stylecss from "./style.module.scss";
import React, { useEffect, useState } from "react";
import { LikeOutlined } from "@ant-design/icons";
import { Button, Tooltip, Space, Badge, message } from "antd";
import { stateText } from "@/redux/User";
import { useDispatch } from "react-redux";
import { bd } from "@/servers/ajax";
export default function (props: {
  userid: number;
  textid: number;
  dz: number;
  userlike: number[];
}) {
  const dis = useDispatch();
  const { userid, textid, dz, userlike } = props;
  let [likes, setlikes] = useState(false);
  const [zan, setzan] = useState(dz);
  useEffect(() => {
    if (userlike && userlike.indexOf(textid) == -1) {
      setlikes(false);
    } else {
      setlikes(true);
    }
  }, [userid, userlike, textid]);
  useEffect(() => {
    setzan(dz);
  }, [dz]);
  function onclick() {
    if (userid) {
      bd.post("/api/toindex/like", { textid, userid }).then((val) => {
        console.log(val);
        if (val.code === 202) {
          let lists = [...userlike];
          lists.push(textid);
          setlikes(true);
          dis(stateText(lists));
          message.success("已赞！", 1.5);
          let like = zan + 1;
          setzan(like);
        } else if (val.code === 201) {
          let lists = [...userlike];
          lists.splice(lists.indexOf(textid), 1);
          dis(stateText(lists));
          setlikes(false);
          message.success("已取消赞！", 1.5);
          let like = zan - 1;
          console.log(like);
          setzan(like);
        }
      });
    } else {
      message.error("请先登录", 1.5);
    }
  }
  return (
    <>
      <div className={stylecss.box}>
        {likes ? (
          <div
            className={stylecss.u}
            onClick={() => {
              onclick();
            }}
          >
            <Tooltip title="search">
              <Badge count={zan} overflowCount={9999}>
                <Button size="large" shape="circle" icon={<LikeOutlined />} />
              </Badge>
            </Tooltip>
          </div>
        ) : (
          <div
            className={stylecss.r}
            onClick={() => {
              onclick();
            }}
          >
            <Tooltip title="search">
              <Badge count={zan} overflowCount={9999}>
                <Button
                  size="large"
                  type="primary"
                  shape="circle"
                  icon={<LikeOutlined />}
                />
              </Badge>
            </Tooltip>
          </div>
        )}
      </div>
    </>
  );
}
