/* global document */
import 'babel-polyfill';

import React, { Component } from 'react';
import { render } from 'react-dom';
import '../styles/main.scss';
import { App } from './components/App';

render(
    <App/>,
    document.getElementById('app')
);
