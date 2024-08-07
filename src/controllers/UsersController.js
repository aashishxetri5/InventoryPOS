const crypto = require("crypto");
const Users = require("../models/Users");

const fs = require("fs");
const path = require("path");

exports.addUser = async (req, res) => {
  try {
    const { cpassword, ...body } = req.body;

    const { username, email, password, mobileNumber, role } = body;

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    if (req.files !== null) {
      const image = req.files.profilePicture;
      const filename = `${Date.now()}_${req.files.profilePicture.name}`;

      const imageDirPath = path.join(__dirname, `../public/images/userImages/`);
      const destinationPath = path.join(imageDirPath, filename);

      fs.mkdirSync(imageDirPath, { recursive: true });
      await image.mv(destinationPath);

      const finalizedUserData = {
        username,
        email,
        password: hash,
        mobileNumber,
        role,
        profilePicture: `/images/userImages/${filename}`,
      };

      const user = new Users(finalizedUserData);

      await user.save();
    }

    return;
  } catch (error) {
    console.error(error);
    return;
  }
};

exports.authorizeUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Users.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(401).redirect("/login");
    }

    const hash = crypto.createHash("sha256").update(password).digest("hex");

    if (hash === user.password) {
      res.redirect("/main");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error(error);
  }
};
