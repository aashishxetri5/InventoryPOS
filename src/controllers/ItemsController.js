const { parseFileName } = require("express-fileupload/lib/utilities");
const Items = require("../models/Items");
const fs = require("fs");
const path = require("path");

exports.addItems = async (req, res) => {
  try {
    const {
      itemname,
      category,
      subCategory,
      brand,
      unit,
      sku,
      minimumQty,
      quantity,
      description,
      tax,
      discount,
      price,
      status,
    } = req.body;

    const image = req.files.itemImage;
    const filename = `${Date.now()}_${req.files.itemImage.name}`;

    const imageDirPath = path.join(
      __dirname,
      `../public/images/InventoryImages/`
    );

    const destinationPath = path.join(imageDirPath, filename);

    fs.mkdirSync(imageDirPath, { recursive: true });

    await image.mv(destinationPath);

    const finalDataObject = {
      itemname,
      category,
      subCategory,
      brand,
      unit,
      sku,
      minimumQty,
      quantity,
      description,
      tax,
      discount,
      price,
      status,
      itemImage: `/images/InventoryImages/${filename}`,
    };

    const item = new Items(finalDataObject);

    await item.save();

    res.redirect("/additem");
  } catch (err) {
    console.log(err);
    res.send("Sorry! Something went wrong.");
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Items.find();
    return items;
  } catch (err) {
    console.log(err);
    res.send("Sorry! Something went wrong.");
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const idForItemToDelete = req.params.id;

    const itemToDelete = await Items.findByIdAndDelete(idForItemToDelete);

    await fs.promises.unlink(
      path.join(__dirname, "..", "public", `${itemToDelete.itemImage}`)
    );

    return;
  } catch (err) {
    console.log(err);
    return;
  }
};
