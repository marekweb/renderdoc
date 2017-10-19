#!/usr/bin/env node

const meow = require('meow');
const renderdoc = require('.');

const cli = meow('Usage: renderdoc <path> [options...]');

const options = cli.flags;
if (cli.input[0]) {
  options.sourceDir = cli.input[0];
}

renderdoc.buildSite(options);
