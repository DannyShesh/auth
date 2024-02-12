import { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import Credentials from "next-auth/providers/credentials";
import { db } from "./db";
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

type User = {
  id: any,
  name: string,
  email: string,
  password: string
}

export const authOptions: AuthOptions = {
    providers: [
        Credentials({           
            name: 'Credentials',
            credentials: {
              username: { label: "Username", type: "text", placeholder: "jsmith" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                console.log(credentials);               
              //database
              const user = await prisma.users.findUnique({
                where: {
                  email: credentials?.username
                }
              }) as User
              if(user){
                return user
              }
              
              return null
            },
            
          })
           
    ],
    session: {
      strategy: "jwt"
    },
    jwt: {
      secret: process.env.NEXTAUTH_SECRET
    }
}