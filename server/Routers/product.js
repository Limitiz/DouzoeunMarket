import express from "express";

const product = express.Router();

product.get("/", (req, res) => {
  console.log(req.query.page);
  const page = (req.query.page - 1) * 5;

  const sql = `select p.idx, p.title, p.price, p.categoryID, i.imgUrl from product p, productImg i where p.idx=i.idx limit ${page}, 5`;
  DBConnect(sql, res);
});

product.get("/pay", (req, res, next) => {
  const isTrue = req.isAuthenticated();
  console.log(isTrue); //undefined  //true
  const sql = "select * from common where paysort <= 5 order by 3";
  DBConnect(sql, res);
});

// localhost:8000/product/3/man
/**
 * product.get("/:id/:gender", (req, res) => {
    const { id, gender } = req.params;
 * 
 * 
 */

// get("id") -> localhost:8000/product/id로만 접근
product.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await Product.findOne({
    attributes: ["title", "price", "locationX", "locationY", "content"],
    include: [
      {
        model: ProductImg,
        attributes: ["imgUrl"],
        required: true,
      },
      {
        model: Category,
        attributes: ["name"],
        required: true,
      },
      {
        model: Favorite,
        required: false,
      },
    ],
    where: { idx: id },
  });
  res.send(data);
});

product.post("/postid", async (req, res) => {
  console.log(req.body.idx);
  const id = req.body.idx;
  res.send(await createOrDelete(id, 1));
});

async function createOrDelete(pid, uid) {
  const isExist = await Favorite.findOne({ where: { productId: pid } });
  if (!isExist) {
    Favorite.create({
      productId: pid,
      userId: uid,
      imgId: pid,
    });
    return "danger";
  } else {
    Favorite.destroy({ where: { productId: pid } });
    return "secondary";
  }
}

export default product;
