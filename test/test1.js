const {test} = require('ava');
const renderdoc = require('../index.js');

test('buildSite exists', t => {
    t.truthy(renderdoc.buildSite);
});

test('throw an error if called with no options', async t => {
    await t.throws(renderdoc.buildSite());
});
