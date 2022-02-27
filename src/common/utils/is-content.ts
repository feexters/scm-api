import { getFileExtension } from './index';

const VALID_CONTENT_EXTENSIONS = ['mp4', 'm4a', 'mov', 'jpg', 'jpeg', 'png', 'mp3', 'wma', 'avi', 'html', 'aac'];

export const isContent = (filename: string): boolean => {
  const ext = getFileExtension(filename);

  if (ext && VALID_CONTENT_EXTENSIONS.includes(ext.toLowerCase())) {
    return true;
  }

  return false;
};
