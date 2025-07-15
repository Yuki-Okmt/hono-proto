import { FC, ReactNode } from 'hono/jsx';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="ja" className="h-full">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>TODO App</title>
        <link rel="stylesheet" href="/src/styles.css" />
        <script type="module" src="/src/client.ts"></script>
      </head>
      <body className="h-full font-notion antialiased bg-notion-bg text-notion-text dark:bg-notion-bg-dark dark:text-notion-text-dark">
        <div id="root" className="h-full">
          <div className="min-h-full">
            {/* Header */}
            <header className="bg-notion-bg/80 backdrop-blur-sm border-b border-notion-border dark:bg-notion-bg-dark/80 dark:border-notion-border-dark sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-notion-blue to-notion-purple rounded-notion flex items-center justify-center">
                        <span className="text-white font-bold text-sm">T</span>
                      </div>
                      <h1 className="text-xl font-semibold text-notion-text dark:text-notion-text-dark">
                        TODO App
                      </h1>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button
                      id="theme-toggle"
                      className="p-2 rounded-notion text-notion-text-secondary hover:text-notion-text hover:bg-notion-bg-hover dark:text-notion-text-secondary-dark dark:hover:text-notion-text-dark dark:hover:bg-notion-bg-hover-dark transition-all duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
};

export default Layout;