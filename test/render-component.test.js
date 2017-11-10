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
  const source = 'The quick <p>brown</p> fox';
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
