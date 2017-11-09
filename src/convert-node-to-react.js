const React = require('react');
const ReactDOMFactories = require('react-dom-factories');
const { get } = require('lodash');

function convertNodeToReact(node, componentMap) {
  if (node.type === 'text') {
    return node.text;
  }

  if (node.type != 'element') {
    throw new Error('nodeToReact needs an element node');
  }

  // by using `get` we allow paths, like `A.B`
  // TODO: allow paths where `A.B` can also refer to directory path `A/B.js`
  let component = get(componentMap, node.tag);

  if (!component) {
    if (ReactDOMFactories[node.tag]) {
      component = node.tag;
    } else {
      throw new Error(
        `Cannot create component from unknown tag <${
          node.tag
        }> (case sensitive)`
      );
    }
  }

  const children = node.children.map(child =>
    convertNodeToReact(child, componentMap)
  );
  return React.createElement(component, node.attributes, children);
}

module.exports = convertNodeToReact;
