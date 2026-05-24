import * as path from 'path';
import { Skill } from '../models';
import { getWorkspaceAgentsDirectory, getGlobalPluginsDirectory } from '../utils/paths';
import { getSubDirectories, safeReadFile, safeReadDir, fileExists } from '../utils/fileSystem';
import { parseMarkdown } from '../utils/markdownParser';

export async function getWorkspaceSkills(): Promise<Skill[]> {
  const agentsDir = getWorkspaceAgentsDirectory();
  if (!agentsDir) {
    return [];
  }
  const skillsDir = path.join(agentsDir, 'skills');
  const subdirs = await getSubDirectories(skillsDir);
  const skills: Skill[] = [];
  
  for (const name of subdirs) {
    const skillPath = path.join(skillsDir, name);
    const skillMdPath = path.join(skillPath, 'SKILL.md');
    
    if (!(await fileExists(skillMdPath))) {
      continue;
    }
    
    const rawContent = await safeReadFile(skillMdPath) || '';
    const parsed = parseMarkdown(rawContent);
    
    const files = await safeReadDir(skillPath);
    const hasScripts = files.includes('scripts');
    const hasExamples = files.includes('examples');
    const hasReferences = files.includes('references');
    
    skills.push({
      name: parsed.metadata.name || name,
      description: parsed.metadata.description || 'No description provided.',
      source: 'workspace',
      sourcePath: skillPath,
      content: parsed.content,
      hasScripts,
      hasExamples,
      hasReferences,
      files: files.filter(f => !f.startsWith('.'))
    });
  }
  
  return skills;
}

export async function getGlobalSkills(): Promise<Skill[]> {
  const pluginsDir = getGlobalPluginsDirectory();
  const plugins = await getSubDirectories(pluginsDir);
  const skills: Skill[] = [];
  
  for (const pluginName of plugins) {
    const skillsDir = path.join(pluginsDir, pluginName, 'skills');
    const subdirs = await getSubDirectories(skillsDir);
    
    for (const name of subdirs) {
      const skillPath = path.join(skillsDir, name);
      const skillMdPath = path.join(skillPath, 'SKILL.md');
      
      if (!(await fileExists(skillMdPath))) {
        continue;
      }
      
      const rawContent = await safeReadFile(skillMdPath) || '';
      const parsed = parseMarkdown(rawContent);
      
      const files = await safeReadDir(skillPath);
      const hasScripts = files.includes('scripts');
      const hasExamples = files.includes('examples');
      const hasReferences = files.includes('references');
      
      skills.push({
        name: parsed.metadata.name || name,
        description: parsed.metadata.description || 'No description provided.',
        source: 'plugin',
        pluginName,
        sourcePath: skillPath,
        content: parsed.content,
        hasScripts,
        hasExamples,
        hasReferences,
        files: files.filter(f => !f.startsWith('.'))
      });
    }
  }
  
  return skills;
}

export async function getAllSkills(): Promise<Skill[]> {
  const workspaceSkills = await getWorkspaceSkills();
  const globalSkills = await getGlobalSkills();
  
  return [...workspaceSkills, ...globalSkills].sort((a, b) => a.name.localeCompare(b.name));
}

export async function getSkillDetail(sourcePath: string): Promise<Skill | null> {
  const skillMdPath = path.join(sourcePath, 'SKILL.md');
  const rawContent = await safeReadFile(skillMdPath);
  
  if (!rawContent) {
    return null;
  }
  
  const parsed = parseMarkdown(rawContent);
  const files = await safeReadDir(sourcePath);
  
  const hasScripts = files.includes('scripts');
  const hasExamples = files.includes('examples');
  const hasReferences = files.includes('references');
  
  const isWorkspace = sourcePath.includes('.agents');
  
  return {
    name: parsed.metadata.name || path.basename(sourcePath),
    description: parsed.metadata.description || 'No description provided.',
    source: isWorkspace ? 'workspace' : 'plugin',
    sourcePath,
    content: parsed.content,
    hasScripts,
    hasExamples,
    hasReferences,
    files: files.filter(f => !f.startsWith('.'))
  };
}
