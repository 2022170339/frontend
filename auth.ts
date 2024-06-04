import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      credentials: {
        id: {},
        password: {},
      },
      authorize: async (credentials: any) => {
        let user = null

        const payload = new URLSearchParams({
          grant_type: "password",
          username: credentials.id,
          password: credentials.password,
        });

        const res = await fetch(`${process.env.BASE_URL!}login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: payload.toString()
        }).then((res) => res.json()).catch((err) => {
          console.error(err);
          throw new Error("Failed to login.")
        });

        user = res;

        if (!user) {
          throw new Error("User not found.")
        }

        return user
      },
    }),
  ],
})
