const Post = require("./post.model");

module.exports = {
    posts: (req, res) => {
        let posts = [
            {"id": "65ef12", "title": "Test title", "contents": "# test contents", "exposed": false, "priority": "57"},
            {"id": "3adf31", "title": "for testing", "contents": "Heelooo there,\n\n- aqiegjiw\n- qgewijgi\n\nqweigjijiqg\n\nqwegjiji", "exposed": true, "priority": "20"},
            {"id": "720112", "title": "Are we Testing?", "contents": "_**what is this?**_", "exposed": false, "priority": "20"}
        ]
    
        res.json(posts);
    },

    posts1: (req, res) => {
        let posts = [
            {"title": "for testing", "contents": "Heelooo there,\n\n- aqiegjiw\n- qgewijgi\n\nqweigjijiqg\n\nqwegjiji", "exposed": true, "priority": "20"}
        ]
    
        res.json(posts);
    },

    create: (req, res) => {
        let postData = req.body;
        let post = new Post(postData);
    
        // save user data to mongo db -> use 'save' method
        post.save((error, postedData) => {
            if(error) console.log(error);
            else res.status(200).send(postedData);
        });
    }
}