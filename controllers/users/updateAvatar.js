const {User} = require("../../models");
const path = require ("path");
const fs = require("fs/promises");
const jimp = require("jimp");
const { v4: uuidv4 } = require("uuid"); 

const avatarsDir = path.join(__dirname,"../../", "public","avatars");

const updateAvatar = async(req,res)=>{
    const {path: tempUpload,originalname} = req.file;
    const{_id: id} = req.user;
    const imageName = `${id}_${originalname}+${uuidv4()}`;
try {
    const resultUpload = path.join(avatarsDir,imageName);

    const img = await jimp.read(tempUpload);
    await img
      .autocrop()
      .cover(
        250,
        250,
        jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
      )
      .writeAsync(tempUpload);
      
    await fs.rename(tempUpload,resultUpload);
    const avatarUrl =path.join("public","avatars", imageName);
    await User.findByIdAndUpdate(req.user._id,{avatarUrl});
    res.json({avatarUrl});
} catch(error) {
    await fs.unlink(tempUpload);
    throw error;
    }
};

module.exports = updateAvatar;