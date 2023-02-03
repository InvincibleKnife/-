import Link from "next/link";
import stylecss from "./index.module.scss";
import { markdownToTxt } from "markdown-to-txt";
import { formatDistanceToNow } from "date-fns";
import { FireOutlined, LikeOutlined, MessageOutlined } from "@ant-design/icons";
import { stop_e } from "@/uitls/dom";
import { message } from "antd";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { bd } from "@/servers/ajax";
import { stateText } from "@/redux/User";
export default (props: any) => {
  const dis = useDispatch();
  const { list, user } = props;

  const [liste, uselist] = useState(false);
  useEffect(() => {
    if (user.id) {
      let ber = user.text.indexOf(list.id) != -1;
      uselist(ber);
    } else {
      uselist(false);
    }
  }, [user]);
  function givelike(event: any) {
    //阻止默认行为
    stop_e(event);

    if (user.id) {
      bd.post("/api/toindex/like", { textid: list.id, userid: user.id }).then(
        (val) => {
          if (val.code === 202) {
            let lists = [...user.text];
            lists.push(list.id);
            uselist(true);
            dis(stateText(lists));
            list.like++;
            message.success("已赞！", 1.5);
          } else if (val.code === 201) {
            let lists = [...user.text];
            lists.splice(lists.indexOf(list.id), 1);
            dis(stateText(lists));
            uselist(false);
            list.like--;
            message.success("已取消赞！", 1.5);
          }
        }
      );
    } else {
      message.error("请先登录", 1.5);
    }
  }
  return (
    <Link href={`/activeText/${list.id}`}>
      {/* //标题 */}
      <div className={stylecss.box}>
        <div className={stylecss.top}>
          <div>{list.userid.username}</div>
          <div> {formatDistanceToNow(new Date(list.addtime))}</div>
        </div>
        <div className={stylecss.h1}>{list.title}</div>
        <div className={stylecss.m}>{markdownToTxt(list.text)}</div>
        <div className={stylecss.t}>
          <div>
            <FireOutlined />
            {list.see}
          </div>
          <div
            className={stylecss.us}
            style={{ color: liste ? "#007fff" : "" }}
            onClick={(e) => {
              givelike(e);
            }}
          >
            <LikeOutlined />
            {list.like}
          </div>
          <div>
            <MessageOutlined />
          </div>
        </div>
      </div>
    </Link>
  );
};
