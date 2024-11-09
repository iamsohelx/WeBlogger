"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { AddNewUser, GuestLogin } from "@/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFan, faL } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const createNewUser = async () => {
    setLoading(true);
    const result = await AddNewUser(userData);
    if (result?.success) {
      router.push("/login");
      setLoading(false);
    }
  };

  const logInwithGuest = async () => {
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
          <CardTitle className="text-xl text-blue-600">
            Create An Account
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Input
            placeholder="Email"
            value={userData.email}
            name="email"
            onChange={(e) =>
              setUserData({
                ...userData,
                email: e.target.value,
              })
            }
          ></Input>

          <Input
            placeholder="Username"
            name="username"
            value={userData.username}
            onChange={(e) =>
              setUserData({
                ...userData,
                username: e.target.value,
              })
            }
          ></Input>
          <Input
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={(e) =>
              setUserData({
                ...userData,
                password: e.target.value,
              })
            }
          ></Input>

          <Button onClick={createNewUser} className="w-full bg-blue-600">
            {!loading ? (
              "Create"
            ) : (
              <FontAwesomeIcon icon={faFan} className="animate-spin" />
            )}
          </Button>

          <span className="text-center text-gray-500">or</span>
        </CardContent>

        <CardFooter>
          <Button
            onClick={logInwithGuest}
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
