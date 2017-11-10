const parseXmlString = require('./parse-xml-string');
const PropTypes = require('prop-types');
const convertNodeToReactElement = require('./convert-node-to-react-element');

function renderComponent(props) {
  const { source = '', components = {} } = props;
  const nodes = parseXmlString(source);
  const elements = nodes.map(node => convertNodeToReactElement(node, components));

  return elements;
}

renderComponent.propTypes = {
  source: PropTypes.string,
  components: PropTypes.object
};
module.exports = renderComponent;
