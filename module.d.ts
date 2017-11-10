type ParsedXmlNode = ParsedXmlNodeElement | ParsedXmlNodeText;

type ParsedXmlNodeElement = {
    type: 'element';
    tag: string;
    attributes: {[x: string]: string};
    children: ParsedXmlNode;
}

type ParsedXmlNodeText = {
    type: 'text'
    text: string
}
