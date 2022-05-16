import User from "../../models/User.js";
const PayService2 = async (req, res, next) => {
  const user = await User.findOne({
    where: { email: req.email },
  });
  req.user = user;
  next();
};
export default PayService2;
