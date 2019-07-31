import React from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

// main app
class App extends React.Component {
  render() {
    return <p>This is my new reactttt app</p>;
  }
}

ReactDOM.render(<App />, document.getElementById('fb-root'));
