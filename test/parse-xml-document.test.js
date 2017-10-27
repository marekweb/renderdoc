const { test } = require('ava');
const parseXmlDocument = require('../parse-xml-document');

const input = `
<Header>My Life Story</Header>

<Chapter title="The Beginning">
  It was a dark and stormy night.
</Chapter>
`;

test('test parseXmlDocument', t => {
  const output = parseXmlDocument(input);
  t.snapshot(output);
});

test('parseXmlDocument should throw an error on invalid input', t => {
  t.throws(function() {
    const output = parseXmlDocument();
  });
});
