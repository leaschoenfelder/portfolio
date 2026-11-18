/* Game titles are set in italics wherever they appear in running text
   (paragraphs, captions, credits, notes). Headings and navigation stay upright.
   Use with set:html — the text is escaped first. */
const TITLES = ['Monument Valley 2', 'Monument Valley', 'Perfect Woman', 'Assemble with Care', 'Finding Hannah', 'Try Again'];
const re = new RegExp(`(${TITLES.join('|')})`, 'g');
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const it = (s?: string) => (s ? esc(s).replace(re, '<em>$1</em>') : '');
