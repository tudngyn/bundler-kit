# Table of Content

1. [ Bundler Kit. ](#bundler_kit)
2. [ Description. ](#desc)
3. [ How to run. ](#how_to_run)
4. [ How to use Redux Module. ](#redux_module)

### Core

-   [ ] [React](https://facebook.github.io/react/)
-   [ ] [React Router](https://github.com/ReactTraining/react-router)
-   [ ] [React Router Redux](https://github.com/supasate/connected-react-router)
-   [ ] [Redux](http://redux.js.org/)
-   [ ] [Redux Thunk](https://github.com/reduxjs/redux-thunk)
-   [ ] [Reselect](https://github.com/reactjs/reselect)

### Linting

-   [ ] [ESLint](http://eslint.org/)
-   [ ] [Prettier](https://prettier.io/)

Run `bundler-kit-format` to run ESLint with Prettier.

<a name="bundler_kit"></a>

# Bunlder Kit

This source contains basic Webpack Configuration (Dev + Pro) + ESLint + Prettier

<a name="desc"></a>

# Description

This project is mostly based on CreateReactApp but with some minor changes. This will be the basic tool to bundle and build a project

<a name="how_to_run"></a>

# HOW TO RUN

You just need to call

```
bundler-kit --mode development --file path/to/your/project/index
```

With --mode is the NODE environment and --file is the entryPoint. You can replace "--file" with "FILENAME="

# How to map local module with command script

<a name="redux_module"></a>

# How to use Redux Module

This redux context is compatible with react-redux 7+.
You can attach dynamic reducer to a component ( when it's mounted ).
This solution based on Code Splitting ( https://redux.js.org/recipes/code-splitting ).
In your component:

```javascript

import injectReducer from "sdk-redux/withReducer";
import reducer from "PATH_TO_YOUR_REDUCER/reducers/YOUR_REDUCER";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

export function mapDispatchToProps(dispatch) {
  //...
}

const mapStateToProps = createStructuredSelector({
  //...
});

const withReducer = injectReducer(MODULE_NAME, reducer);
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withReducer
)(HomePage);

>Note: MODULE_NAME must be unique between your projects.

```

### Reselect

Reselect is a library used for slicing your redux state and providing only the relevant sub-tree to a react component. It has three key features:

1.  Computational power
2.  Memoization
3.  Composability

Imagine an application that shows a list of users. Its redux state tree stores an array of usernames with signatures:

`{ id: number, username: string, gender: string, age: number }`.

Let's see how the three features of reselect help.

-   **Computation:** While performing a search operation, reselect will filter the original array and return only matching usernames. Redux state does not have to store a separate array of filtered usernames.
-   **Memoization:** A selector will not compute a new result unless one of its arguments change. That means, if you are repeating the same search once again, reselect will not filter the array over and over. It will just return the previously computed, and subsequently cached, result. Reselect compares the old and the new arguments and then decides whether to compute again or return the cached result.
-   **Composability:** You can combine multiple selectors. For example, one selector can filter usernames according to a search key and another selector can filter the already filtered array according to gender. One more selector can further filter according to age. You combine these selectors by using `createSelector()`

[https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e](https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e).

#### Build OUTPUT

The most standard folder structure is

-   src/projects/**_your-project_**/index.js

The build result for this structure will be: _build/your-project.js_

#### Tips

##### Append variables and mixins automatically for every \*.scss file

Add \*.scss file in src/style/loader/. Every file in this folder will be loaded when run **_build_** or **_dev_**
