import { MarkdownSvc } from '../src/services/markdown.service';
import { readFileSync } from 'fs';

const filesToProcess = [
  // 'plain.md',
  // 'links.md',
  // 'link.md',
  // 'codeblocks.md',
  // 'custom-attributes.md',
  'frontmatter-3.md',
  'frontmatter-2.md',
  'frontmatter.md',
];

filesToProcess.forEach(async (name) => {
  const fileContent = readFileSync(__dirname + '/mocks/' + name);
  const result = await MarkdownSvc.process(String(fileContent), { shortName: name.replace('.md', '') });
  console.log(`============== ${name} =================`);
  console.log(result)
  console.log(`============ end: ${name} ==============`);
  console.log('');
});