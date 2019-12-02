import React from 'react';
import './ThreadItem.css';
import { Link } from 'react-router-dom';
import AuthService from '../../utils/auth-service';
import UserContext from '../../utils/context';
import moment from 'moment';


class ThreadItem extends React.Component {
  static contextType = UserContext;

  getComments = async (context,id) => {
    let comments = await AuthService.getComments(context.category,id);
    let comment = comments[comments.length-1];
    let date = moment(comment.date_created).format('MMMM Do YYYY, h:mm:ss a')
    return date;
  }
  render() {
    let lastComment = this.getComments(this.context,this.props.details.id) || ''
    return (
      <div className='thread-item'>
        <Link to='/thread/testthread'>
          <h3>{this.props.details.title}</h3>
          <img src='https://img01.mgo-images.com/image/thumbnail/v2/content/MMVAF76018A477C2826A4EC8747C40B7BE27.jpeg' alt='Movie poster image'/>
          <p>{this.props.details.date_created}</p>
          <p>Last comment {lastComment}</p>
        </Link>
      </div>
    )
  }
}

export default ThreadItem;