import React, { Component } from 'react'
import './LandingPage.css';

export default class LandingPage extends Component {
  render() {
    return (
      <>
        <header className="header">
          <h2 className="header-tag">Explore Now Playing</h2>
          <div className="hero">
            <h3 className="app-title-headline">Enjoy the moviegoing experience in the comfort of your home</h3>
          </div>
        </header>
        <div className="section-flex">
          <section className="section-one">
            <h2 className="section-h2">View a Thread</h2>
            <img className="section-img" src="https://media2.giphy.com/media/l0ExxaH283o56Avuw/giphy.gif" alt="gif" />
            <p className="section-p">Want to see others' reactions to a movie in real-time? Find the movie on the homepage, hit Play, sit back, and enjoy the show!</p>
          </section>

          <hr className="underline"></hr>

          <section className="section-two">
            <h2 className="section-h2">Create a Thread</h2>
            <img className="section-img" src="https://media2.giphy.com/media/l0ExxaH283o56Avuw/giphy.gif" alt="gif" />
            <p className="section-p">Don't see your favorite movie as an existing thread? Search through our directory, find the movie, and create the thread. It's that easy!</p>
          </section>

          <hr className="underline"></hr>

          <section className="section-three">
            <h2 className="section-h2">Comment Alongside Others</h2>
            <img className="section-img" src="https://media2.giphy.com/media/l0ExxaH283o56Avuw/giphy.gif" alt="gif" />
            <p className="section-p">Want to participate in the movie conversation? Add you reactions and comments. Share your thoughts with the community!</p>
          </section>
        </div>
      </>
    )
  }
}