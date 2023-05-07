const jwt = require("jsonwebtoken");

//Verify token
function verifyToken(req, res, next) {
    const authToken = req.headers.authorization;
    if(authToken) {
        const token = authToken.split(" ")[1];
        try {
            const decodedPayload = jwt.verify(token, process.env.JWT_SECRET);
            req.user =decodedPayload;
            next();
        } catch (error) {
            return res.status(401).json({ message: "Mã thông báo không hợp lệ, quyền truy cập bị từ chối"});
        }
    } else {
        return res.status(401).json({ message: "Không cung cấp mã thông báo, quyền truy cập bị từ chối"});
    }
}

//Verify Token & Admin
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req,res, () => {
        if(req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "Không được phép, chỉ quản trị viên" });
        }
    });
}

//Verify Token & Only User Himself
function verifyTokenAndOnlyUser(req, res, next) {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id) {
            next();
        } else {
            return res.status(403).json({ message: "Không được phép, chỉ người dùng thành viên" });
        }
    });
}

//Verify Token & Authorization
function verifyTokenAndAuthorization(req, res, next) {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ message: "Không được phép, chỉ người dùng thành viên hoặc quản trị viên" });
        }
    });
}

module.exports = {
    verifyToken,
    verifyTokenAndAdmin,
    verifyTokenAndOnlyUser,
    verifyTokenAndAuthorization
}