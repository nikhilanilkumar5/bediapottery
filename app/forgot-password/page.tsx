import Title from "@/components/ui/Title";
import { Content } from "@/components/ui";
import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import ForgotPasswordForm from "@/components/form/ForgetForm";

export default function ForgetPasswordPage() {
  return (
    <div className="min-h-[calc(100vh_-_80px)] bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100vh_-_80px)] p-5 sticky top-0">

        {/* Left */}
        <div
          className="hidden lg:block bg-primary p-[50px] w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url(/images/banner/login-banner.png)",
          }}
        >
          <Link href="/">
            <Image
              src="/logo-white.svg"
              alt="Bedia Pottery Logo"
              width={290}
              height={31}
              className="w-[290px] h-[31px]"
            />
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center overflow-y-auto scrollbar-hide justify-start px-[17px] sm:px-[40px] lg:px-[90px]">
          <div className="w-full max-w-xl">

            <div className="2xl:mb-[60px] mb-10">
              <Title className="mb-4 font-normal !text-[40px]">
                Forgot Your Password?
              </Title>

              <Content>
                Enter your email address and we&apos;ll send you a
                link to reset your password.
              </Content>
            </div>

            <Suspense
              fallback={
                <div className="text-sm text-gray-500">
                  Loading...
                </div>
              }
            >
              <ForgotPasswordForm />
            </Suspense>

          </div>
        </div>
      </div>
    </div>
  );
}