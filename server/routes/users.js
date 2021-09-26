const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

const bcrypt = require("bcrypt");

//Update
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id) {
        if(req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
           const updateUser = await User.findByIdAndUpdate(
               req.params.id,
               {
                   $set: req.body,
               },
               { new: true }
           );
           res.status(200).json(updateUser);
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(401).json("Bạn chỉ có thể cập nhật tài khoản của bạn");
    }
});

//Delete
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id) {  
        try {
            const user = await User.findById(req.params.id);
            try {
                await Post.deleteMany({ username: user.username });
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("Người dùng đã được xóa")
             } catch (error) {
                 res.status(500).json(error);
             }
        } catch (error) {
            res.status(404).json("User not found");
        }
    } else {
        res.status(401).json("Bạn chỉ có thể cập nhật tài khoản của bạn");
    }
});

//Get User
router.get("/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router;