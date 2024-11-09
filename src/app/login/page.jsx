"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFan } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GuestLogin, LoginUser } from "@/actions";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const saveLoginData = async () => {
    setLoading(true);
    const result = await LoginUser(loginData);
    if (result?.success) {
      router.push("/blogs");
      setLoading(false);
    }
  };

  const logInWithGuest = async () => {
    setLoading(true);
    const guestResult = await GuestLogin();
    if (guestResult?.success) {
      router.push("/blogs");
      setLoading(false);
    }
  };

  return (
    <div className="py-24 w-screen flex justify-center items-center px-5">
      <Card className="w-[380px]">
        <CardHeader>
          <CardTitle className="text-xl text-blue-600">Log In</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Input
            className=""
            placeholder="email"
            name="email"
            required
            value={loginData.email}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                email: e.target.value,
              })
            }
          ></Input>
          <Input
            placeholder="Password"
            name="password"
            required
            value={loginData.password}
            onChange={(e) =>
              setLoginData({
                ...loginData,
                password: e.target.value,
              })
            }
          ></Input>

          <Button className="w-full bg-blue-600" onClick={saveLoginData}>
            {!loading ? (
              "Login"
            ) : (
              <FontAwesomeIcon icon={faFan} className="animate-spin" />
            )}
          </Button>

          <span className="text-center text-gray-500">or</span>
        </CardContent>

        <CardFooter>
          <Button
            onClick={logInWithGuest}
            className="w-full bg-transparent border border-blue-600 text-blue-600"
          >
            {!loading ? (
              "Continue with Guest"
            ) : (
              <FontAwesomeIcon icon={faFan} className="animate-spin" />
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;
