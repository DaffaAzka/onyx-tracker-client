import { useState } from "react";
import useSignUp from "../hooks/useSignUp";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/blocks/loadingButton";
import { Link } from "react-router";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SignUpForm() {
  const { loading, error, signUp } = useSignUp();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    retry_password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signUp(form);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Sign up to your account</CardTitle>
            <CardDescription>
              Enter your information below to make a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-6">
              {error && (
                <Alert variant="destructive" className="bg-red-100">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Pablo"
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a> */}
                  </div>
                  <Input
                    id="password"
                    type="password"
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="retry_password">Retype Password</Label>
                    {/* <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                    Forgot your password?
                  </a> */}
                  </div>
                  <Input
                    id="retry_password"
                    type="password"
                    onChange={(e) =>
                      setForm({ ...form, retry_password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <LoadingButton loading={loading} text="Sign Up" />
            <Link to="/sign-in">
              <p className="flex flex-row gap-1">
                Already have an account?
                <span className="hover:underline">Sign In</span>
              </p>
            </Link>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
