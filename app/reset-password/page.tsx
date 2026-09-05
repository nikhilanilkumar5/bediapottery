// import Title from "@/components/ui/Title";
// import { Content } from "@/components/ui";
// import Link from "next/link";
// import Image from "next/image";
// import { Suspense } from "react";
// import ResetPasswordForm from "@/components/form/ResetPasswordForm";

// export default function ResetPasswordPage() {
//   return (
//     <div className="min-h-[calc(100dvh_-_80px)] bg-white">
//       <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[calc(100dvh_-_80px)] p-5 sticky top-0">
        
//         {/* Left Side Banner */}
//         <div
//           className="hidden lg:block bg-primary p-[50px] w-full bg-cover bg-center"
//           style={{
//             backgroundImage: "url(/images/banner/login-banner.png)",
//           }}
//         >
//           <Link href="/">
//             <Image
//               src="/logo-white.svg"
//               alt="Bedia Pottery Logo"
//               width={290}
//               height={31}
//               className="w-[290px] h-[31px]"
//             />
//           </Link>
//         </div>

//         {/* Right Side Form */}
//         <div className="flex items-center overflow-y-auto scrollbar-hide justify-start px-[17px] sm:px-[40px] lg:px-[90px]">
//           <div className="w-full max-w-xl">
//             <div className="2xl:mb-[60px] mb-10">
//               <Title className="mb-4 font-normal !text-[40px]">
//                 Reset Your Password
//               </Title>

//               <Content>
//                 Please enter your new password below to reset your account password.
//               </Content>
//             </div>

//             <Suspense
//               fallback={
//                 <div className="text-sm text-gray-500">Loading...</div>
//               }
//             >
//               <ResetPasswordForm />
//             </Suspense>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
import { redirect } from "next/navigation";

export default function ResetPasswordPage() {
  redirect("/");
}