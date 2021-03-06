import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import promise from 'redux-promise';

import Reducers from './reducers';
import PostIndex from './components/posts_index';
import PostsNew from './components/posts_new';
import PostShow from './components/post_show';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
//This is a random comment.

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
        <Route path="/posts/new" component={PostsNew} />
        <Route path="/posts/:id" component={PostShow} />
        <Route path="/" component={PostIndex} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
