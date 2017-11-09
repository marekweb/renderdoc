const parseXmlString = require('./parse-xml-string');
const PropTypes = require('prop-types');
const convertNodeToReact = require('./convert-node-to-react');

function renderComponent(props) {
  const nodes = parseXmlString(props.source);
  const elements = nodes.map(node => {
    return convertNodeToReact(node, props.components);
  });

  return elements;
}

renderComponent.propTypes = {
  source: PropTypes.string.isRequired,
  components: PropTypes.object.isRequired
};
module.exports = renderComponent;
