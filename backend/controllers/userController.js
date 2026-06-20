// User controller
import User from "../models/User.js";
import Post from "../models/Post.js"

export const getUserProfile = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateUserProfile = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Please provide name and email",
            });
        }

        const existingUser = await User.findOne({ email });

        if (
            existingUser &&
            existingUser._id.toString() !== req.user._id.toString()
        ) {
            return res.status(400).json({
                success: false,
                message: "Email already in use",
            });
        }

        const user = await User.findById(req.user._id);

        user.name = name;
        user.email = email;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user._id })
            .populate("author", "name email")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: posts.length,
            posts,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};