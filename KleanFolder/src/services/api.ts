import { FileItem, MovePlan, MoveLogEntry, Result } from '@shared/types';

export const scanDownloads = async (): Promise<Result<FileItem[]>> => {
  if (window.electron) return await window.electron.scanDownloads();
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    success: true,
    data: [
      { id: '1', name: 'Resume.pdf', path: '/mock/Resume.pdf', size: 1024, extension: '.pdf', category: 'Documents', modifiedAt: new Date().toISOString() },
      { id: '2', name: 'photo.png', path: '/mock/photo.png', size: 3048, extension: '.png', category: 'Images', modifiedAt: new Date().toISOString() },
    ]
  };
};

export const buildOrganizationPlan = async (files: FileItem[]): Promise<Result<MovePlan[]>> => {
  if (window.electron) return await window.electron.buildOrganizationPlan(files);
  const plan = files.map(f => ({
    id: f.id,
    name: f.name,
    fromPath: f.path,
    toPath: `/mock/${f.category}/${f.name}`,
    category: f.category,
    displayTo: `${f.category}/${f.name}`
  }));
  return { success: true, data: plan };
};

export const organizeFiles = async (plan: MovePlan[]): Promise<Result<MoveLogEntry[]>> => {
  if (window.electron) return await window.electron.organizeFiles(plan);
  await new Promise(resolve => setTimeout(resolve, 2000));
  const logs = plan.map(p => ({ fromPath: p.fromPath, toPath: p.toPath }));
  return { success: true, data: logs };
};

export const undoOrganization = async (logs: MoveLogEntry[]): Promise<Result<boolean>> => {
  if (window.electron) return await window.electron.undoOrganization(logs);
  await new Promise(resolve => setTimeout(resolve, 2000));
  return { success: true, data: true };
};
