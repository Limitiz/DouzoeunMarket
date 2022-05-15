import User from "../../models/User.js";

const ImgService = async (req, res) => {
  const { userId } = req.params;
  const image = req.file.filename;
  await User.update({ img: image }, { where: { idx: userId } });
  res.json({ image: image });
};

export default ImgService;
