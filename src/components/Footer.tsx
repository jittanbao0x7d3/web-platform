import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:underline">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:underline">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold text-white">Follow Us</h3>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.406.593 24 1.325 24h11.495v-9.294H9.745v-3.622h3.075V8.408c0-3.049 1.86-4.707 4.579-4.707 1.299 0 2.417.097 2.742.14v3.179h-1.883c-1.48 0-1.767.705-1.767 1.738v2.28h3.54l-.462 3.622h-3.078V24h6.035C23.407 24 24 23.407 24 22.676V1.325C24 .593 23.407 0 22.675 0z" />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 4.56c-.885.392-1.83.656-2.825.775 1.014-.607 1.794-1.566 2.163-2.713-.95.564-2.005.974-3.127 1.196-.897-.955-2.178-1.555-3.594-1.555-2.717 0-4.917 2.2-4.917 4.917 0 .385.043.76.127 1.12-4.083-.205-7.702-2.16-10.125-5.134-.423.725-.666 1.56-.666 2.45 0 1.69.861 3.18 2.168 4.05-.8-.025-1.554-.245-2.21-.611v.062c0 2.361 1.68 4.33 3.914 4.775-.409.111-.841.171-1.285.171-.314 0-.621-.03-.92-.086.622 1.941 2.43 3.356 4.574 3.396-1.675 1.312-3.786 2.094-6.08 2.094-.394 0-.78-.023-1.162-.067C2.384 21.735 5.213 22.5 8.244 22.5c9.848 0 15.241-8.164 15.241-15.241 0-.232-.005-.463-.015-.692 1.046-.755 1.953-1.697 2.67-2.77z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          © {new Date().getFullYear()} MovieApp. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;