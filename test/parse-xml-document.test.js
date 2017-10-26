const {test} = require('ava');
const parseXmlDocument = require('../parse-xml-document');

const input = `
<Header>My Life Story</Header>

<Chapter title="The Beginning">
  It was a dark and stormy night.
</Chapter>
`;

const expectedOutput = [
    {
        "type": "text",
        "text": "\n"
    },
    {
        "type": "element",
        "tag": "Header",
        "attributes": {},
        "children": [
            {
                "type": "text",
                "text": "My Life Story"
            }
        ]
    },
    {
        "type": "text",
        "text": "\n\n"
    },
    {
        "type": "element",
        "tag": "Chapter",
        "attributes": {
            "title": "The Beginning"
        },
        "children": [
            {
                "type": "text",
                "text": "\n  It was a dark and stormy night.\n"
            }
        ]
    },
    {
        "type": "text",
        "text": "\n"
    }
];

test('test parseXmlDocument', t => {
    const output = parseXmlDocument(input);

    t.deepEqual(output, expectedOutput);
});

test('parseXmlDocument should throw an error on invalid input', t => {
    t.throws(function () {
        const output = parseXmlDocument();
    });
});
