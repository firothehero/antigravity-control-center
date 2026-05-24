import * as path from 'path';
import { Rule } from '../models';
import { getWorkspaceAgentsDirectory } from '../utils/paths';
import { safeReadDir, safeReadFile } from '../utils/fileSystem';
import { extractTitle } from '../utils/markdownParser';

export async function getRules(): Promise<Rule[]> {
  const agentsDir = getWorkspaceAgentsDirectory();
  if (!agentsDir) {
    return [];
  }
  const rulesDir = path.join(agentsDir, 'rules');
  const files = await safeReadDir(rulesDir);
  const mdFiles = files.filter(f => f.endsWith('.md'));
  const rules: Rule[] = [];
  
  for (const filename of mdFiles) {
    const filePath = path.join(rulesDir, filename);
    const rawContent = await safeReadFile(filePath) || '';
    
    const name = extractTitle(rawContent, filename);
    
    // Generate text preview (strip markdown symbols)
    const stripped = rawContent
      .replace(/[#*`_\[\]()]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    const preview = stripped.substring(0, 200) + (stripped.length > 200 ? '...' : '');
    
    rules.push({
      name,
      filename,
      content: rawContent,
      sourcePath: filePath,
      preview,
      scope: 'workspace'
    });
  }
  
  return rules.sort((a, b) => a.name.localeCompare(b.name));
}
