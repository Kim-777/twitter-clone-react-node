exports.isLoggedIn = (req, res, next) => {
    console.log('isLoggedIn');
    console.log('req.isAuthenticated()', req.isAuthenticated());
    if(req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send('로그인이 필요합니다.');
    }
}

exports.isNotLoggedIn = (req, res, next) => {
    console.log('isNotLoggedIn')
    console.log('req.isAuthenticated()', req.isAuthenticated())
    if(!req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send('로그인하지 않은 사용자만 접근 가능합니다.');
    }
}