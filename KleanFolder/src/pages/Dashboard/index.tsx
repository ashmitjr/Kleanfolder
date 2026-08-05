import React from 'react';
import { Button } from '@/components/ui/button';
import { FolderIcon } from '@/components/icons';
import { useAppStore } from '@/store/app.store';

export const DashboardPage: React.FC = () => {
  const { status, plan, lastMoveLogs, progress, error, startScan, startOrganize, startUndo, reset } = useAppStore();

  const isProcessing = status === 'scanning' || status === 'organizing' || status === 'undoing';

  return (
    <main className="relative flex h-screen w-full flex-col items-center justify-center bg-zinc-950 text-zinc-50 overflow-hidden select-none cursor-default">
      <section className="flex flex-col items-center text-center animate-in fade-in duration-700 zoom-in-95 w-full max-w-2xl">
        
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-900/80 border border-zinc-800/60 shadow-lg backdrop-blur-sm transition-all duration-500">
          <FolderIcon className={`h-7 w-7 transition-all duration-500 ease-out 
            ${isProcessing ? 'scale-110 text-emerald-400 animate-pulse' : 'text-zinc-300'} 
            ${status === 'success' ? 'text-emerald-500' : ''}`} 
          />
        </div>
        
        <h2 className="mb-3 text-xs font-semibold tracking-[0.2em] text-zinc-500 uppercase">
          KleanFolder
        </h2>
        
        {status === 'idle' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="mb-4 text-4xl font-semibold tracking-tight text-zinc-100 sm:text-5xl">
              One click. Lifetime organized.
            </h1>
            <p className="mb-8 text-base text-zinc-400 max-w-md mx-auto">
              Organize your Downloads folder safely in seconds.
            </p>
            <Button onClick={startScan}>Organize Downloads</Button>
          </div>
        )}

        {isProcessing && (
          <div className="flex flex-col items-center gap-6 mt-4 w-full animate-in fade-in zoom-in-95 duration-500">
            <div>
              <h1 className="text-2xl font-medium tracking-tight text-zinc-100">
                {status === 'scanning' && 'Scanning & Planning...'}
                {status === 'organizing' && 'Executing Organization...'}
                {status === 'undoing' && 'Reversing Actions...'}
              </h1>
              <p className="text-sm text-zinc-400 mt-2">
                {status === 'scanning' && 'Analyzing files and building plan'}
                {status === 'organizing' && 'Safely moving files into categories'}
                {status === 'undoing' && 'Moving files back to original locations'}
              </p>
            </div>
            <div className="w-64 h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/50">
              <div className="h-full bg-emerald-500 rounded-full transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        {status === 'preview' && (
          <div className="flex flex-col items-center gap-6 mt-4 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-2xl font-medium tracking-tight text-zinc-100">
              Ready to move {plan.length} files
            </h1>
            <div className="w-full bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-2 text-left max-h-72 overflow-y-auto backdrop-blur-md shadow-inner">
              {plan.map(p => (
                <div key={p.id} className="flex justify-between items-center px-4 py-3 border-b border-white/5 last:border-0 text-sm hover:bg-white/5 transition-colors rounded-xl">
                  <span className="truncate pr-4 text-zinc-300 font-medium">{p.name}</span>
                  <div className="flex items-center text-zinc-500 gap-2 font-mono text-xs">
                    <span>→</span>
                    <span className="bg-emerald-500/10 text-emerald-400/90 px-2 py-1 rounded-md border border-emerald-500/20">
                      {p.displayTo}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 w-full mt-2 justify-center">
              <Button onClick={reset} className="bg-transparent border border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 shadow-none px-8">
                Cancel
              </Button>
              <Button onClick={startOrganize} className="px-8">Execute Plan</Button>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-6 mt-4 animate-in fade-in zoom-in-95 duration-500">
            <div>
              <h1 className="text-3xl font-medium tracking-tight text-zinc-100">All Cleaned Up!</h1>
              <p className="text-base text-zinc-400 mt-2">Files have been safely moved and logged.</p>
            </div>
            <div className="flex gap-4 mt-2">
              {lastMoveLogs.length > 0 && (
                <Button onClick={startUndo} className="bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800 shadow-none">
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                  </svg>
                  Undo Action
                </Button>
              )}
              <Button onClick={reset} className="px-10">Done</Button>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="flex flex-col items-center gap-6 mt-4 w-full animate-in fade-in zoom-in-95 duration-500">
             <h1 className="text-2xl font-medium tracking-tight text-red-400">Operation Halted</h1>
             <p className="text-sm text-zinc-400 mt-2 max-w-md">{error}</p>
             <Button onClick={reset} className="mt-4">Go Back</Button>
          </div>
        )}
      </section>
    </main>
  );
};
export default DashboardPage;
