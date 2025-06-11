export function adminMiddleware(req,res,next) {
    if(req.user.role === "admin") {
        return next()
    } else {
        res.status(400).json({
            success : false,
            message : "access denied"
        })
    }
}