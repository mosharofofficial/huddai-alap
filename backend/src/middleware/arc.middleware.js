import aj from "../lib/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetProtection = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);

        if(decision.isDenied()) {  // ✅ This method call is correct
            if(decision.reason.isRateLimit) {  // ✅ Property, not method
                return res.status(429).json({
                    message: "Rate limit exceeded. Please try again later"
                });
            }
            else if(decision.reason.isBot) {  // ✅ Property, not method
                return res.status(403).json({
                    message: "Bot access denied"
                });
            }
            else {
                return res.status(403).json({
                    message: "Access denied by security policy"
                });
            }
        }

        if(decision.results.some(isSpoofedBot)) {
            return res.status(403).json({
                error: "Spoofed bot detected",  
                message: "Malicious bot activity detected"
            });
        }

        next();
    } catch (error) {
        console.log("Arcjet Protection Error:", error);
        next();  
    }
};