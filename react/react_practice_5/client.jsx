import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';

import Main from './src/Main';

const Hot = hot(Main)

ReactDom.render(<Hot />, document.querySelector('#root'))