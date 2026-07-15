import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb"; // your mongodb client
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db("shop-nest");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client,
    }),
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_BASE_URL,
        trustedOrigins: [
            process.env.BETTER_AUTH_URL || "",
            process.env.NEXT_PUBLIC_BASE_URL || "",
          "https://shop-nest-zeta-sepia.vercel.app"
        ],
  
  emailAndPassword: { 
    enabled: true, 
  }, 
  user: {
  additionalFields: {
    role: {
      type: "string",
      defaultValue: "user",
    },
  },
},

  session: {
      cookieCache: {
        enabled: true,
        strategy: "jwt",
        maxAge: 7 * 24 * 60 * 60
      }
    },
    plugins: [
        jwt(), 
    ]
});