import { createSlice } from "@reduxjs/toolkit";

const un = createSlice({
  name: "code",
  initialState: {
    code: true,
  },
  reducers: {
    //设置user
    adduser(state, action) {
      //方法 带state 和 action
      state.code = action.payload;
    },
  },
});
export const { adduser } = un.actions; //导出方法
export default un.reducer; //导出时导出reducer 不是导出un这个片段
