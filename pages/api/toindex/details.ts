import { parn } from "@/db/index";
import { Text, TextLIST } from "@/db/entities/index";
export default async function toindex(req: any, res: any) {
  const { index } = req.body;
  const db = await parn();
  const userfind = db.getRepository(Text);
  const list = await userfind.find({
    where: { id: index },
    relations: ["userid"],
  });
  if (list.length > 0) {
    res.status(200).json({
      code: 200,
      list: list[0],
    });
    return;
  } else {
    res.status(200).json({
      code: 404,
      list: [],
    });
    return;
  }
}
