import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 bg-black text-white">
      {/* Main Footer Content */}
      <div className="app-container px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-black text-white">MovieVault</h2>
              <p className="text-sm text-gray-400">
                Your ultimate destination for movies and shows. Stream millions
                of titles, anytime, anywhere.
              </p>
            </div>
          </div>

          {/* Browse Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Browse
            </h3>
            <nav className="space-y-3">
              <Link
                href="#"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                All Movies
              </Link>
              <Link
                href="#"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Free Content
              </Link>
              <Link
                href="#"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Premium Shows
              </Link>
              <Link
                href="#"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                New Releases
              </Link>
            </nav>
          </div>

          {/* Genres */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Genres
            </h3>
            <nav className="space-y-3">
              <Link
                href="#"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Action
              </Link>
              <Link
                href="#"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Drama
              </Link>
              <Link
                href="#"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Comedy
              </Link>
              <Link
                href="#"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Thriller
              </Link>
            </nav>
          </div>

          {/* Support & Account */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Account
            </h3>
            <nav className="space-y-3">
              <Link
                href="#"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Help Center
              </Link>
              <Link
                href="#"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                My Account
              </Link>
              <Link
                href="#"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Subscription
              </Link>
              <Link
                href="#"
                className="block text-sm text-gray-400 transition-colors hover:text-white"
              >
                Contact Us
              </Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="border-t border-gray-800">
        <div className="app-container px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Email
                </p>
                <Link
                  href="mailto:support@moviewault.com"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  support@moviewault.com
                </Link>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <Phone className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Phone
                </p>
                <Link
                  href="tel:1-800-MOVIEWAULT"
                  className="text-sm text-gray-400 transition-colors hover:text-white"
                >
                  +8801305839415
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-start gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Follow Us
                </p>
                <div className="flex gap-3">
                  <Link
                    href="https://www.linkedin.com/in/md-ashik-5351083a8/"
                    aria-label="LinkedIn"
                    className="text-gray-400 transition-colors hover:text-primary"
                  >
                    <Image
                      src={"/social-media/linkedin.png"}
                      alt="linkedin...?"
                      width={20}
                      height={20}
                    />
                  </Link>
                  <Link
                    href="#"
                    aria-label="Twitter"
                    className="text-gray-400 transition-colors hover:text-primary"
                  >
                    <Image
                      src={"/social-media/twitter.png"}
                      alt="twitter...?"
                      width={20}
                      height={20}
                    />
                  </Link>
                  <Link
                    href="https://www.facebook.com/mohammed.ashik.455434"
                    aria-label="Facebook"
                    className="text-gray-400 transition-colors hover:text-primary"
                  >
                    <Image
                      src={"/social-media/facebook.png"}
                      alt="facebook...?"
                      width={20}
                      height={20}
                    />
                  </Link>
                  <Link
                    href="https://www.instagram.com/mohammed_ashik54/?hl=en"
                    aria-label="Instagram"
                    className="text-gray-400 transition-colors hover:text-primary"
                  >
                    <Image
                      src={"/social-media/instagram.png"}
                      alt="instagram...?"
                      width={20}
                      height={20}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="app-container px-6 py-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-xs text-gray-500 md:text-left">
              &copy; {currentYear} MovieVault. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-xs text-gray-500 transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs text-gray-500 transition-colors hover:text-white"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs text-gray-500 transition-colors hover:text-white"
              >
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
