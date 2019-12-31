const validate = (req, res) => {
    // console.log('Req: ', req);
    const { username, password } = req.body;
    console.log('Vals: ', username, password);
    if (username === password && ['admin', 'halalbox', 'welcome', 'parth', 'ali'].indexOf(username.toLowerCase()) > -1) {
        const token = `${parseInt(Math.random() * 10000)}.${username}.${parseInt(Math.random() * 10000)}`;
        const maxAge = process.env.MAX_AGE_IN_MS || 60 * 60 * 1000; // (60 mins)
        res.cookie('isSecure', JSON.stringify({username}), {maxAge});
        console.log('Authenticated and Cookies set');
        res.send({username, token, isLoggedIn: true});
    } else {
        res.send(401);
    }
};


const initialCheck = (req, res) => {
    const { cookies } = req;
    console.log('cookies.isSecure: ', cookies.isSecure);
    const isSecure = cookies.isSecure && JSON.parse(cookies.isSecure) || {};
    console.log('isSecure: ', isSecure);
    // console.log('body: ', req.body);
    setTimeout(() => {
        res.send({check: 'success', isLoggedIn: isSecure.username /* || Math.random() > 0.49 */});    
    }, 500);
    
};

const logout = (req, resp) => {
    console.log('Logout called: ');
    resp.clearCookie('isSecure');
    resp.send(200);
};

exports.validate = validate;
exports.initialCheck = initialCheck;
exports.logout = logout;