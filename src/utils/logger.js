const logger = (req,res,next) => {
    console.log('-----Debug-----');
    console.log('Method: ' + req.method);
    console.log('Path: ' + req.path);
    console.log('Body: ' + req.body);
    console.log('---------------');
    next();
}
//simple error handler for invalid endpoints
const error = (req,res) => {
    res.status(400).send({error: 'invalid endpoint, see valid endpoints from http://localhost:3004/api/info'})
}

module.exports = {
    logger,
    error
}