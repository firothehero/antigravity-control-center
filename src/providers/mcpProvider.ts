import * as path from 'path';
import { McpServer, McpTool } from '../models';
import { getMcpDirectory } from '../utils/paths';
import { getSubDirectories, safeReadDir, safeReadFile, safeReadJson, fileExists } from '../utils/fileSystem';

export async function getMcpServers(): Promise<McpServer[]> {
  const mcpDir = getMcpDirectory();
  const subdirs = await getSubDirectories(mcpDir);
  const servers: McpServer[] = [];
  
  for (const name of subdirs) {
    const serverPath = path.join(mcpDir, name);
    const files = await safeReadDir(serverPath);
    
    const eagerTools: McpTool[] = [];
    const lazyTools: McpTool[] = [];
    
    // Look for tool JSON files
    const jsonFiles = files.filter(f => f.endsWith('.json') && f !== 'package.json');
    
    for (const jsonFile of jsonFiles) {
      const toolFilePath = path.join(serverPath, jsonFile);
      const schema = await safeReadJson<any>(toolFilePath);
      
      if (schema) {
        const toolName = schema.name || jsonFile.replace(/\.json$/, '');
        const description = schema.description || 'No description provided.';
        const parameters = schema.parameters || schema.inputSchema || {};
        
        // Eager tools vs lazy tools
        // By convention, we can determine this or default to lazy since most tools in MCPs here are lazy
        // unless they are marked eager or configured as such. Let's check schema.isEager or default.
        const isEager = schema.isEager || false;
        
        const tool: McpTool = {
          name: toolName,
          description,
          parameters,
          isEager
        };
        
        if (isEager) {
          eagerTools.push(tool);
        } else {
          lazyTools.push(tool);
        }
      }
    }
    
    const instructionsPath = path.join(serverPath, 'instructions.md');
    const hasInstructions = await fileExists(instructionsPath);
    let instructions = undefined;
    if (hasInstructions) {
      instructions = await safeReadFile(instructionsPath) || undefined;
    }
    
    servers.push({
      name,
      toolCount: eagerTools.length + lazyTools.length,
      eagerTools,
      lazyTools,
      hasInstructions,
      instructions
    });
  }
  
  // Sort servers alphabetically
  return servers.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getMcpToolDetail(serverName: string, toolName: string): Promise<McpTool | null> {
  const mcpDir = getMcpDirectory();
  const toolFilePath = path.join(mcpDir, serverName, `${toolName}.json`);
  
  const schema = await safeReadJson<any>(toolFilePath);
  if (!schema) {
    return null;
  }
  
  return {
    name: schema.name || toolName,
    description: schema.description || 'No description provided.',
    parameters: schema.parameters || schema.inputSchema || {},
    isEager: schema.isEager || false
  };
}

export async function searchMcpTools(query: string): Promise<{ server: string; tool: McpTool }[]> {
  const servers = await getMcpServers();
  const results: { server: string; tool: McpTool }[] = [];
  
  if (!query) {
    return [];
  }
  
  const lowerQuery = query.toLowerCase();
  
  for (const server of servers) {
    const allTools = [...server.eagerTools, ...server.lazyTools];
    for (const tool of allTools) {
      if (
        tool.name.toLowerCase().includes(lowerQuery) ||
        tool.description.toLowerCase().includes(lowerQuery)
      ) {
        results.push({
          server: server.name,
          tool
        });
      }
    }
  }
  
  return results;
}
