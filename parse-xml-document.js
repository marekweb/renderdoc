const sax = require('sax');

const parser = sax.parser(true);

let stack;

parser.onopentag = function(tag) {
  const node = {
    type: 'element',
    tag: tag.name,
    attributes: tag.attributes,
    children: []
  };

  const top = getStackTop();
  top.children.push(node);
  stack.push(node);
};

parser.ontext = function(t) {
  const node = {
    type: 'text',
    text: t
  };

  const top = getStackTop();
  top.children.push(node);
};

parser.onclosetag = function() {
  stack.pop();
};

parser.onend = function() {};

function getStackTop() {
  return stack[stack.length - 1];
}

/**
 * 
 * @param {string} document 
 * @return {ParsedXmlNode[]} Array of nodes in the root of the document
 */
function parseHtml(document) {
  if (!document || !document.length) {
    throw new Error(`parseHtml expected a document, instead got ${document}`);
  }

  // This node corresponds to the dummy <root> element that wraps the document.
  const root = { children: [] };
  stack = [root];
  // Wrap the document in a <root> element in order to allow multiple root children.
  // We return the children of the root
  parser.write('<root>');
  parser.write(document);
  parser.write('</root>');
  parser.close();

  // Because we added a dummy root, we have to select it, and then return its children.
  return root.children[0].children;
}

module.exports = parseHtml;
