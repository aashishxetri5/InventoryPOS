const express = require("express");
const router = express.Router();

const itemsController = require("../controllers/ItemsController");
const usersController = require("../controllers/UsersController");
const categoriesController = require("../controllers/CategoriesController");

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/main", (req, res) => {
  res.render("main");
});

router.get("/additem", (req, res) => {
  res.render("additem");
});

router.post("/additem", async (req, res) => {
  itemsController.addItems(req, res);
});

router.get("/itemlist", async (req, res) => {
  try {
    const inventoryItemsPromise = itemsController.getItems();
    const items = await inventoryItemsPromise;

    res.render("itemlist", { items });
  } catch (error) {
    console.log(error);
  }
});

router.get("/deleteitem/:id", async (req, res) => {
  await itemsController.deleteItem(req, res);

  res.redirect("/itemlist");
});

router.get("/item-details", (req, res) => {
  res.render("itemDetails");
});

router.get("/newuser", (req, res) => {
  res.render("newUser");
});

router.post("/newuser", async (req, res) => {
  await usersController.addUser(req, res);

  res.redirect("/newuser");
});

router.post("/login", async (req, res) => {
  await usersController.authorizeUserLogin(req, res);
});

router.get("/edititem/:id", async (req, res) => {
  try {
    const itemDetailsPromise = itemsController.getItembyId(
      req,
      res,
      req.params.id.trim()
    );
    const itemDetail = await itemDetailsPromise;
    res.render("editItem", { itemDetail });
  } catch (error) {}
});

router.post("/edititem", async (req, res) => {
  try {
    await itemsController.editItem(req, res);
  } catch (error) {}
});

router.get("/categorylist", async (req, res) => {
  try {
    const CategoriesPromise = categoriesController.getCategories();
    const categories = await CategoriesPromise;

    res.render("categoryList", { categories });
  } catch (error) {
    console.log(error);
  }
});

router.get("/addcategory", (req, res) => {
  res.render("addCategory");
});

router.post("/addcategory", async (req, res) => {
  await categoriesController.addCategory(req, res);

  res.redirect("/categorylist");
});
module.exports = router;
