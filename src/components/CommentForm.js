import React from 'react';
import style from '../style';

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      author: '',
      text: ''
    };
  }

  handleAuthorChange = (e) => {
    this.setState({ author: e.target.value });
  }

  handleTextChange = (e) => {
    this.setState({ author: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let author = this.state.author.trim();
    let text = this.state.text.trim();
    if (!author || !text) {
      return;
    }
    this.props.onCommentSubmit({ author, text });
    this.setState({ author: '', text: '' });
  }

  render() {
    return (
      <form style={ style.commentForm } onSubmit={ this.handleSubmit }>
       <input
          type='text'
          placeholder='Your name…'
          style={ style.commentFormAuthor}
          value={ this.state.author }
          onChange={ this.handleAuthorChange } />
        <input
          type='text'
          placeholder='Say something…'
          style={ style.commentFormText}
          value={ this.state.text }
          onChange={ this.handleTextChange } />
        <input
          type='submit'
          style={ style.commentFormPost }
          value='Post' />
      </form>
    );
  }
}

export default CommentForm;