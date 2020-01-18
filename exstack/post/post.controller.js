const Post = require("./post.model");

module.exports = {
    // for visitor; return posts that set as exposed
    getExposedPostByUser: (req, res) => {
        let userId = req.userId;

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

    createPost: (req, res) => {
        let postData = req.body;
        let userData = req.userId;
        let post = new Post(postData);

        post.user_id = userData;
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