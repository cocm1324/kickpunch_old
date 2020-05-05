const Post = require("./post.model");
const common = require("../../common");

module.exports = {
    // for visitor; return posts that set as exposed
    getBlogPost: (req, res) => {
        const {_id} = req.data.user;
        
        Post.find({ user_id: _id, exposed: true }, (error, posts) => {
            if(error) {
                common.errorMessage(res, 500, error);
                return;
            }
            if(!posts) {
                common.errorMessage(res, 404);
                return;
            }

            const response = posts.map(post => {
                return {
                    id: post._id,
                    title: post.title,
                    contents: post.contents,
                    exposed: post.exposed,
                    priority: post.priority,
                    userId: post.user_id,
                    created: post.created,
                    updated: post.updated
                }
            });

            res.status(200).send({
                RESULT: posts.length,
                response: response
            }); 
        });
    },

    getManagerPost: (req, res) => {
        const {_id} = req.data.user;
    
        Post.find({ user_id: _id }, (error, posts) => {
            if(error) {
                common.errorMessage(res, 500, error);
                return;
            }
            if(!posts) {
                common.errorMessage(res, 404);
                return;
            }
            const postList = posts.map(post => {
                const postMap = {
                    id: post._id,
                    title: post.title,
                    created: post.created,
                    updated: post.updated,
                    contents: post.contents.replace(/[|&;$%@"<>()+,_]/g, "").substr(0, 200) + "...",
                    userId: post.user_id,
                    exposed: post.exposed,
                    priority: post.priority
                };

                return postMap;
            });

            res.status(200).send({
                RESULT: posts.length,
                response: postList
            });
        });
    },

    createPost: (req, res) => {
        const {title, contents, exposed, priority} = req.body;
        const {verifiedUserId} = req.data;

        const data = {
            user_id: verifiedUserId,
            title: title,
            contents: contents,
            exposed: exposed,
            priority: priority,
            created: new Date(),
            updated: new Date()
        }

        const post = new Post(data);

        post.save((error, postedData) => {
            if(error) {
                common.errorMessage(res, 500, error);
                return;
            }
            
            res.status(200).send({
                RESULT: 1,
                response: postedData
            });
        });
    },

    getPostById: (req, res, next) => {
        const {post_id} = req.params;
        
        if (!req.data) {
            req.data = {};
        } else {
            if (req.data.post) {
                common.errorMessage(res, 500, 'Request data field already has post field');
                return;
            }
        }
        Post.findById(post_id, (error, post) => {
            if(error) {
                common.errorMessage(res, 401);
                return;
            }
            if(!post) {
                common.errorMessage(res, 404);
                return;
            }
            req.data['post'] = post;
            next();
        });
    },

    updatePostById: (req, res) => {
        const {id, title, contents, exposed, priority} = req.body
        const {verifiedUserId} = req.data;

        if(!id) {
            common.errorMessage(res, 401);
            return;
        }

        const request = {
            title: title,
            contents: contents,
            exposed: exposed,
            priority: priority,
            updated: new Date()
        }

        Post.findByIdAndUpdate(id, request, (error, post) => {
            const {user_id} = post;
        
            if (user_id != verifiedUserId){
                common.errorMessage(res, 403);
                return;
            }
            if (error) {
                common.errorMessage(res, 500, error);
                return;
            }
            if (!post) {
                common.errorMessage(res, 404);
                return;
            }
            res.status(200).send({
                RESULT: 1,
                response: "updated"
            });
        });
    },

    deletePostById: (req, res) => {
        const {verifiedUserId, post} = req.data;

        if(verifiedUserId != post.user_id) {
            common.errorMessage(res, 403);
            return;
        }

        Post.deleteOne({_id: post._id}, (error) => {
            if (error) {
                common.errorMessage(res, 500, error);
                return;
            }
            res.status(200).send({
                RESULT: 1,
                response: "ok"
            });
        });
    }
}