import * as path from 'path';
import { KnowledgeItem, KnowledgeArtifact } from '../models';
import { getKnowledgeDirectory } from '../utils/paths';
import { getSubDirectories, safeReadJson, safeReadFile, safeReadDir } from '../utils/fileSystem';

export async function getKnowledgeItems(): Promise<KnowledgeItem[]> {
  const knowDir = getKnowledgeDirectory();
  const subdirs = await getSubDirectories(knowDir);
  const items: KnowledgeItem[] = [];
  
  for (const id of subdirs) {
    const basePath = path.join(knowDir, id);
    const metadataPath = path.join(basePath, 'metadata.json');
    const metadata = await safeReadJson<any>(metadataPath);
    
    if (metadata) {
      const title = metadata.title || id;
      const summary = metadata.summary || 'No summary available.';
      const lastAccessed = metadata.last_accessed || metadata.timestamp || '';
      
      const references: string[] = Array.isArray(metadata.references) ? metadata.references : [];
      
      // Look for files in artifacts folder
      const artifactsDir = path.join(basePath, 'artifacts');
      const artifactsFiles = await safeReadDir(artifactsDir);
      
      items.push({
        id,
        title,
        summary,
        lastAccessed,
        references,
        artifactPaths: artifactsFiles.filter(f => !f.startsWith('.')),
        basePath
      });
    }
  }
  
  // Sort by lastAccessed descending
  return items.sort((a, b) => {
    return new Date(b.lastAccessed || 0).getTime() - new Date(a.lastAccessed || 0).getTime();
  });
}

export async function getKnowledgeArtifact(kiId: string, relativePath: string): Promise<string | null> {
  const knowDir = getKnowledgeDirectory();
  const artifactFullPath = path.join(knowDir, kiId, 'artifacts', relativePath);
  return await safeReadFile(artifactFullPath);
}
