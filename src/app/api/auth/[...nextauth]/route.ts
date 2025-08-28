import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/../src/lib/dbInstance";

type AuthUser = {
  id: string;
  name?: string | null;
  id_dec?: string;
  id_hex?: string;
  role?: string;
};

export const authOptions: NextAuthOptions = {
  session:  {
   strategy: "jwt",
  maxAge: 15*60,
  },

  jwt:{
    maxAge: 15*60,
  },


  pages: { signIn: "/login" },
  providers: [
    CredentialsProvider({
      name: "Kullanıcı Girişi",
      credentials: {
        id_dec: { label: "Kullanıcı Adı (id_dec)", type: "text" },
        password: { label: "Şifre", type: "password" }, 
      },
      async authorize(credentials) {
        if (!credentials?.id_dec || !credentials?.password) return null;

        // Composite PK nedeniyle findUnique yerine findFirst
        const user = await prisma.operator_table.findFirst({
          where: { id_dec: credentials.id_dec },
          select: {
            id_dec: true,
            id_hex: true,
            op_password: true,
            op_name: true,
            op_username: true, // EKLENDİ: op_username hatasını çözer
            roleId: true,
          },
        });

        if (!user) return null;

        // Şimdilik düz karşılaştırma (bcrypt yok)
        if (credentials.password !== user.op_password) return null;

        const authUser: AuthUser = {
          id: `${user.id_dec}:${user.id_hex}`, // composite key'i stringledik
          name: user.op_username ?? user.op_name ?? user.id_dec ?? "user",
          id_dec: user.id_dec ?? "",
          id_hex: user.id_hex,
          role: user.roleId ? String(user.roleId) : "user",
        };

        return authUser;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as AuthUser;
        token.id_dec = u.id_dec;
        token.id_hex = u.id_hex;
        token.role = u.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.name = session.user.name ?? (token.id_dec as string);

        (session.user as Record<string, unknown>).id_dec = token.id_dec;
        (session.user as Record<string, unknown>).id_hex = token.id_hex;
        (session.user as Record<string, unknown>).role = token.role ?? "user";
      }
      return session;
    },
  },
};

const authHandler = NextAuth(authOptions);
export { authHandler as GET, authHandler as POST };
