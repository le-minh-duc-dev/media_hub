import { signIn } from "@/authentication/auth"
import Login from "@/components/Login"

export default function SignIn() {
  return (
    <Login
      signFn={async (provider:string) => {
        "use server"
        await signIn(provider)
        
      }}
    />
  )
}
