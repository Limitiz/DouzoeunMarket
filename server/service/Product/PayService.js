import Common from "../../models/Common.js";

const PayService = async (req, res, next) => {
  //항목 리스트 부르기
  //회원정보 부르기
  //상품정보 부르기
  const { id } = req.params;
  const { email } = req.params;
  console.log(id);
  console.log(email);
  const list = await Common.findAll({
    where: {
      paysort: { [Op.lte]: 5 },
    },
    order: [["paysort", "ASC"]],
  });
  req.list = list;
  req.id = id;
  req.email = email;
  next();
};

export default PayService;
