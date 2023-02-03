import { getConnection } from "typeorm";
import { parn } from "@/db/index";
import { User, New_user, TextLIST } from "@/db/entities/index";
export default async function (res: any, req: any) {
  const { to, code } = res.body;
  const db = await parn(); //连接数据库
  const userfind = db.getRepository(User);
  const message_user = db.getRepository(New_user);
  const textlist = db.getRepository(TextLIST);
  const users = await message_user.find({ where: { phone: to, QQ: code } });

  if (users.length > 0) {
    const user = await userfind.find({ where: { phone: to } });
    let text = await textlist.find({ where: { userid: user[0].id } });
    let newtext = text.map((val) => val.textid);
    req.status(200).json({
      code: "ok",
      user: user[0],
      text: newtext,
    });
    return 1;
  }
  req.status(400).json({
    code: 404,
  });
}
