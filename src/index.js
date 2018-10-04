const express = require('express');
const app = express();
const parser = require('body-parser');
const cors = require('cors')
const logger = require('./utils/logger')
const blogs = require('./routers/blogs')

app.use(cors())
app.use(express.static('build'))
//set parser
app.use(parser.json())
//logger
app.use(logger.logger);
app.use('/api/blogs', blogs.blogsRouter)
app.use(logger.error);
const port = process.env.PORT || 3004
app.listen(port);
console.log(`server running in port ${port}`)