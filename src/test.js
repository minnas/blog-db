/**
 * Testing mongo db
 * to run: use npm run test-mongo
 */
const {add, remove, fetch, update} = require('./models/blog');

//dummy blog properties for new blog
const generateBlog = () => {
    return {
        title: 'This is a new text Blog ' + (new Date()).toUTCString(),
        description: 'This is another blog stored in Mongo DB ;) ',
        updated: new Date()
    };
};

//create new dummy blog
const createBlog = () => {
    return (
        Promise.resolve(() => {
            return add(generateBlog()).then(response => {
                console.log('blog added'); 
                console.log(response);
            });
        })
    )
}
//fetch bl ogs
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
}
//remove blog from db
const removeBlog= (id) => { 
    return (
        Promise.resolve((id) =>  {
            return remove(id).then((succeed) => {
                return succeed;
            });
        })
    )
}
//update blog properties to db
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
}
//put blog actions in queue
let blogList = [];
blogList.push(createBlog());
blogList.push(createBlog());
blogList.push(fetchBlogs());

//remove first blog and update second one after all above actions are done
Promise.all(blogList).then((blogs) => {
    console.log(blogs);
    let updates = [];
    blogs.forEach((blog, index) => {
        //remove first blog
        if(index < 1) {
            updates.push(removeBlog(blog.id));
        } else if(index == 1) {
        //update second blog
            updates.push(updateBlog(blog.id, {
                            title: 'updated blog ' + blog.title,
                            description: 'updated d ' + blog.description
                        }));
        }

    });

    Promise.all(updates).then(response => {
        console.log('all done for now');
    });
    
})

