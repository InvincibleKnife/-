import { withIronSessionApiRoute } from "iron-session/next";
import { config_session } from "@/config/index";
import md5 from "js-md5";

function codes() {
  return Math.floor(Math.random() * 999) + 1000;
}
export default withIronSessionApiRoute(async (res, req) => {
  //验证码生成函数,理论上应该在验证中生成这个函数，但是库不太会用，暂时放在这，回头优化
  const { to } = res.body;
  const code = codes();
  console.log(code);
  const code_md = md5(process.env.NEXT_PUBLIC_PASS + String(code));
  req.status(200).json({
    to: to,
    code: code_md,
  });
}, config_session);
