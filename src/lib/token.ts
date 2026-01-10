import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET || "your-secret-key-change-in-production";

if (process.env.NODE_ENV === "production" && secretKey === "your-secret-key-change-in-production") {
    console.warn("⚠️  WARNING: Using default JWT secret key in production! Please set JWT_SECRET environment variable.");
}

const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        return null;
    }
}
