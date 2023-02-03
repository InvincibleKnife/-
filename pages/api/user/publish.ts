import { parn } from "@/db/index";
import { config_session } from "@/config/index";
import { User, New_user, Text } from "@/db/entities/index";
import { withIronSessionApiRoute } from "iron-session/next";
import { getConnection } from "typeorm";
//加密
import md5 from "js-md5";
export default withIronSessionApiRoute(async (res, req) => {
  const { to, code, title, text } = res.body;

  //查找是否存在记录
  const db = await parn();

  //连接数据库
  //user表
  const userfind = db.getRepository(User);
  // 信息表
  const message_user = db.getRepository(New_user);
  const Texts = db.getRepository(Text);
  const us = await userfind.find({ where: { phone: to } });
  const muser = await message_user.find({ where: { phone: to, QQ: code } });
  if (us.length == 1 && muser.length == 1) {
    //新建文章
    const texts = new Text();
    texts.title = title;
    texts.text = text;
    texts.userid = us[0];
    texts.addtime = new Date();
    texts.sumtime = new Date();
    const saves = await Texts.save(texts);
    req.status(200).json({
      code: "ok",
    });
  } else {
    req.status(400).json({
      code: "发布失败",
    });
  }
}, config_session);
