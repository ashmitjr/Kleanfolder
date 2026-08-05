import { ipcMain } from 'electron';
import { scanDownloadsFolder, buildOrganizationPlan, executeOrganization, undoOrganization } from '../services/file.service';

export function setupIPC() {
  ipcMain.handle('scan-downloads', async () => await scanDownloadsFolder());
  ipcMain.handle('build-plan', async (_, files) => await buildOrganizationPlan(files));
  ipcMain.handle('organize-files', async (_, plan) => await executeOrganization(plan));
  ipcMain.handle('undo-organization', async (_, logs) => await undoOrganization(logs));
}
