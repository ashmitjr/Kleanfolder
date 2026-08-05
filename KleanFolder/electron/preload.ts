import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  scanDownloads: () => ipcRenderer.invoke('scan-downloads'),
  buildOrganizationPlan: (files: any) => ipcRenderer.invoke('build-plan', files),
  organizeFiles: (plan: any) => ipcRenderer.invoke('organize-files', plan),
  undoOrganization: (logs: any) => ipcRenderer.invoke('undo-organization', logs),
});
