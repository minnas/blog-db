const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    title: String,
    description: String,
    updated: Date
});
const Blog = mongoose.model('Blog', blogSchema);

function blogModel() {
    return Blog;
}
function createBlog(data = {}) {
    return new Blog({
        title: data.title,
        description: data.description,
        updated: new Date()
    });
}
//format blog data
function formatBlog(blog) {
    return {
        id: blog._id,
        title: blog.title,
        description: blog.description,
        updated: blog.updated
    }
}


module.exports.createBlog = createBlog;
module.exports.blogModel = blogModel;
module.exports.formatBlog = formatBlog;
