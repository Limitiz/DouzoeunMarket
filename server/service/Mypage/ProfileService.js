import User from "../../models/User.js";

const ProfileService = async (req, res) => {
  const { userId } = req.params;
  const data = await User.findOne({
    attributes: ["img", "nickName", "rate"],
    where: { idx: userId },
  });
  res.send(data);
};
export default ProfileService;
