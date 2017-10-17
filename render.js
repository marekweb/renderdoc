const ReactDOMServer = require('react-dom/server');
const ReactDOMFactories = require('react-dom-factories');
const pretty = require('pretty');
const fs = require('fs-extra');
const frontMatter = require('front-matter');

const parseXmlDocument = require('./parse-xml-document');
const loadEntireDirectory = require('./load-entire-directory');
const convertTreeToReact = require('./convert-tree-to-react');

async function render(documentPath, componentsPath, rootComponentName) {
  const components = await loadEntireDirectory(componentsPath);
  let rootComponent = components[rootComponentName];
  if (!rootComponent && ReactDOMFactories[rootComponentName]) {
    rootComponent = rootComponentName;
  }

  if (!rootComponent) {
    throw new Error(
      `rootComponentName value "${rootComponentName}" not found in components path "${componentsPath}"`
    );
  }

  const source = await fs.readFile(documentPath, 'utf-8');

  const { attributes, body } = frontMatter(source);

  const htmlOutput = convertHtmlToRenderedHtml({
    source: body,
    components,
    rootComponent,
    propsForRootComponent: attributes
  });

  const htmlOutputWithDoctype = '<!doctype html>' + htmlOutput;

  return pretty(htmlOutputWithDoctype, { ocd: true });
}

function convertHtmlToRenderedHtml(options) {
  const element = convertHtmlToReactElement(options);
  const output = ReactDOMServer.renderToStaticMarkup(element);
  return output;
}

function convertHtmlToReactElement(options) {
  const tree = parseXmlDocument(options.source);
  return convertTreeToReact(
    tree,
    options.components,
    options.rootComponent,
    options.propsForRootComponent
  );
}

module.exports = render;
