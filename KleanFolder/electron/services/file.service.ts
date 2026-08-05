import fs from 'fs/promises';
import path from 'path';
import os from 'os';
import { FileItem, MovePlan, MoveLogEntry, Result } from '../../shared/types';
import { getCategoryForExtension } from '../../shared/constants/extensions';

const getDownloadsPath = () => path.join(os.homedir(), 'Downloads');

async function getUniqueTargetPath(targetPath: string): Promise<string> {
  let finalPath = targetPath;
  let counter = 1;
  const dir = path.dirname(targetPath);
  const ext = path.extname(targetPath);
  const name = path.basename(targetPath, ext);

  while (true) {
    try {
      await fs.access(finalPath);
      finalPath = path.join(dir, `${name} (${counter})${ext}`);
      counter++;
    } catch {
      break;
    }
  }
  return finalPath;
}

export async function scanDownloadsFolder(): Promise<Result<FileItem[]>> {
  try {
    const downloadsPath = getDownloadsPath();
    const items = await fs.readdir(downloadsPath, { withFileTypes: true });
    const fileItems: FileItem[] = [];

    for (const item of items) {
      if (!item.isFile()) continue;
      const fullPath = path.join(downloadsPath, item.name);
      const stats = await fs.stat(fullPath);
      const extension = path.extname(item.name).toLowerCase();
      
      fileItems.push({
        id: Math.random().toString(36).substring(7),
        name: item.name,
        path: fullPath,
        size: stats.size,
        extension: extension || 'none',
        category: getCategoryForExtension(extension),
        modifiedAt: stats.mtime.toISOString(),
      });
    }
    return { success: true, data: fileItems };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to read Downloads directory.' };
  }
}

export async function buildOrganizationPlan(files: FileItem[]): Promise<Result<MovePlan[]>> {
  try {
    const downloadsPath = getDownloadsPath();
    const plan: MovePlan[] = files.map(file => {
      const targetDir = path.join(downloadsPath, file.category);
      const targetPath = path.join(targetDir, file.name);
      return {
        id: file.id,
        name: file.name,
        fromPath: file.path,
        toPath: targetPath,
        category: file.category,
        displayTo: `${file.category}/${file.name}`
      };
    });
    return { success: true, data: plan };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to generate plan.' };
  }
}

export async function executeOrganization(plan: MovePlan[]): Promise<Result<MoveLogEntry[]>> {
  const moveLogs: MoveLogEntry[] = [];
  try {
    for (const item of plan) {
      const targetDir = path.dirname(item.toPath);
      await fs.mkdir(targetDir, { recursive: true });
      const safeTargetPath = await getUniqueTargetPath(item.toPath);
      await fs.rename(item.fromPath, safeTargetPath);
      moveLogs.push({ fromPath: item.fromPath, toPath: safeTargetPath });
    }
    return { success: true, data: moveLogs };
  } catch (error: any) {
    console.error('[Engine] Execution Failed:', error);
    return { success: false, error: error.message || 'Failed during file relocation.' };
  }
}

// PHASE 4: The Undo Engine
export async function undoOrganization(logs: MoveLogEntry[]): Promise<Result<boolean>> {
  try {
    for (const log of logs) {
      try {
        // Verify the file is still where we put it before moving it back
        await fs.access(log.toPath);
        // Use unique path generator just in case a new file took its old spot in Downloads
        const safeOriginalPath = await getUniqueTargetPath(log.fromPath);
        await fs.rename(log.toPath, safeOriginalPath);
      } catch (e) {
        // If file is missing, the user probably deleted/moved it manually. Skip gracefully.
        console.warn(`[Engine] Could not undo file ${log.toPath}, it may have been moved.`, e);
      }
    }
    return { success: true, data: true };
  } catch (error: any) {
    console.error('[Engine] Undo Failed:', error);
    return { success: false, error: error.message || 'Failed to reverse organization.' };
  }
}
