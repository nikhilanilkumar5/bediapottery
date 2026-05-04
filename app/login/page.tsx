import React from "react";
import Title from "@/components/ui/Title";
import Subtitle from "@/components/ui/Subtitle";
import { Content } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/form/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen p-5">
        {/* Left */}
        <div className="hidden lg:block  bg-primary  p-[50px] w-full  bg-cover bg-center"
                         style={{ backgroundImage: `url(/images/banner/login-banner.png)` }}
                  >
  <Link href="/">
           <Image src="/logo-white.svg" alt="Bedia Pottery Logo" width={290} height={31} className='w-[290px] h-[31px]' />
          </Link>
          </div>
        {/* Right */}
        <div className="flex items-center justify-start px-[90px]">
          <div className="w-full max-w-xl">
            <div className="mb-[60px]">
                <Title className=" mb-4 font-normal !text-[40px]">
                Join Our Creative Community
              </Title>
              <Content className="">
            Sign up to explore workshops, manage bookings, and be part of our creative community.
              </Content>
            </div>

            <LoginForm  />
          </div>
        </div>
      </div>
    </div>
  );
}
