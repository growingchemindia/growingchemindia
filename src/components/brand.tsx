import Image from "next/image";
import Link from "next/link";

/**
 * Company logo lockup (public/logo.png). On dark backgrounds the logo's
 * navy text would disappear, so `light` sits it on a white chip.
 */
export function Brand({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Growing Chem India home"
      className={`inline-flex items-center ${
        light ? "rounded-lg bg-white px-3 py-2" : ""
      }`}
    >
      <Image
        src="/logo.png"
        alt="Growing Chem India logo"
        width={218}
        height={80}
        priority
        className={light ? "h-8 w-auto" : "h-10 w-auto sm:h-11"}
      />
    </Link>
  );
}
