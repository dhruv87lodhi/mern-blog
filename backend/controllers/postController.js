// Post controller
import Post from "../models/Post.js";

export const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Please provide title and content",
      });
    }

    const post = await Post.create({
      title,
      content,
      author: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPostById = async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id).populate("author", "name email");

        if(!post) {
          return res.status(404).json({
            success: false,
            message: "post not found",
          })
        }

        res.json({
          success: true,
          post,
        })

    } catch(error) {
      res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

export const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, content } = req.body;

    if(!title || !content) {
      return res.status(400).json({
        success: false,
        message: "please provide title and content",
      })
    }

    const post = await Post.findById(id);
    if(!post) {
      return res.status(404).json({
        success: false,
        message: "post not found",
      })
    }

    if (req.user._id.toString() !== post.author.toString()) {
      return res.status(403).json({
        success: false,
        message: "not authorized to update this post",
      })
    }

    post.title = title;
    post.content = content;
    await post.save();

    res.status(200).json({
      success: true,
      message: "post details updated",
      post,
    })
      
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    
    const post = await Post.findById(id);
    if(!post) {
      return res.status(404).json({
        success: false,
        message: "post not found",
      })
    }

    if(req.user._id.toString() !== post.author.toString()) {
      return res.status(403).json({
        success: false,
        message: "not authorized to delete this post",
      })
    }

    await post.deleteOne();

    res.status(200).json({
      success: true,
      messge: "post deleted successsfully",
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};