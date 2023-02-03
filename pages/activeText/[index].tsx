import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { bd } from "@/servers/ajax";
import Image from "next/image";
import stylecss from "./index.module.scss";
import { message } from "antd";
import { Avatar } from "antd";
import { Format } from "@/uitls/date";
import Clie from "@/template/Clie";
import { useSelector } from "react-redux";
import Comment from "@/template/Comment";
import Markdown from "markdown-to-jsx";
export default function () {
  const [list, getlist] = useState({
    text: null,
    id: null,
    like: null,
    sumtime: null,
    title: null,
    addtime: null,
    see: null,
    userid: {
      id: null,
      username: null,
    },
  });
  const state = useSelector((state: any) => {
    return {
      user: state.User.user,
    };
  });

  const router = useRouter();
  const [index, getindex] = useState(null);
  if (index != router.query?.index) {
    getindex(router.query.index as any);
  }
  useEffect(() => {
    if (index) {
      bd.post("/api/toindex/details", { index: index }).then((val) => {
        if (val.code === 200) {
          getlist(val.list);
          console.log(val.list);
        } else {
          message.error("文章获取失败", 1.5);
        }
      });
    }

    return () => {};
  }, [index]);
  return (
    <>
      <div className={stylecss.box}>
        <div className={stylecss.h1}>{list?.title}</div>
        <div className={stylecss.h2}>
          <div>
            <Avatar
              size={50}
              icon={
                <Image
                  src="/img/c4301a9c1d54580be4fb307add4a1966109b04c7fbc2-N69Ir3_fw658.webp"
                  width={80}
                  height={80}
                  alt=""
                />
              }
            />
          </div>
          <div>
            <div className={stylecss.textname}>{list.userid?.username}</div>
            <div className={stylecss.textname}>
              {Format(new Date(list.addtime as any))} · 阅读 {list.see}
            </div>

            <div>
              <Markdown>{list.text || ""}</Markdown>
            </div>
          </div>
        </div>
      </div>
      {/* 以下是评论 */}
      <div className={stylecss.box}>
        <Comment textid={index as any}></Comment>
      </div>
      <div className={stylecss.clie}>
        <Clie
          userid={state.user.id as any}
          textid={list.id as any}
          dz={list.like as any}
          userlike={state.user.text as any}
        ></Clie>
      </div>
    </>
  );
}
