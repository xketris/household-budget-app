import ratelimit from "../config/upstash.js"

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit(req.user.id);
        if(!success) {
            res.status(429);
            throw new Error("Too many request, try again later")
        }
        next();
    } catch(err) {
        console.log("Rate limit error", err);
        res.status(400);
        throw new Error("Rate limit error")
    }
}

export default rateLimiter;