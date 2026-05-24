import * as path from 'path';
import { Workflow } from '../models';
import { getWorkspaceAgentsDirectory } from '../utils/paths';
import { safeReadDir, safeReadFile } from '../utils/fileSystem';
import { parseMarkdown, extractTitle } from '../utils/markdownParser';

export async function getWorkflows(): Promise<Workflow[]> {
  const agentsDir = getWorkspaceAgentsDirectory();
  if (!agentsDir) {
    return [];
  }
  const workflowsDir = path.join(agentsDir, 'workflows');
  const files = await safeReadDir(workflowsDir);
  const mdFiles = files.filter(f => f.endsWith('.md'));
  const workflows: Workflow[] = [];
  
  for (const filename of mdFiles) {
    const filePath = path.join(workflowsDir, filename);
    const rawContent = await safeReadFile(filePath) || '';
    
    const parsed = parseMarkdown(rawContent);
    const name = extractTitle(rawContent, filename);
    const slashCommand = '/' + filename.replace(/\.md$/, '');
    
    // Extract description from frontmatter or first lines
    let description = parsed.metadata.description || '';
    if (!description) {
      const paragraphs = parsed.content.split('\n\n').map(p => p.trim()).filter(Boolean);
      const firstPara = paragraphs.find(p => !p.startsWith('#') && !p.startsWith('>'));
      if (firstPara) {
        description = firstPara.substring(0, 150) + (firstPara.length > 150 ? '...' : '');
      } else {
        description = 'Agent workflow guide.';
      }
    }
    
    workflows.push({
      name,
      slashCommand,
      filename,
      description,
      content: rawContent,
      sourcePath: filePath
    });
  }
  
  return workflows.sort((a, b) => a.slashCommand.localeCompare(b.slashCommand));
}
