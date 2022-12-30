udGVudHMvUmVzb3VyY2VzL1NjcmlwdHMvVVQFAAM9pQ9XdXgLAAEE9QEAAAQUAAAAUEsBAh4DFAAAAAgACYCOSApeZYk1AQAAzAEAACQAGAAAAAAAAAAAAKSBwxYAAENvbnRlbnRzL1Jlc291cmNlcy9TY3JpcHRzL21haW4uc2NwdFVUBQADcaIPV3V4CwABBPUBAAAEFAAAAFBLBQYAAAAADQANANwEAABWGAAAAAA=';

var PERMISSION_DENIED = 'User did not grant permission.';
var NO_POLKIT_AGENT = 'No polkit authentication agent found.';

// See issue 66:
var MAX_BUFFER = 134217728;
The MIT License (MIT)

Copyright (c) 2015 Joran Dirk Greef

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
  "name": "sudo-prompt",
  "version": "9.1.1",
  "description": "Run a command using sudo, prompting the user with an OS dialog if necessary",
  "main": "index.js",
  "types": "index.d.ts",
  "files": [
    "LICENSE",
    "README.md",
    "index.d.ts",
    "index.js",
    "package.json",
    "test.js",
    "test-concurrent.js"
  ],
  "repository": {
    "type": "git",
    "url": "git+https://github.com/jorangreef/sudo-prompt.git"
  },
  "keywords": [
    "sudo",
    "os",
    "dialog",
    "prompt",
    "command",
    "exec",
    "user access control",
    "UAC",
    "privileges",
    "administrative",
    "elevate",
    "run as administrator"
  ],
  "author": "Joran Dirk 