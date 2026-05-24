import * as path from 'path';
import { Agent } from '../models';
import { getWorkspaceAgentsDirectory } from '../utils/paths';
import { getSubDirectories, safeReadFile, safeReadDir, fileExists } from '../utils/fileSystem';
import { parseMarkdown } from '../utils/markdownParser';

export async function getAgents(): Promise<Agent[]> {
  const agentsDir = getWorkspaceAgentsDirectory();
  if (!agentsDir) {
    return [];
  }
  const agentsConfigDir = path.join(agentsDir, 'agents');
  
  // Sometimes agents are in subfolders or just markdown files directly inside agentsDir/agents
  const files = await safeReadDir(agentsConfigDir);
  const agentFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.yaml') || f.endsWith('.yml'));
  const agents: Agent[] = [];
  
  for (const filename of agentFiles) {
    const filePath = path.join(agentsConfigDir, filename);
    const rawContent = await safeReadFile(filePath) || '';
    const parsed = parseMarkdown(rawContent);
    
    // Parse properties from frontmatter
    const name = parsed.metadata.name || filename.replace(/\.(md|yaml|yml)$/, '');
    const description = parsed.metadata.description || '';
    const model = parsed.metadata.model || '';
    
    // Parse skills and tools
    let skills: string[] = [];
    if (Array.isArray(parsed.metadata.skills)) {
      skills = parsed.metadata.skills;
    } else if (typeof parsed.metadata.skills === 'string') {
      skills = parsed.metadata.skills.split(',').map((s: string) => s.trim());
    }
    
    let tools: string[] = [];
    if (Array.isArray(parsed.metadata.tools)) {
      tools = parsed.metadata.tools;
    } else if (typeof parsed.metadata.tools === 'string') {
      tools = parsed.metadata.tools.split(',').map((t: string) => t.trim());
    }
    
    agents.push({
      name,
      description,
      model,
      skills,
      tools,
      sourcePath: filePath,
      content: parsed.content
    });
  }
  
  return agents.sort((a, b) => a.name.localeCompare(b.name));
}
