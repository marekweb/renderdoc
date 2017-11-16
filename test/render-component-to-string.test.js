const { test } = require('ava');
const renderComponentToString = require('../src/render-component-to-string');

test('render component to string', t => {
  const input = `<p>The <b>quick</b> <i>fox</i> jumped over the lazy dog.</p>`;
  const output = renderComponentToString({ source: input });
  t.is(output, '<!doctype html>' + input);
});
