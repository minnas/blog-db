const blogsRouter = require('express').Router()
const {add, remove, fetch, update} = require('./models/blog');

//routes
//fetch all blogs
blogsRouter.get('/',(req, res) => {
    const fetchBlogs = () => { 
        return (
            Promise.resolve(() => {
                let blogs = fetch();
                return blogs.then((blogs) => {
                    console.log('fetch blogs');
                    console.log(blogs);
                    return Promise.resolve(blogs);
                });    
            })
        )
    };

    return fetchBlogs().then(data => {
        if(data) {
            res.send(data);
        } else {
            res.status(500).end();
        }
    });

});
//add new blog
blogsRouter.post('/',(req, res) => {
    const data = req.body;

    const done = (data) => {
        Promise.resolve(() => {
            return add(data).then(response => {
                console.log('blog added'); 
                return response;
            });
        });
    }

    return done(data).then(data => {
        if(data) {
            res.send(data);
        } else {
            res.status(500).end();
        }
    });

});
//updates blog
blogsRouter.put('/:id',(req, res) => {
    const id = Number(req.params.id);
    const blog = req.body;

    const updateBlog = (id, data ) => {
        return ( 
            Promise.resolve((id, data) => {
                return update(id, data ).then(blog => {
                    if(blog) {
                        console.log('blog by id '+ blog.id +' updated');
                        console.log(blog);
                    } else {
                        console.log('error while updated blog data');
                    }
                });
            })
        );
    };

    return updateBlog(id, blog).then(blog => {
        if(blog === false) {
            res.status(500).end();
        } else {
            res.send(blog);
        }
    });

});
//remove blog from db
blogsRouter.delete('/:id',(req, res) => {
    const id = Number(req.params.id);

    const removed = (id) => { 
        return (
            Promise.resolve((id) =>  {
                return remove(id).then((succeed) => {
                    return succeed;
                });
            })
        )
    }
    return removed(id).then(succeed => {
        if(succeed) {
            response.send(id);
        } else {
            res.status(500).end();
        }
    });
});
  
module.exports = {
    blogsRouter
}