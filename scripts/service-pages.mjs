import { readFile, writeFile, mkdir } from 'node:fs/promises';
const html = await readFile('dist/index.html', 'utf8');
const source = await readFile('src/lib/services.ts', 'utf8');
// Values come from the same content file used by React.
const entries = [...source.matchAll(/'\/(.*?)': \{\s*label: '(.*?)', title: '(.*?)',\s*description: '(.*?)',/gs)];
if (entries.length !== 3) throw new Error('Expected three service pages');
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');
for (const [, slug, , title, description] of entries) {
  const page = html.replace(/<title>.*?<\/title>/s, `<title>${escape(title)} | Castro Alves</title>`)
    .replace(/(<meta name="description" content=")[^"]*/, `$1${escape(description)}`)
    .replace(/(<link rel="canonical" href=")[^"]*/, (_, prefix) => prefix + new URL(slug, 'https://castroalves-elegance-landing.lovable.app/').href);
  await mkdir(`dist/${slug}`, { recursive: true });
  await writeFile(`dist/${slug}/index.html`, page);
}
console.log('Three service entry pages generated.');
