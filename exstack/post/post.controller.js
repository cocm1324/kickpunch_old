const Post = require("./post.model");

module.exports = {
    // for visitor; return posts that set as exposed
    getExposedPostByUser: (req, res) => {
        let user_data = req.user_data;
        
        Post.find({ user_id: user_data._id, exposed: true }, (error, posts) => {
            if(error) {
                console.log(error);
            }
            else {
                if(!posts) {
                    res.statusMessage = 'Not Found'
                    res.status(404).send('Not Found');
                }
                else {
                    res.status(200).send(posts);
                }
            }
        });
    },

    // for manage perpose, return every posts
    getAllPostByUser: (req, res) => {
        let user_data = req.user_data;
    
        Post.find({ user_id: user_data._id }, (error, posts) => {
            if(error) {
                console.log(error);
            }
            else {
                if(!posts) {
                    res.statusMessage = 'Not Found'
                    res.status(404).send('Not Found');
                }
                else {
                    res.status(200).send(posts);
                }
            }
        });
    },

    createPost: (req, res) => {
        let postData = req.body;
        let userId = req.userId;
        postData.user_id = userId;

        let post = new Post(postData);

        // TODO: In post, created date and updated date is composed in express stack, if there is other way, apply it
        post.created = new Date();
        post.updated = new Date();
        post.user_id = userId;

        // save user data to mongo db -> use 'save' method
        post.save((error, postedData) => {
            if(error) {
                console.log("this is error", error);
            }
            else {
                res.status(200).send(postedData);
            }
        });
    },

    getPostById: (req, res, next) => {
        let post_id = req.params.post_id;
        
        req.post_data = {
            post: null
        }

        Post.findById(post_id, (error, post) => {
            if(error) {
                res.statusMessage = 'Invalid Request'
                return res.status(400).send('Invalid Request');
            }
            else {
                if(!post) {
                    res.statusMessage = 'Not Found'
                    return res.status(404).send('Not Found');
                }
                else {
                    req.post_data.post = post
                }
                next();
            }
        });
    },

    updatePostById: (req, res) => {
        let postId = req.body._id;
        let postData = req.body;
        let userId = req.userId;

        if(!postId) {
            
            res.statusMessage = "Invalid Request"
            return res.status(401).send("Invalid Request");
        }

        let update = {
            title: postData.title,
            contents: postData.contents,
            exposed: postData.exposed,
            priority: postData.priority,
            updated: new Date()
        }

        Post.findByIdAndUpdate(postId, update, (error, post) => {
            //it seems 'post' here returns old post

            //checking if right user is requesting its' own post
            if(post.user_id != userId){
                res.statusMessage = 'Unauthorized';
                return res.status(403).send('Unauthorized');;
            }
            
            if(error) {
                console.log(error);
            }
            else {
                if(!post) {
                    res.statusMessage = 'Not Found';
                    return res.status(404).send('Not Found');
                }
                else {
                    res.status(200).send("Success");
                }
            }
        });
    },

    deletePostById: (req, res) => {
        let token_user_id = req.userId;
        let post_data = req.post_data.post;

        if(token_user_id != post_data.user_id) {
            res.statusMessage = "Unauthorized";
            return res.status(403).send("Unauthorized");
        }

        Post.deleteOne({_id: post_data._id}, (err) => {
            if(err) return res.status(500).send();
        });

        res.status(200).send({message: "success"});
    }
}