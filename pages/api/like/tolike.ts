import { parn } from "@/db/index";
import { config_session } from "@/config/index";
import { Text, TextLIST } from "@/db/entities/index";
import { withIronSessionApiRoute } from "iron-session/next";
import { getConnection } from "typeorm";

//加密
export default withIronSessionApiRoute(async (res, req) => {
  // //拿到 传过来的 手机号 和 cookie 的手机号
  // const { userid, textid } = res.body;
  // //查找是否存在记录
  // let db = await parn();
  // const textlist = db.getRepository(Text);
  // const likelist = db.getRepository(TextLIST);
  // let like = await likelist.find({ where: { userid, textid } });
  // let text = await textlist.find({ where: { id: textid } });
  // if (like.length != 0) {
  //   await getConnection()
  //     .createQueryBuilder()
  //     .delete()
  //     .from(TextLIST)
  //     .where("id = :id", { id: like[0].id })
  //     .execute();
  //   await getConnection()
  //     .createQueryBuilder()
  //     .update(Text)
  //     .set({ like: text[0].like - 1 })
  //     .where("id = :id", { id: text[0].id })
  //     .execute();
  //   req.status(200).json({
  //     code: 201,
  //   });
  //   return;
  // } else {
  //   let like = new TextLIST();
  //   like.textid = textid;
  //   like.userid = userid;
  //   like.save();
  //   await getConnection()
  //     .createQueryBuilder()
  //     .update(Text)
  //     .set({ like: text[0].like + 1 })
  //     .where("id = :id", { id: text[0].id })
  //     .execute();
  req.status(200).json({
    code: 200,
  });
  return;
  // }
}, config_session);
