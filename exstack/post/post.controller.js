const Post = require("./post.model");

module.exports = {
    // for visitor; return posts that set as exposed
    getExposedPostByUser: (req, res) => {
        let userId = req.user._id;

        Post.find({ user_id: userId, exposed:true }, (error, posts) => {
            if(error) {
                console.log(error);
            }
            else {
                if(!posts) {
                    res.statusMessage = 'Not Found'
                    res.status(404).send('Not Found');
                }
                else {
                    res.status(200).send({posts: posts});
                }
            }
        });
    },

    // for manage perpose, return every posts
    getAllPostByUser: (req, res) => {
        let userId = req.userId;
    
        Post.find({ user_id: userId}, (error, posts) => {
            if(error) {
                console.log(error);
            }
            else {
                if(!posts) {
                    res.statusMessage = 'Not Found'
                    res.status(404).send('Not Found');
                }
                else {
                    res.status(200).send({posts: posts});
                }
            }
        });
    },

    getPostById: (req, res) => {
        let postId = req.params.postId;

        Post.findById(postId, (error, post) => {
            if(error) {
                console.log(error);
            }
            else {
                if(!post) {
                    res.statusMessage = 'Not Found'
                    res.status(404).send('Not Found');
                }
                else {
                    res.status(200).send({post: post});
                }
            }
        });
    },

    updatePostById: (req, res) => {
        let postData = req.body;
        let userId = req.userId;

        let update = {
            title: postData.title,
            contents: postData.contents,
            exposed: postData.exposed,
            priority: postData.priority,
            updated: new Date()
        }

        // TODO: check if user is owner of this post

        Post.findByIdAndUpdate(postData._id, update, (error, post) => {
            if(error) {
                console.log(error);
            }
            else {
                if(!post) {
                    res.statusMessage = 'Not Found'
                    res.status(404).send('Not Found');
                }
                else {
                    res.status(200).send({post: post});
                }
            }
        });
    },

    newPost: (req, res) => {
        let postData = req.body;
        let userId = req.userId;

        // check if this article.userid, and token is matching
        if(userId.trim() != postData.user_id.trim()) {
            res.statusMessage = 'Unauthorized';
            res.status(401).send('Unauthorized');
        }

        let post = new Post(postData);

        // TODO: In post, created date and updated date is composed in express stack, if there is other way, apply it
        post.created = new Date();
        post.updated = new Date();

        // save user data to mongo db -> use 'save' method
        post.save((error, postedData) => {
            if(error) console.log(error);
            else res.status(200).send(postedData);
        });
    }
}