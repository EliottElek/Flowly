import { mdxAnnotations } from 'mdx-annotations'
import remarkGfm from 'remark-gfm'
import remarkToc from "remark-toc";

export const remarkPlugins = [mdxAnnotations.remark, remarkGfm, remarkToc]
