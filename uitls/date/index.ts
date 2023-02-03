//复制的轮子 报错就报错 不影响正常使用
export const Format = function (that: any, fmt: string = "yyyy-MM-dd") {
  var o = {
    "M+": that.getMonth() + 1, //月份
    "d+": that.getDate(), //日
    "h+": that.getHours(), //小时
    "m+": that.getMinutes(), //分
    "s+": that.getSeconds(), //秒
  };
  if (/(y+)/.test(fmt)) {
    //根据y的长度来截取年
    fmt = fmt.replace(
      RegExp.$1,
      (that.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  }
  return fmt;
};
// 调用：
// var time1 = new Date().Format("yyyy-MM-dd");
// var time2 = new Date(1469281964000).Format("yyyy-MM-dd hh:mm:ss");
