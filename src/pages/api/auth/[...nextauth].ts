import NextAuth, { AuthOptions } from 'next-auth';
import CognitoProvider from 'next-auth/providers/cognito';

export const authOptions: AuthOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.NEXT_AWS_COGNITO_CLIENT_ID as string,
      clientSecret: process.env.NEXT_AWS_COGNITO_CLIENT_SECRET as string,
      issuer: process.env.NEXT_AWS_COGNITO_ISSUER as string
    })
  ],
  pages: {
    signIn: '/'
  },
  // debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
