import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login, signup, signInWithGithub } from '@/lib/actions/auth'


export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center mt-4">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input id="password" name="password" type="password" required />

              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Button formAction={login} type="submit" className="w-full mt-4">
              Login
            </Button>
          </form>
          <form>
            <Button formAction={signInWithGithub} variant="outline" className="w-full">
              Login with Github
            </Button>
          </form>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Button variant="secondary" formAction={signup}>
            Sign up
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
