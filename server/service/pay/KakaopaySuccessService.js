import Order from "../../models/Order.js";
import Product from "../../models/Product.js";

const KakaopaySuccessService = async (req, res) => {
  const token = req.body.token;
  const pid = req.body.id;
  const uid = req.body.userId;
  if (token) {
    await Product.update(
      {
        status: "Y",
      },
      {
        where: { idx: pid },
      }
    );
    await Order.create({
      productId: pid,
      buyer: uid,
    });
  }
};
export default KakaopaySuccessService;
