import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/dbConfig";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    // successful signin
    async signIn({ profile }) {
      // 1. connect to Db
      await connectDB();
      // 2. check if user exists
      const userExist = await User.findOne({ email: profile.email });
      // 3. if notFound, then add to Db
      if (!userExist) {
        // Truncate if username too long
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }
      // 4. return true to allow signin
      return true;
    },
    // modifies session object
    async session({ session }) {
      // 1. Get user from databse
      const user = await User.findOne({ email: session.user.email });
      // 2. assign userid to session
      session.user.id = user._id.toString();
      // 3. return session
      return session;
    },
  },
};
