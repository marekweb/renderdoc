const { test } = require('ava');
const parseXmlString = require('../src/parse-xml-string');

test('accept empty string', t => {
  const result = parseXmlString('');
  t.deepEqual(result, []);
});

test('accept plain text string', t => {
  const result = parseXmlString('Hello, convoluted world.');
  const expected = [{ type: 'text', text: 'Hello, convoluted world.' }];
  t.deepEqual(result, expected);
});

test('reject undefined input', t => {
  t.throws(function() {
    parseXmlString(undefined);
  }, 'parseXmlString expected a string, instead got undefined');
});

test('accept a simple root node', t => {
  const result = parseXmlString('<p>The quick brown fox.</p>');
  const expected = [
    {
      type: 'element',
      tag: 'p',
      attributes: {},
      children: [{ type: 'text', text: 'The quick brown fox.' }]
    }
  ];
  t.deepEqual(result, expected);
});

test('accept a node with attributes', t => {
  const result = parseXmlString('<button id="confirm">OK</button>');
  const expected = [
    {
      type: 'element',
      tag: 'button',
      attributes: { id: 'confirm' },
      children: [{ type: 'text', text: 'OK' }]
    }
  ];
  t.deepEqual(result, expected);
});

test('accept a self-closing tag', t => {
  const result = parseXmlString('<br/>');
  const expected = [
    { type: 'element', tag: 'br', attributes: {}, children: [] }
  ];
  t.deepEqual(result, expected);
});

test('snapshot with multiple root nodes', t => {
  const input = `
    <p>One</p>
    <p>Two</p>
    <p>Three</p>`;
  const result = parseXmlString(input);
  t.snapshot(result);
});

test('snapshot with a complete document', t => {
  const input = `
    <Header type="important">My Life Story</Header>
    <!-- note to editor -->
    <Chapter title="The Beginning">
      <p mood="stormy" typography="dark">It was a <b>dark and stormy</b> night.</p>
      <Chapter.Icon icon="exclamation" />
      <p typography="fancy">The quick brown fox jumped over the lazy dog.</p>
    </Chapter>
    `;
  const result = parseXmlString(input);
  t.snapshot(result);
});
