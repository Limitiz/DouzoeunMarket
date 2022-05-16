import User from "../../models/User.js";

const WithDrawService = async (req, res) => {
  const { userId } = req.params;
  const data = await User.destroy({
    where: { idx: userId },
  });
  req.logout();
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.clearCookie("authCookie");
  });
  //res.redirect(process.env.CLIENT_URL_PORT);
};

export default WithDrawService;
