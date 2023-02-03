import { parn } from "@/db/index";
import { Text, User, Usersay } from "@/db/entities";
import { getConnection } from "typeorm";

export default async function (res: any, req: any) {
  const { text, userid, textid } = res.body;
  const db = await parn();
  const texts = db.getRepository(Text);
  const users = db.getRepository(User);
  const user_name = await users.find({ where: { id: userid } });
  const text_name = await texts.find({
    where: { id: textid },
  });
  console.log(text_name);
  if (user_name.length == 1 && text_name.length == 1) {
    const usersay = new Usersay();
    usersay.userid = user_name[0];
    usersay.textid = textid;
    usersay.text = text;
    usersay.save();

    req.status(200).json({
      code: 200,
    });
    return;
  }
  req.status(200).json({
    code: 400,
  });
}
