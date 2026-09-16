import Link from "next/link";

interface CartToastProps {
  message?: string;
}

export default function CartToast({
  message = "Your item has been added to bag.",
}: CartToastProps) {
  return (
    <div className="absolute top-15 left-0 right-0 w-full bg-[#0000008c] text-white py-3.5 px-6 z-[9999] shadow-sm animate-in fade-in slide-in-from-top duration-300">
      <div className="page-wrapper flex justify-end items-center text-sm font-medium">
        <div>
          {message}{" "}
          <Link
            href="/cart"
            className="underline underline-offset-2 font-bold hover:opacity-90 ml-1"
          >
            Checkout now
          </Link>
        </div>
      </div>
    </div>
  );
}