import { parn } from "@/db/index";
import { config_session } from "@/config/index";
import { User, New_user, TextLIST } from "@/db/entities/index";
import { withIronSessionApiRoute } from "iron-session/next";
import { getConnection } from "typeorm";
//加密
import md5 from "js-md5";
export default withIronSessionApiRoute(async (res, req) => {
  //拿到 传过来的 手机号 和 cookie 的手机号
  const { to, code, setcode, setto } = res.body;

  //查找是否存在记录
  const db = await parn();

  //连接数据库
  //user表
  const userfind = db.getRepository(User);
  // 信息表
  const message_user = db.getRepository(New_user);
  const textlist = db.getRepository(TextLIST);

  if (
    md5(process.env.NEXT_PUBLIC_PASS + String(to)) == setto &&
    md5(process.env.NEXT_PUBLIC_PASS + String(code)) == setcode
  ) {
    //验证成功
    const users = await message_user.find({ where: { phone: setto } }); //查

    //判断是否存在

    if (users.length == 0) {
      //新用户自动注册
      const user = new User();
      user.username = "会飞的小猪_" + to.slice(8);
      user.avatar = "";
      user.job = "未知";
      user.inter = "此人比较神秘";
      user.phone = setto;
      const new_user = new New_user();
      new_user.userid = user;
      new_user.phone = setto;
      new_user.QQ = setcode;
      // const save = await message_user.save(user);
      const saves = await message_user.save(new_user);
      req.status(200).json({
        code: "ok",
        user: [user],
        text: [],
      });
    } else {
      //改变cookie码
      await getConnection()
        .createQueryBuilder()
        .update(New_user)
        .set({ QQ: setcode })
        .where("phone = :id", { id: setto })
        .execute();
      const us = await userfind.find({ where: { phone: setto } });
      const text = await textlist.find({ where: { userid: us[0].id } });
      req.status(200).json({
        code: "ok",
        user: us,
        text,
      });
    }
  } else {
    req.status(400).json({
      code: "验证失败",
    });
  }
}, config_session);
