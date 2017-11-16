const { test } = require('ava');
const renderComponent = require('../src/render-component');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
import render from 'react-test-renderer';

test('render blank source', t => {
  const source = '';
  const element = React.createElement(renderComponent, { source });
  const rendered = render.create(element).toJSON();
  t.snapshot(rendered);
});

test('render undefined source', t => {
  const element = React.createElement(renderComponent, {});
  const rendered = render.create(element).toJSON();
  t.snapshot(rendered);
});

test('render plain text source', t => {
  const source = 'The quick brown fox';
  const element = React.createElement(renderComponent, { source });
  const rendered = render.create(element).toJSON();
  t.snapshot(rendered);
});

test('render plain HTML source', t => {
  const source = 'The <i>quick <b>brown</b></i> fox<br/>';
  const element = React.createElement(renderComponent, { source });
  const rendered = render.create(element).toJSON();
  t.snapshot(rendered);
});

test('render source with a comment', t => {
  const source = 'The <!--quick brown--> fox';
  const element = React.createElement(renderComponent, { source });
  const rendered = render.create(element).toJSON();
  t.snapshot(rendered);
});

function TestComponentOne({ children }) {
  return React.createElement('p', {className:'one'}, children);
}

test('render  with a custom component', t => {
  const source = 'The <TestComponentOne>quick brown</TestComponentOne> fox';
  const components = {
    TestComponentOne
  };
  const element = React.createElement(renderComponent, { source,  components });
  const rendered = render.create(element).toJSON();
  t.snapshot(rendered);
});
