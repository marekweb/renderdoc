const renderComponent = require('./render-component');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

/**
 * @param {Object} options
 * @param {string} options.source 
 * @param {Object<string, React.DetailedReactHTMLElement>} options.components 
 * @param {React.Component<T>} options.parentComponent 
 * @param {Object<string, T>} options.parentComponentProps 
 * @param {boolean} options.withDoctype 
 */
function renderComponentToString({
  source,
  components,
  parentComponent,
  parentComponentProps,
  withDoctype = true
}) {
  let element = renderComponent({ source, components });
  if (parentComponent) {
    element = React.createElement(parentComponent, parentComponentProps, [
      element
    ]);
  }
  const html = ReactDOMServer.renderToStaticMarkup(element);
  if (withDoctype) {
    return '<!doctype html>' + html;
  }

  return html;
}

module.exports = renderComponentToString;
