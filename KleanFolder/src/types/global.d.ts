import { FileItem, MovePlan, MoveLogEntry, Result } from '@shared/types';

declare global {
  interface Window {
    electron?: {
      scanDownloads: () => Promise<Result<FileItem[]>>;
      buildOrganizationPlan: (files: FileItem[]) => Promise<Result<MovePlan[]>>;
      organizeFiles: (plan: MovePlan[]) => Promise<Result<MoveLogEntry[]>>;
      undoOrganization: (logs: MoveLogEntry[]) => Promise<Result<boolean>>;
    };
  }
}
export {};
