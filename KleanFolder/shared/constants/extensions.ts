export const CATEGORY_MAP: Record<string, string> = {
  '.pdf': 'Documents', '.doc': 'Documents', '.docx': 'Documents', '.txt': 'Documents',
  '.jpg': 'Images', '.jpeg': 'Images', '.png': 'Images', '.gif': 'Images', '.webp': 'Images',
  '.mp4': 'Videos', '.mkv': 'Videos', '.mov': 'Videos',
  '.mp3': 'Audio', '.wav': 'Audio',
  '.exe': 'Executables', '.dmg': 'Executables', '.msi': 'Executables',
  '.zip': 'Archives', '.tar': 'Archives', '.gz': 'Archives', '.rar': 'Archives'
};

export const getCategoryForExtension = (ext: string): string => {
  return CATEGORY_MAP[ext.toLowerCase()] || 'Others';
};
