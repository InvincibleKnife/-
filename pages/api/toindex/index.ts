import { parn } from "@/db/index";
import { Text, TextLIST } from "@/db/entities/index";
import { getConnection } from "typeorm";

export default async function toindex(req: any, res: any) {
  const db = await parn();
  const userfind = db.getRepository(Text);
  const listu = await userfind.find({ relations: ["userid"] });
  if (listu.length >= 0) {
    res.status(200).json({
      code: 200,
      list: listu,
    });
    return;
  }
  res.status(200).json({
    code: 404,
    list: [],
  });
}
