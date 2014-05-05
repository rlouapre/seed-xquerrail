# seed-xquerrail

XQuerrail Seed Application is used to generate and validate a Gulp build script for Xquery application.  

Testing Build script

- Source files must be located in src/main
- Test files must be located in src/test

## Gulp script
This script will be used to build a release of the application located in dist directory.  
It will 4 arguments to access MarkLogic server:

- ml.user, ml.password, ml.host, ml.port

These argument could also be provided in ml.json file see (ml.json.sample for more details).

Gulp script execute the following tasks:

### test
Execute all test related tasks.

  - coverage: not implemented.
  - lint: not implemented.
  - xray: execute xray test suite available in src/test

### clean
delete dist directory

### update-xqy
Update xquery files.

  - last-git-commit: get last git commit hash 
  - header: add license header to xqy files.
  - replace: replace <%= lastcommit %> and <%= version %> last git hash and version
  - copy: copy to dist directory

Command line to build:  

```gulp build --ml.user=admin --ml.password=xxxx --ml.host=ps7.demo.marklogic.com --ml.port=8050```

### Additional Gulp tasks available
Few additional tasks are available useful to generated a new release of the application

- tag: create a new tag and publish it in repository (git push can be executed from command line).
- bump: increase package version

## How to use it
Create a new project install Roxy in root folder.  
Create a new src directory and create a new npm project in src.  
Execute:  

```npm install https://github.com/rlouapre/seed-xquerrail/tarball/v{version} --save```

package.json example:  
```js
{
  "name": "test-seed-xquerrail",
  "version": "0.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "seed-xquerrail": "https://github.com/rlouapre/seed-xquerrail/tarball/v0.0.27"
  }
}
```