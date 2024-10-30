// auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createDBConnection } from "@/lib/db";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut
} = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter email and password");
                }

                try {
                    const connection = await createDBConnection();
                    const [rows]: any = await connection.execute(
                        `SELECT e.*, r.RoleName 
                         FROM Employee e 
                         JOIN Role r ON e.RoleID = r.RoleID 
                         WHERE e.Email = ?`,
                        [credentials.email]
                    );
                    await connection.end();

                    if (rows.length === 0) {
                        throw new Error("No user found");
                    }

                    const user = rows[0];

                    //TODO: Implement proper password hashing
                    if (credentials.password !== user.Password) {
                        throw new Error("Invalid password");
                    }

                    return {
                        id: user.EmployeeID.toString(),
                        name: user.Name,
                        email: user.Email,
                        role: user.RoleName,
                    };
                } catch (error) {
                    console.error("Auth error:", error);
                    throw new Error("Authentication failed");
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string;
                session.user.id = token.id as string;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login",
        error: "/unauthorized"
    }
});