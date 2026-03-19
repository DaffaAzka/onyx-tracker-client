import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { Link } from "react-router";
import useSignIn from "../hooks/useSignIn";
import React, { useState } from "react";
import LoadingButton from "@/components/blocks/loadingButton";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SignInForm() {
  const { loading, error, signIn } = useSignIn();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(form);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <Card>
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
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
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <LoadingButton loading={loading} text="Sign In" />
            <Link to="/get-started">
              <p className="flex flex-row gap-1">
                Don't have an account?
                <span className="hover:underline">Sign Up</span>
              </p>
            </Link>
          </CardFooter>
        </Card>
      </form>
    </>
  );
}
