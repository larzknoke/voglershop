import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwtDecode from "jwt-decode";

export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // The 'url' is pointing to a Rails API endpoint which returns a JWT Token
        const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/login`;

        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          // I SAW EXAMPLES RETURNING {"email": "blah@tst.com"}
          return user; // MY CONTENT {token: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0LCJyb2xl…0.OAGiwjj9O_NsH02lIjA2D4HYZkmTQ3_SqtKcVgaIul0'}
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, isNewUser }) {
      // This user return by provider {} as you mentioned above MY CONTENT {token:}
      if (user) {
        if (user.token) {
          token = { accessToken: user.token, user: user.user };
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      const decodedUser = jwtDecode(token.accessToken);
      session.user = {
        name: decodedUser.name,
        email: decodedUser.email,
        admin: decodedUser.admin,
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);
