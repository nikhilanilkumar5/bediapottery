import Image from "next/image";

const GoogleIcon = () => (
    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center ">
  <Image
    src="/images/icons/google.svg"
    alt="Google"
    width={28}
    height={28}
    className="w-5 h-5"
  />
  </div>
);

export default GoogleIcon;
