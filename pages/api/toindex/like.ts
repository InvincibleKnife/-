import { parn } from "@/db/index";
import { Text, TextLIST } from "@/db/entities/index";
import { getConnection } from "typeorm";

export default async function toindex(req: any, res: any) {
  const db = await parn();
  const { textid, userid } = req.body;
  const userfind = db.getRepository(Text);
  const findUserRoot = db.getRepository(TextLIST);
  let list = await findUserRoot.find({ where: { textid, userid } });
  let listText = await userfind.find({ where: { id: textid } });
  let like = listText[0].like;
  if (list.length > 0) {
    //删除
    let id = list[0].id;
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(TextLIST)
      .where("id = :id", { id: id })
      .execute();
    //更新
    await getConnection()
      .createQueryBuilder()
      .update(Text)
      .set({ like: like - 1 })
      .where("id = :id", { id: textid })
      .execute();
    res.status(200).json({
      code: 201,
    });
    return;
  } else {
    //添加
    let Textlist = new TextLIST();
    Textlist.userid = userid;
    Textlist.textid = textid;
    Textlist.save();
    //更新
    await getConnection()
      .createQueryBuilder()
      .update(Text)
      .set({ like: like + 1 })
      .where("id = :id", { id: textid })
      .execute();
    res.status(200).json({
      code: 202,
    });
    return;
  }
}
