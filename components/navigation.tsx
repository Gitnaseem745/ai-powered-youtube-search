import { Button } from "@/components/ui/button";

const Navigation = () => {
  const navItems = [
    { label: "Community", href: "#" },
    { label: "Enterprise", href: "#" },
    { label: "Learn", href: "#" },
    { label: "Shipped", href: "#" },
  ];

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">AI</span>
          </div>
          <span className="text-white font-bold text-xl">Relevia</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
