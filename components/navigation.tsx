import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">AI</span>
        </div>
        <span className="text-white font-bold text-xl">Relevia</span>
      </div>

      <a
        href="https://github.com/Gitnaseem745"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/70 hover:text-white transition-colors duration-200 text-sm font-medium"
      >
        Dev: <span className="underline underline-offset-2">Naseem Ansari</span>
      </a>
    </nav>
  );
};

export default Navigation;
