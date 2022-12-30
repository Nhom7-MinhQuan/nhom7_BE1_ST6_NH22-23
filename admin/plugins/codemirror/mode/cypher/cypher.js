 Consortium
# Permission to use, copy, modify, and /or distribute this software
# for any purpose with or without fee is hereby granted,
# provided that the above copyright notice
#  and this permission notice appear in all copies.
# THE SOFTWARE IS PROVIDED "AS IS" AND ISC DISCLAIMS ALL WARRANTIES
# WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES
# OF MERCHANTABILITY AND FITNESS.
# IN NO EVENT SHALL ISC BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT,
# OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
# WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
# WHETHER IN AN ACTION OF CONTRACT,
# NEGLIGENCE OR OTHER TORTIOUS ACTION,
# ARISING OUT OF OR IN CONNECTION WITH THE USE
# OR PERFORMANCE OF THIS SOFTWARE.
#}

set -e
set -x

this_dir=$(dirname -- "$0")
this_dir=$(realpath "${this_dir}")
this_name=$(basename -- "$0")
top_dir="${this_dir}/../../.."

module_name="sqlite3"
project="node-${module_name}"
arch="aarch64" # AKA: arm64, arm64v8 
architecture=$(basename "${this_dir}")
name="${project}-${architecture}"
dir="/usr/local/opt/${project}/"
dist_dir="${dir}/src/${project}/build"
tag=$(git describe --tags || echo v0.0.0)
version=$(echo "${tag}" | cut -dv -f2 | cut -d'-' -f1)

mkdir -p "${this_dir}/local" "${this_dir}/tmp"
cp -a "/usr/bin/qemu-${arch}-static" "${this_dir}/local"
time docker build -t "${name}" -f "${this_dir}/Dockerfile" .
container=$(docker create "${name}")
mkdir -p "${this_dir}/tmp/${dist_dir}"
rm -rf "${this_dir}/tmp/${dist_dir}"
docker cp "${container}:${dist_dir}" "${this_dir}/tmp/${dist_dir}"
file=$(ls "${this_dir}/tmp/${dist_dir}/stage/${module_name}/"*/*".tar.gz" | head -n1 \
               || echo "/tmp/${USER}/failure.tmp")

sha256sum "${file}"
The MIT License (MIT)

Copyright (c) Microsoft Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
{
  "name": "vscode-textmate",
  "version": "5.2.0",
  "description": "VSCode TextMate grammar helpers",
  "author": {
    "name": "Microsoft Corporation"
  },
  "main": "./release/main.js",
  "typings": "./release/main.d.ts",
  "repository": {
    "type": "git",
    "url": "https://github.com/microsoft/vscode-textmate"
  },
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/microsoft/vscode-textmate/issues"
  },
  "scripts": {
    "watch": "tsc -watch",
    "compile": "tsc",
    "test": "tape -r ./out/tests/all.test.js",
    "benchmark": "node benchmark/benchmark.js",
    "inspect": "node out/tests/inspect.js",
    "tmconvert": "node scripts/convert.js",
    "version": "npm run compile && npm run test && node scripts/release.js",
    "postversion": "git push && git push --tags",
    "prepublishOnly": "tsc && webpack --progress && node scripts/release.js"
  },
  "devDependencies": {
    "@types/node": "^12.6.2",
    "@types/tape": "^4.13.0",
    "durations": "^3.4.1",
    "onigasm": "^2.2.3",
    "oniguruma": "^7.2.0",
    "tape": "^4.13.2",
    "tslint": "^5.18.0",
    "typescript": "^3.5.3",
    "vscode-oniguruma": "^1.3.1",
    "webpack": "^4.43.0",
    "webpack-cli": "^3.3.12"
  }
}
# VSCode TextMate [![Build Status](https://dev.azure.com/ms/vscode-textmate/_apis/build/status/microsoft.vscode-textmate?branchName=master)](https://dev.azure.com/ms/vscode-textmate/_build/latest?definitionId=172&branchName=master)

An interpreter for grammar files as defined by TextMate. TextMate grammars use the oniguruma dialect (https://github.com/kkos/oniguruma). Supports loading grammar files from JSON or PLIST format. This library is used in VS Code. Cross - grammar injections are currently not supported.

## Installing

```sh
npm install vscode-textmate
```

## Using

```javascript
const fs = require('fs');
const vsctm = require('./release/main');
const oniguruma = require('oniguruma');

/**
 * Utility to read a file as a promise
 */
function readFile(path) {
    return new Promise((resolve, reject) => {
        fs.readFile(path, (error, data) => error ? reject(error) : resolve(data));
    })
}

// Create a registry that can create a grammar from a scope name.
const registry = new vsctm.Registry({
    onigLib: Promise.resolve({
        createOnigScanner: (sources) => new oniguruma.OnigScanner(sources),
        createOnigString: (str) => new oniguruma.OnigString(str)
    }),
    loadGrammar: (scopeName) => {
        if (scopeName === 'source.js') {
            // https://github.com/textmate/javascript.tmbundle/blob/master/Syntaxes/JavaScript.plist
            return readFile('./JavaScript.plist').then(data => vsctm.parseRawGrammar(data.toString()))
        }
        console.log(`Unknown scope name: ${scopeName}`);
        return null;
    }
});

// Load the JavaScript grammar and any other grammars included by it async.
registry.loadGrammar('source.js').then(grammar => {
    const text = [
        `function sayHello(name) {`,
        `\treturn "Hello, " + name;`,
        `}`
    ];
    let ruleStack = vsctm.INITIAL;
    for (let i = 0; i < text.length; i++) {
        const line = text[i];
        const lineTokens = grammar.tokenizeLine(line, ruleStack);
        console.log(`\nTokenizing line: ${line}`);
        for (let j = 0; j < lineTokens.tokens.length; j++) {
            const token = lineTokens.tokens[j];
            console.log(` - token from ${token.startIndex} to ${token.endIndex} ` +
              `(${line.substring(token.startIndex, token.endIndex)}) ` +
              `with scopes ${token.scopes.join(', ')}`
            );
        }
        ruleStack = lineTokens.ruleStack;
    }
});

/* OUTPUT:

Unknown scope name: source.js.regexp

Tokenizing line: function sayHello(name) {
 - token from 0 to 8 (function) with scopes source.js, meta.function.js, storage.type.function.js
 - token from 8 to 9 ( ) with scopes source.js, meta.function.js
 - token from 9 to 17 (sayHello) with scopes source.js, meta.function.js, entity.name.function.js
 - token from 17 to 18 (() with scopes source.js, meta.function.js, punctuation.definition.parameters.begin.js
 - token from 18 to 22 (name) with scopes source.js, meta.function.js, variable.parameter.functi