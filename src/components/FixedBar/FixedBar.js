import React from 'react';
import './FixedBar.css'
import AddCommentBox from '../../components/AddCommentBox/AddCommentBox';
import PlayButton from '../../components/PlayButton/PlayButton'
import UserContext from '../../utils/context';

class FixedBar extends React.Component {
  static contextType = UserContext;

  componentDidMount() {
    this.myInterval = setInterval(() => this.context.updateMediaTimer(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

  convertSeconds = () => {

  }

  render() {
    return (
      <div className='fixed-bar'>
        <div className='fixed-bar-header'>
        <PlayButton />
        <h3 id='media-timer'>{this.context.mediaTimer}</h3>
        </div>
        <AddCommentBox category={this.props.category} mediaId={this.props.mediaId}/>
      </div>
    )
  }
}

export default FixedBar;