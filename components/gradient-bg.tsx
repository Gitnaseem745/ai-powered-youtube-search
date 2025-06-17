const GradientBackground = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-800/50 to-orange-600/50 animate-pulse" 
             style={{ animationDuration: '4s' }} />
        
        {/* Subtle noise texture overlay */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        
        <div className="relative z-10">
          {children}
        </div>
      </div>
    );
  };
  
  export default GradientBackground;
  