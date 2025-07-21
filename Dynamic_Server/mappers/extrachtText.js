import { JSDOM } from 'jsdom';

export function extractTextFromHtml(htmlString) {
  const dom = new JSDOM(htmlString);
  return dom.window.document.body.textContent.trim();
}
