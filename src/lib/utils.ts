import { JSONContent } from "@tiptap/react"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date) {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const hour = String(d.getHours()).padStart(2, '0')
  const minute = String(d.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} ${hour}:${minute}`
}

export function linkifyText(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part) => {
    if (part.match(urlRegex)) {
      return `<a href="${part}" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">${part}</a>`;
    }
    return part;
  }).join('');
}

export function extractTitleAndDescription(json: JSONContent) {
  let title = '';
  let description = '';

  if (json.type === 'doc' && json.content) {
    const headingNode = json.content.find(node => node.type === 'heading' && node.attrs?.level === 1);
    if (headingNode && headingNode.content) {
      title = headingNode.content.map(contentNode => contentNode.text || '').join('');
    }
    const paragraphNode = json.content.find(node => node.type === 'paragraph');
    if (paragraphNode && paragraphNode.content) {
      description = paragraphNode.content.map(contentNode => contentNode.text || '').join('');
    }
  }
  return { title, description };
}
