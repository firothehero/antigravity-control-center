import * as fs from 'fs/promises';
import * as path from 'path';

export async function safeReadDir(dirPath: string): Promise<string[]> {
  try {
    return await fs.readdir(dirPath);
  } catch (error) {
    return [];
  }
}

export async function safeReadFile(filePath: string): Promise<string | null> {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    return null;
  }
}

export async function safeReadJson<T>(filePath: string): Promise<T | null> {
  const content = await safeReadFile(filePath);
  if (!content) {
    return null;
  }
  try {
    return JSON.parse(content) as T;
  } catch (error) {
    return null;
  }
}

export async function directoryExists(dirPath: string): Promise<boolean> {
  try {
    const stat = await fs.stat(dirPath);
    return stat.isDirectory();
  } catch (error) {
    return false;
  }
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    const stat = await fs.stat(filePath);
    return stat.isFile();
  } catch (error) {
    return false;
  }
}

export async function getSubDirectories(dirPath: string): Promise<string[]> {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    return entries
      .filter(entry => entry.isDirectory() && !entry.name.startsWith('.'))
      .map(entry => entry.name);
  } catch (error) {
    return [];
  }
}

export interface FileStatInfo {
  createdAt: Date;
  modifiedAt: Date;
  size: number;
}

export async function getFileStat(filePath: string): Promise<FileStatInfo | null> {
  try {
    const stat = await fs.stat(filePath);
    return {
      createdAt: stat.birthtime,
      modifiedAt: stat.mtime,
      size: stat.size
    };
  } catch (error) {
    return null;
  }
}
