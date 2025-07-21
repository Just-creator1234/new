// import GoogleProvider from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import prisma from "@/lib/prisma";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   adapter: PrismaAdapter(prisma),

//   providers: [
//     Credentials({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) return null;

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email },
//         });

//         if (!user) throw new Error("No account found with this email");
//         if (!user.emailVerified)
//           throw new Error("Please verify your email before signing in");

//         const isValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );
//         if (!isValid) throw new Error("Incorrect password");

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           slug: user.slug,
//           role: user.role,
//           remember: credentials.remember === "true",
//         };
//       },
//     }),

//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },

//   secret: process.env.NEXTAUTH_SECRET,

//   callbacks: {
//     async jwt({ token, user }) {
//       // Capture Google sign-in email
//       if (user?.email) token.email = user.email;

//       // Always fetch user from DB
//       if (token?.email) {
//         const dbUser = await prisma.user.findUnique({
//           where: { email: token.email },
//           select: { id: true, role: true, slug: true },
//         });

//         if (dbUser) {
//           token.id = dbUser.id;
//           token.role = dbUser.role;
//           token.slug = dbUser.slug;
//         }
//       }

//       return token;
//     },

//     async session({ session, token }) {
//       if (token?.id) {
//         session.user.id = token.id;
//         session.user.role = token.role;
//         session.user.slug = token.slug;
//       }
//       return session;
//     },

//     async redirect({ baseUrl }) {
//       return `${baseUrl}/My-blogs`;
//     },
//   },

//   events: {
//     async createUser({ user }) {
//       const adminEmails = [
//         "jackright198765@gmail.com",
//         "darlingtonboateng18@gmail.com",
//       ];

//       const baseSlug = require("slugify")(user.name || "user", { lower: true });
//       let slug = baseSlug;
//       let counter = 1;
//       while (await prisma.user.findUnique({ where: { slug } })) {
//         slug = `${baseSlug}-${counter++}`;
//       }

//       await prisma.user.update({
//         where: { email: user.email },
//         data: {
//           role: adminEmails.includes(user.email) ? "ADMIN" : "STUDENT",
//           slug,
//         },
//       });
//     },
//   },

//   pages: {
//     signIn: "/signin",
//     error: "/error",
//   },
// };


// ./lib/auth.js
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import slugify from "slugify";          // ✅ ES-module import
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) throw new Error("No account found with this email");
        if (!user.emailVerified)
          throw new Error("Please verify your email before signing in");

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isValid) throw new Error("Incorrect password");

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          slug: user.slug,
          role: user.role,
          remember: credentials.remember === "true",
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user?.email) token.email = user.email;
      if (token?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { id: true, role: true, slug: true },
        });
        if (dbUser) {
          token.id = dbUser.id;
          token.role = dbUser.role;
          token.slug = dbUser.slug;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token?.id) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.slug = token.slug;
      }
      return session;
    },

    async redirect({ baseUrl }) {
      return `${baseUrl}/My-blogs`;
    },
  },

  events: {
    async createUser({ user }) {
      const adminEmails = [
        "jackright198765@gmail.com",
        "darlingtonboateng18@gmail.com",
      ];

      const baseSlug = slugify(user.name || "user", { lower: true });
      let slug = baseSlug;
      let counter = 1;
      while (await prisma.user.findUnique({ where: { slug } })) {
        slug = `${baseSlug}-${counter++}`;
      }

      await prisma.user.update({
        where: { email: user.email },
        data: {
          role: adminEmails.includes(user.email) ? "ADMIN" : "STUDENT",
          slug,
        },
      });
    },
  },

  pages: {
    signIn: "/signin",
    error: "/error",
  },
};