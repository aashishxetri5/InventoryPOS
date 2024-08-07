const fs = require("fs");
const path = require("path");
const Category = require("../models/Categories");

exports.addCategory = async (req, res) => {
  try {
    var filename;
    if (!req.files) {
      console.log("file not found");
    }

    filename = await this.saveImageToPath(req.files.categoryImage);

    const categoryData = {
      categoryName: req.body.categoryName,
      categoryCode: req.body.categoryCode,
      description: req.body.description,
      categoryImage: `/images/CategoryImages/${filename}`,
    };

    const category = new Category(categoryData);

    category.save();

    return;
  } catch (error) {
    console.error(error);
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return categories;
  } catch (err) {
    console.log(err);
    return;
    //res.status(500).send("Sorry! Something went wrong."); // Send an error message with a 500 Internal Server Error status
  }
};

exports.saveImageToPath = async (itemImage) => {
  const image = itemImage;
  const filename = `${Date.now()}_${itemImage.name}`;

  const imageDirPath = path.join(__dirname, `../public/images/CategoryImages/`);

  const destinationPath = path.join(imageDirPath, filename);

  fs.mkdirSync(imageDirPath, { recursive: true });

  await image.mv(destinationPath);

  return filename;
};
