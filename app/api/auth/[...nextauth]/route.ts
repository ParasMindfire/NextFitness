// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { getUserByEmail } from '../../../../lib/repository/UserRepo';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'select_account', // Force account selection
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account && account.provider === 'google') {
        const existingUser = await getUserByEmail(user.email);
        if (existingUser) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };



