import { createSlice } from "@reduxjs/toolkit";

const un = createSlice({
  name: "用户信息",
  initialState: {
    user: {
      text: [],
    },
  },
  reducers: {
    //设置user
    adduser(state, action) {
      //方法 带state 和 action
      state.user = action.payload;
    },
    //清空user
    removeuser(state, action) {
      //方法 带state 和 action
      state.user = {
        text: [],
      };
    },
    stateText(state, action) {
      state.user.text = action.payload;
    },
  },
});
export const { adduser, removeuser, stateText } = un.actions; //导出方法
export default un.reducer; //导出时导出reducer 不是导出un这个片段
