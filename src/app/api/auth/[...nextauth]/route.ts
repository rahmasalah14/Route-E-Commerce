import { FailedLoginResponse, SuccessLoginResponse } from "@/interfaces"
import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
export const authOptions: NextAuthOptions = 
{
  providers:[
    Credentials({
    name: 'Credentials',
   
    credentials: {
      email: { label: "Email", type: "text", placeholder: "jsmith@example.com" },
      password: { label: "Password", type: "password" }
    },


    async authorize(credentials) {
    
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" }
      })
      const payload:SuccessLoginResponse |FailedLoginResponse = await res.json()
      console.log(payload);
      if ('token' in payload) {
        return {
            id: payload.user._id,
            user: payload.user,
            token: payload.token
        }
      }
      else
      {
        throw new Error(payload.message)
      }
      
    }
  })
  ] ,
  callbacks:{
    jwt:({token,user})=>{
  
       if(user)
       {
         token.user = user.user
        token.token = user.token 
       }
       return token
    },
    session:({session,token})=>{
        session.user = token.user
        return session
    },
   
  },
   pages:{
        signIn:'/login',
        error:'/login'
    },
    secret: process.env.NEXT_AUTH_SECRET  
    
}
const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }