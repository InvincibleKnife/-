import stylecss from "./style.module.scss";
import { Input, Avatar, Button, message } from "antd";
import Image from "next/image";
import { useState } from "react";
import { bd } from "@/servers/ajax";
import { useSelector } from "react-redux";
export default function (props: { textid: number }) {
  const { textid } = props;
  const { TextArea } = Input;
  const [say, setsay] = useState("");
  const state = useSelector((state: any) => {
    return {
      user: state.User.user,
    };
  });
  const onC = () => {
    if (state.user.id) {
      bd.post("/api/comment", {
        text: say,
        textid,
        userid: state.user.id,
      }).then((val) => {
        console.log(val);
      });
    } else {
      message.error("请先登录");
    }
  };
  return (
    <>
      <div className={stylecss.box}>
        <div className={stylecss.h}>评论</div>
        <div className={stylecss.ebox}>
          <div className={stylecss.leftimg}>
            <div>
              <Avatar
                size={40}
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
          </div>
          <div className={stylecss.righttext}>
            <TextArea
              rows={2}
              placeholder="输入评论 回车换行"
              value={say}
              onChange={(e) => {
                setsay(e.target.value);
              }}
            />
          </div>
        </div>
        <div className={stylecss.ebutton}>
          <Button
            type="primary"
            onClick={() => {
              onC();
            }}
            disabled={!say ? true : false}
          >
            提交
          </Button>
        </div>
      </div>
    </>
  );
}
