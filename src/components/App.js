import React from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import DATA from '../data';
import style from '../style';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  render() {
    return (
      <div style={ style.App }>
        <h2>Comments:</h2>
        <CommentList data={ DATA }/>
        <CommentForm />
      </div>
    );
  }
}

export default App;