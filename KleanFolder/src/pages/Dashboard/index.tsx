import React from 'react';
import { Button } from '@/components/ui/button';
import { FolderIcon } from '@/components/icons';

export const DashboardPage: React.FC = () => {
  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center bg-zinc-950 text-zinc-50 overflow-hidden select-none cursor-default">
      {/* Center Content Block */}
      <section className="flex flex-col items-center text-center animate-in fade-in duration-500 zoom-in-95">
        
        {/* App Icon */}
        <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-900/80 border border-zinc-800/60 shadow-sm backdrop-blur-sm">
          <FolderIcon className="h-6 w-6 text-zinc-300" />
        </div>
        
        {/* Title */}
        <h2 className="mb-3 text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
          KleanFolder
        </h2>
        
        {/* Tagline */}
        <h1 className="mb-4 text-4xl font-semibold tracking-tight text-zinc-100 sm:text-5xl">
          One click. Lifetime organized.
        </h1>
        
        {/* Subtitle */}
        <p className="mb-10 text-base text-zinc-400 max-w-md">
          Organize your Downloads folder safely in seconds.
        </p>
        
        {/* Primary Action */}
        <Button>
          Organize Downloads
        </Button>

      </section>

      {/* Footer Status */}
      <footer className="absolute bottom-0 left-0 w-full p-5 flex items-center justify-start pointer-events-none">
        <div className="flex items-center gap-2.5 rounded-full bg-zinc-900/40 px-3 py-1.5 border border-zinc-800/30 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-20"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 opacity-80"></span>
          </span>
          <span className="text-xs font-medium text-zinc-400 tracking-wide">Ready</span>
        </div>
      </footer>
    </main>
  );
};

export default DashboardPage;
