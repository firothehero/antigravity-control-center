import matter from 'gray-matter';

export interface ParsedMarkdown {
  metadata: Record<string, any>;
  content: string;
}

export function parseMarkdown(raw: string): ParsedMarkdown {
  if (!raw) {
    return { metadata: {}, content: '' };
  }
  try {
    const { data, content } = matter(raw);
    return {
      metadata: data,
      content: content.trim()
    };
  } catch (error) {
    return {
      metadata: {},
      content: raw.trim()
    };
  }
}

export function extractTitle(raw: string, filename?: string): string {
  const parsed = parseMarkdown(raw);
  
  // Try metadata name or title first
  if (parsed.metadata.name) {
    return parsed.metadata.name;
  }
  if (parsed.metadata.title) {
    return parsed.metadata.title;
  }
  
  // Try finding first # Heading
  const headingMatch = parsed.content.match(/^#\s+(.+)$/m);
  if (headingMatch && headingMatch[1]) {
    return headingMatch[1].trim();
  }
  
  // If filename is provided, format it
  if (filename) {
    const withoutExt = filename.replace(/\.md$/, '');
    return withoutExt
      .split(/[-_]+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  // Fallback to first line or placeholder
  const firstLine = parsed.content.split('\n')[0]?.trim() || '';
  if (firstLine.length > 0) {
    return firstLine.substring(0, 50) + (firstLine.length > 50 ? '...' : '');
  }
  
  return 'Untitled Markdown';
}
