import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import styleCss from "./index.module.scss";
import { Button, message } from "antd";
import { toPost } from "@/uitls/toPost/toPost";
import { useSelector } from "react-redux";
import { Userpd } from "@/uitls/toPost/toPost";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

function HomePage() {
  const [value, setValue] = useState("**Hello world!!!**");
  const [title, settitle] = useState("");
  //发布 ---------------
  // 对文章上传的判断
  const User = useSelector((state: any) => {
    return {
      user: state.User.user,
    };
  });
  //获取用户信息，如果不存在返回首页
  Userpd(User);
  function tolink() {
    if (!title) {
      message.error("请输入标题！", 1.5);
    } else if (value.length < 100) {
      message.error("每次发文章字数不可低于100！", 1.5);
    } else {
      //上传的函数
      toPost(value, title);
    }
  }

  function contink(value: string | undefined) {
    setValue(value ?? "");
  }
  return (
    <div className={styleCss.box}>
      <input
        className={styleCss.title}
        value={title}
        onChange={(e) => {
          settitle(e.target.value);
          console.log(title);
        }}
        type="text"
        placeholder="请输入标题"
      />
      <Button
        value="large"
        type="primary"
        className={styleCss.button}
        onClick={() => {
          tolink();
        }}
      >
        发布
      </Button>
      <div className={styleCss.Md}>
        <MDEditor height={500} value={value} onChange={contink} />
      </div>
    </div>
  );
}

(HomePage as any).title = "png"; //设置png属性 根据png属性渲染内容
export default HomePage;
