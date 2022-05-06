import express from "express";
import request from "request";
import requestPromise from "request-promise-native";

const KakaopayRouter = express.Router();
const MY_ADMIN_KEY = "3c39e5a36b74462767fb1ce4fc2e8ba8";
KakaopayRouter.post("/", (req, res) => {
  let headers = {
    Authorization: `KakaoAK ${MY_ADMIN_KEY}`,
    "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
  };
  let options = {
    url: "https://kapi.kakao.com/v1/payment/ready",
    method: "POST",
    headers: headers,
    form: req.body,
  };
  function get_info() {
    return new Promise(function (resolve, reject) {
      request(options, function (error, response, body) {
        if (error) return reject(error);
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  get_info()
    .then(function (val) {
      console.log(val);
      return res.send(val);
    })
    .catch(function (err) {
      console.err(err);
    });
});

export default KakaopayRouter;
