import Link from "next/link";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaInstagram
} from "react-icons/fa";
import {
  FaFacebook,
  FaXTwitter,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "All Products", href: "/all-products" },
  { name: "About", href: "/about" },
];

const supportLinks = [
  { name: "Contact", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-slate-950 text-slate-300">
      <div className="container mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & Description */}
          <div>
            <Link href="/" className="text-3xl font-bold text-white">
              Shop<span className="text-blue-500">Nest</span>
            </Link>

            <p className="mt-4 text-sm leading-7 text-slate-400">
              Shop Nest is your trusted online shopping destination for
              fashion, electronics, home essentials, and much more at the best
              prices.
            </p>

            <div className="mt-6 flex gap-3">
              <Link
                href="#"
                className="rounded-full bg-slate-800 p-2 transition hover:bg-blue-600"
              >
                <FaFacebook size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full bg-slate-800 p-2 transition hover:bg-pink-600"
              >
                <FaInstagram size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full bg-slate-800 p-2 transition hover:bg-sky-500"
              >
                <FaXTwitter size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full bg-slate-800 p-2 transition hover:bg-blue-700"
              >
                <FaLinkedinIn size={18} />
              </Link>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Support
            </h3>

            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="transition hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="h-5 w-5 text-blue-500" />
                <span>Dhaka, Bangladesh</span>
              </div>

              <div className="flex items-center gap-3">
                <FaPhoneAlt className="h-5 w-5 text-blue-500" />
                <span>+880 1234-567890</span>
              </div>

              <div className="flex items-center gap-3">
                <IoIosMail className="h-5 w-5 text-blue-500" />
                <span>support@shopnest.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-6 text-sm text-slate-500 md:flex-row">
          <p>© {new Date().getFullYear()} ShopNest. All rights reserved.</p>

        </div>
      </div>
    </footer>
  );
}