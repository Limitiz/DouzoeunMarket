import request from "request";

const MY_ADMIN_KEY = process.env.KAKAO_MY_ADMIN_KEY;

const KakaopayService = (req, res) => {
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
};
export default KakaopayService;
