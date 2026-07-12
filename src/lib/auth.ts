import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb"; // your mongodb client

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db("shop-nest");

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        // Optional: if you don't provide a client, database transactions won't be enabled.
        client,
    }),
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
}
});