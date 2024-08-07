const express = require("express");
const router = express.Router();

const itemsController = require("../controllers/ItemsController");
const usersController = require("../controllers/UsersController");

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

module.exports = router;
