import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#F5F3F0] py-12 px-6 border-t border-black/5 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span className="font-bold text-xl tracking-tight">Mondy.ai</span>
          <p className="text-black/60 text-sm mt-2 max-w-sm leading-relaxed">
            The curated sanctuary for your aesthetic journey. 
            © {new Date().getFullYear()} Mondy.ai. All rights reserved.
          </p>
        </div>
        
        <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link href="/privacy" className="text-black/60 hover:text-black transition-colors px-2 py-1 relative group">
            <span className="relative z-10">Privacy Policy</span>
            <span className="absolute inset-0 bg-black/5 rounded-md scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200"></span>
          </Link>
          <Link href="#" className="text-black/60 hover:text-black transition-colors px-2 py-1 relative group">
            <span className="relative z-10">Terms of Service</span>
            <span className="absolute inset-0 bg-black/5 rounded-md scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200"></span>
          </Link>
          <Link href="mailto:hello@mondy.ai" className="text-black/60 hover:text-black transition-colors px-2 py-1 relative group">
            <span className="relative z-10">Contact</span>
            <span className="absolute inset-0 bg-black/5 rounded-md scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200"></span>
          </Link>
        </nav>
      </div>
    </footer>
  );
}
