const Post = require('../models/post');
//require sulgify to slugify title .. Example My post ==> my-post

const slugify = require('slugify');

exports.create = (req, res) => {
    // console.log(req.body);
    const {title,content,user} = req.body
    const slug = slugify(title);

    //validate

    switch(true){
        case !title:
            return res.status(400).json({error: 'Title is required'});
            break;
            case !content:
                return res.status(400).json({error: 'Content is required'});
                break;           
    }

    //create post
    Post.create({title,content,user,slug}, (err,post)=>{
        if(err){
            console.log(err);
            res.status(400).json({error: 'Duplicate post, Try another title !'});

        }
        res.json(post);
    });
};

exports.list = (req,res)=>{
    Post.find({})
    .limit(5)
    .sort({ createdAt:-1 })
    .exec((err,posts)=>{
        if(err) console.log(err)
        res.json(posts)
    })
}


/*The findOne() function is used to find one document according to the condition. If multiple documents match the condition,
 then it returns the first document satisfying the condition.*/
 
exports.read = (req,res)=>{
    const { slug } = req.params
    Post.findOne({slug})
    .exec((err,post)=>{
        if(err) console.log(err);
        res.json(post);
    });
};

/*The findOneAndUpdate() function is used to find a matching document and update it according to the update arg, passing any options, 
and returns the found document (if any) to the callback.*/ 

exports.update=(req,res)=>{
   const {slug} = req.params;
   const{title,content,user} = req.body
   // {new:true} returns the updatd input
   Post.findOneAndUpdate({slug}, {title,content,user}, {new:true}).exec((err,post)=>{
       if(err) console.log(err)
       res.json(post);
   });
 
};


/*The findOneAndRemove() function is used to find the element according to the
condition and then remove the first matched element*/
exports.remove = (req,res)=>{
    const { slug } = req.params
    Post.findOneAndRemove({slug}).exec((err,post)=>{
        if(err) console.log(err);
        res.json({
            message: 'Post deleted'
        });
    });
};
