import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="antialised">
      <div className="bg-white max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <header className="flex justify-between items-center py-10">
          <div>
            <Link href="/">
              <a className="flex items-center text-3xl text-gray-500">
                <img src="/title.svg" alt="Blog Title" className="w-auto h-7" />
                <span className="text-m text-gray-600 ml-2">Test Blog</span>
              </a>
            </Link>
          </div>
        </header>
      </div>
      {children}
    </div>
  );
}
