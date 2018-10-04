const mongoose = require('mongoose');
const {createBlog, blogModel, formatBlog} = require('./schema/blog');
// db url
const url = 'mongodb://blog-admin:Bl0gAdmin@ds119663.mlab.com:19663/blog-db';

//add blog to db
async function add(blogData = false) {
    //connect to db
    await mongoose.connect(url, { useNewUrlParser: true });
    
    const addBlog = () => {
        const Blog = createBlog(blogData);
        return Blog.save().then(response => {                
                mongoose.connection.close();
                return response;
            });
    }
    
    return new Promise(resolve => {
            resolve(addBlog());
        }
    )
}
//remove blog by id from db
async function remove(id) {
    if(id === undefined || !id) {
        console.log('blog id missing, aborting...');
        return;
    }
    //connect to db
    await mongoose.connect(url, { useNewUrlParser: true });

    const removeBlog = (id) => {
        return blogModel().findByIdAndDelete({_id: id}, (err) => {
            mongoose.connection.close();
            if(err) {
                return false;
            }
            return true;
        });
    }

    return new Promise(resolve => {
            resolve(removeBlog(id));
        });
}
//fetch blogs from db
async function fetch() {
    //connect to db
    await mongoose.connect(url, { useNewUrlParser: true });
    
    const fetchBlogs = () => {
        return blogModel().find({}, (err, docs) => {
            mongoose.connection.close();

            if(err) {
                return false;
            }
            let blogs = [];

            docs.forEach(blog => {
                blogs.push(formatBlog(blog));
            })                

            return blogs;
        });
}

    return new Promise(resolve => {
            resolve(fetchBlogs());
        });
}

//update blog to db
async function update(id, data) {
    await mongoose.connect(url, { useNewUrlParser: true });

    const updateBlog = (id, data) => {
        return blogModel().findByIdAndUpdate(id, data, {new: true}, (err, doc) => {
            mongoose.connection.close();

            if(err) {
                return false;
            }

            return formatBlog(doc);
        });
    };

    return new Promise(resolve => {
            resolve(updateBlog(id, data));
        });
}

//update blogs to db TODO: this needs to be implemented
function updateBlogs(blogs) {
    return false;
}


module.exports.add = add;
module.exports.remove = remove;
module.exports.fetch = fetch;
module.exports.update = update;
