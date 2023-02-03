import { getCookie } from "cookies-next";
import { deleteCookie, setCookie } from "cookies-next";
type obj = {
  [key: string]: string;
};
type args = {
  [key: string]: string;
};

export const setCookises = (arg: args) => {
  for (let i in arg) {
    setCookie(i as string, arg[i] as string);
  }
  return "ok";
};
export const getCookises = (...arg: string[]) => {
  let obj: obj = {};
  for (let i in arg) {
    obj[arg[i]] = getCookie(arg[i]) as string;
  }
  return obj;
};

export const deleteCookies = (...args: string[]) => {
  for (let i in args) {
    console.log();
    deleteCookie(args[i]);
  }
};
