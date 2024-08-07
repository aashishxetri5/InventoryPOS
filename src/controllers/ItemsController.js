const Items = require("../models/Items");
const mongoose = require("mongoose");
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
    // res.send("Sorry! Something went wrong.");
  }
};

exports.getItems = async (req, res) => {
  try {
    const items = await Items.find();
    return items;
  } catch (err) {
    console.log(err);
    return;
    //res.status(500).send("Sorry! Something went wrong."); // Send an error message with a 500 Internal Server Error status
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

exports.getItembyId = async (req, res, itemId) => {
  try {
    const itemDetail = await Items.findById(itemId);

    return itemDetail;
  } catch (error) {
    console.error(error);
  }
};

exports.editItem = async (req, res) => {
  try {
    const itemDetail = await Items.findById(req.body.productId);

    if (!itemDetail) {
      console.log("item not found");
      return;
    }

    var filename = itemDetail.itemImage.split("/").pop();

    // Check if a new image file is uploaded
    if (req.files && req.files.itemImage) {
      // Remove the old image
      try {
        await fs.promises.unlink(
          path.join(__dirname, "..", "public", `${itemDetail.itemImage}`)
        );
      } catch (err) {
        console.error(`Error deleting old image `);
      }

      filename = await this.saveImageToPath(req.files.itemImage);
    }

    const finalDataObject = {
      itemname: req.body.itemname,
      category: req.body.category,
      subCategory: req.body.subCategory,
      brand: req.body.brand,
      unit: req.body.unit,
      sku: req.body.sku,
      minimumQty: req.body.minimumQty,
      quantity: req.body.quantity,
      description: req.body.description,
      tax: req.body.tax,
      discount: req.body.discount,
      price: req.body.price,
      status: req.body.status,
      itemImage: `/images/InventoryImages/${filename}`,
    };

    await Items.updateOne(
      { _id: new mongoose.Types.ObjectId(req.body.productId) },
      { $set: finalDataObject }
    );

    res.redirect("/itemlist");
  } catch (error) {
    console.error(error);
  }
};

exports.saveImageToPath = async (itemImage) => {
  const image = itemImage;
  const filename = `${Date.now()}_${itemImage.name}`;

  const imageDirPath = path.join(
    __dirname,
    `../public/images/InventoryImages/`
  );

  const destinationPath = path.join(imageDirPath, filename);

  fs.mkdirSync(imageDirPath, { recursive: true });

  await image.mv(destinationPath);

  return filename;
};
