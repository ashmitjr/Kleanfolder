import { create } from 'zustand';
import { AppState, FileItem, MovePlan, MoveLogEntry } from '@shared/types';
import { scanDownloads, buildOrganizationPlan, organizeFiles, undoOrganization } from '@/services/api';

interface KleanStore {
  status: AppState;
  files: FileItem[];
  plan: MovePlan[];
  lastMoveLogs: MoveLogEntry[];
  progress: number;
  error: string | null;
  startScan: () => Promise<void>;
  startOrganize: () => Promise<void>;
  startUndo: () => Promise<void>;
  reset: () => void;
}

export const useAppStore = create<KleanStore>((set, get) => ({
  status: 'idle',
  files: [],
  plan: [],
  lastMoveLogs: [],
  progress: 0,
  error: null,

  startScan: async () => {
    set({ status: 'scanning', error: null, progress: 0 });
    const interval = setInterval(() => set(s => ({ progress: Math.min(s.progress + 15, 80) })), 300);

    const scanResult = await scanDownloads();
    if (!scanResult.success) {
      clearInterval(interval);
      return set({ status: 'error', error: scanResult.error, progress: 0 });
    }

    const planResult = await buildOrganizationPlan(scanResult.data);
    clearInterval(interval);

    if (!planResult.success) {
      return set({ status: 'error', error: planResult.error, progress: 0 });
    }
    
    set({ progress: 100 });
    setTimeout(() => set({ status: 'preview', files: scanResult.data, plan: planResult.data, progress: 0 }), 400);
  },

  startOrganize: async () => {
    const { plan } = get();
    set({ status: 'organizing', error: null, progress: 0 });
    const interval = setInterval(() => set(s => ({ progress: Math.min(s.progress + 20, 85) })), 250);

    const result = await organizeFiles(plan);
    clearInterval(interval);

    if (result.success) {
      set({ progress: 100, lastMoveLogs: result.data });
      setTimeout(() => set({ status: 'success', progress: 0 }), 400);
    } else {
      set({ status: 'error', error: result.error, progress: 0 });
    }
  },

  startUndo: async () => {
    const { lastMoveLogs } = get();
    set({ status: 'undoing', error: null, progress: 0 });
    const interval = setInterval(() => set(s => ({ progress: Math.min(s.progress + 15, 90) })), 250);

    const result = await undoOrganization(lastMoveLogs);
    clearInterval(interval);

    if (result.success) {
      set({ progress: 100 });
      // Reset back to idle completely after undo
      setTimeout(() => set({ status: 'idle', files: [], plan: [], lastMoveLogs: [], progress: 0 }), 400);
    } else {
      set({ status: 'error', error: result.error, progress: 0 });
    }
  },

  reset: () => set({ status: 'idle', files: [], plan: [], progress: 0, error: null }),
}));
