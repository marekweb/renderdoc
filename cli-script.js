#!/usr/bin/env node

// In production mode, React does not emit warnings. This should be safe to do
// in CLI mode, but in other cases when the module is included in another
// project then messing with NODE_ENV should be avoided.
process.env.NODE_ENV = 'production';

const meow = require('meow');
const renderdoc = require('.');

const cli = meow('Usage: renderdoc <path> [options...]');

const options = cli.flags;
if (cli.input[0]) {
  options.sourceDir = cli.input[0];
}
renderdoc.buildSite(options);
