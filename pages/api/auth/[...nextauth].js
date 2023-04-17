import bcryptjs from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import db from '../../../utils/db';
import NextAuth from 'next-auth';
import Users from '../../../models/User';

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        await db.connect();
        const user = await Users.findOne({
          email: credentials.email,
        });
        await db.disconnect();
        if (user && bcryptjs.compareSync(credentials.password, user.password)) {
          return {
            _id: user._id,
            userId: user.userId,
            name: user.name,
            email: user.email,
            isTeacher: user.isTeacher,
          };
        }
        throw new Error('E-mail ou senha inválido!');
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user?._id) token._id = user._id;
      if (user?.isTeacher) token.isTeacher = user.isTeacher;
      return token;
    },
    async session({ session, token }) {
      if (token?._id) session.user._id = token._id;
      if (token?.isTeacher) session.user.isTeacher = token.isTeacher;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
