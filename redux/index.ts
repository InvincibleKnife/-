import { configureStore } from "@reduxjs/toolkit";
import User from "./User"; //导入模块1
export const redux = configureStore({
  reducer: { User }, //设置模块User
});
