
//Verify Token
// eslint-disable-next-line no-unused-vars
function verifyToken(req, res, next) {
    // eslint-disable-next-line dot-notation
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined'){
    const bearer = bearerHeader.split('');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
    } 
    else{
    res.sendStatus(403);
    }
    }