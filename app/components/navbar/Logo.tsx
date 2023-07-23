'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      className="
      absolute
      left-0
      mx-auto
      xl:px-20
      md:px-10
      sm:px-2
      px-2
      "
    >
      <Image
        onClick={() => router.push('/')}
        alt="Logo"
        className="hidden md:block cursor-pointer"
        height="100"
        width="100"
        src="/images/logo.png"  
        />
    </div>
  )
}

export default Logo