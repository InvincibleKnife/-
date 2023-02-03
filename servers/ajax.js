import axios from "axios";
class Ajax {
  constructor(url, headers) {
    this.axios = axios.create({
      baseURL: url,
      timeout: 6000,
      headers: {},
    });
  }
  request(url, data = {}, method = "get") {
    return new Promise((tre, err) => {
      this.axios
        .request({ url, method, data })
        .then((val) => tre(val.data))
        .catch((errs) => err(errs));
    });
  }
  get(url, data = {}) {
    return this.request(url, data);
  }
  post(url, data = {}) {
    return this.request(url, data, "post");
  }
}

export const bd = new Ajax("http://localhost:3000/");
export const mobile = new Ajax(
  "https://uni.apistd.com?accessKeyId=maDcAL4xVHrQtUBsqKZE9KsHJTviZaEkcPLNbPi6jLvu7RvQm&action=sms.message.send",
  {
    "Content-Type": "application/json",
  }
);
