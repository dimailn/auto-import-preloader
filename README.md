# auto-import-preloader
Auto append import statement for common functions or objects!

## Before
Component with common and local imports
```js
import React from 'react'
import { SubmissionError } from 'redux-form'
import { toastr } from 'react-redux-toastr'
import { IndexLink, Link } from 'react-router'
import { push as navigateTo } from 'react-router-redux'

import { loginSubmitHandler } from './loginSubmitHandler.js'

class LoginForm extends React.Component {
  ...
}
```

## After
Component only with local imports
```js
import { loginSubmitHandler } from './loginSubmitHandler.js'

class LoginForm extends React.Component {
  ...
}
```

Configuration file (eg. ```autoimport.json```)
```json
[
  { "import": "React",                   "from": "react" },
  { "import": "SubmissionError",         "from": "redux-form" },
  { "import": "{ toastr }",              "from": "react-redux-toastr",  "search": "toastr" },
  { "import": "{ IndexLink, Link }",     "from": "react-router",        "search": "IndexLink|Link" },
  { "import": "{ push as navigateTo }",  "from": "react-router-redux",  "search": "navigateTo" }
]
```

## Installation 
1. Install
```npm install auto-import-preloader --save```

2. Add auto-import-preloader to webpack preloaders:
```js
import autoImportHash from '../autoimport.json';

webpackConfig.module.preLoaders = [{
  test: /\.(js|jsx)$/,
  loader: 'auto-import-preloader',
  exclude: /node_modules/,
  query: {
    source: autoImportHash
  }
}]
```
Done!
