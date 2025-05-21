
const Header = () => {
  return (
    <header className="bg-white py-6 border-b border-border">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-graphfi-purple mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-foreground">
              Graph<span className="text-graphfi-purple">Fi</span>
            </h1>
          </div>
          <div>
            <h2 className="text-sm text-muted-foreground hidden sm:block">Tokenomics Chart Generator</h2>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
