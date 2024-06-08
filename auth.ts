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
        let user: any = null

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
        });


        if (!res.ok) {
          throw new Error("Invalid credentials.");
        }

        const data = await res.json();

        if (data.access_token) {
          user = {
            id: credentials.id,
            access_token: data.access_token,
            token_type: data.token_type,
          };
        }

        if (!user) {
          throw new Error("User not found.")
        }

        return user
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user }
    },
    session: async ({ session, token }) => {
      let sess: any = { ...session }
      sess.user = { ...token }
      return { ...sess }
    },
  }
})
