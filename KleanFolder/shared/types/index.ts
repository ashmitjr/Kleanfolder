export type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

export type AppState = 'idle' | 'scanning' | 'preview' | 'organizing' | 'undoing' | 'success' | 'error';

export interface FileItem {
  id: string;
  name: string;
  path: string;
  size: number;
  extension: string;
  category: string;
  modifiedAt: string;
}

export interface MovePlan {
  id: string;
  name: string;
  fromPath: string;
  toPath: string;
  category: string;
  displayTo: string;
}

export interface MoveLogEntry {
  fromPath: string;
  toPath: string;
}
