const { test } = require('ava');
const React = require('react');
const renderComponentToString = require('../src/render-component-to-string');

test('render component to string', t => {
  const input = `<p>The <b>quick</b> <i>fox</i> jumped over the lazy dog.</p>`;
  const output = renderComponentToString({ source: input });
  t.is(output, '<!doctype html>' + input);
});

function TestComponentOne({ children }) {
  return React.createElement('p', { className: 'one' }, children);
}

test('render with parent component', t => {
  const input = `<p>The <b>quick</b> <i>fox</i> jumped over the lazy dog.</p>`;
  const components = TestComponentOne;
  const output = renderComponentToString({
    source: input,
    parentComponent: components
  });
  t.is(
    output,
    '<!doctype html><p class="one"><p>The <b>quick</b> <i>fox</i> jumped over the lazy dog.</p></p>'
  );
});

test('render without doc type', t => {
  const input = `<p>The <b>quick</b> <i>fox</i> jumped over the lazy dog.</p>`;
  const components = TestComponentOne;
  const withDocType = false;
  const output = renderComponentToString({
    withDoctype: withDocType,
    source: input,
    parentComponent: components
  });
  console.log(output);
  t.is(
    output,
    '<p class="one"><p>The <b>quick</b> <i>fox</i> jumped over the lazy dog.</p></p>'
  );
});
