import React, { Component } from 'react'
import AuthApiService from './auth-service'
import TokenService from './token-service'

const UserContext = React.createContext({
  landing: false,
  background: '',
  user: {},
  category: '',
  categoryID: '',
  categoryList: [],
  categoryItems: [],
  searchedCategoryItems: [],
  filteredCategoryItems: [],
  currentThreadComments: [],
  renderedComments: [],
  happenings: [],
  mediaTimer: null,
  playing: false,
  paused: false,
  playingTitle: null,
  playingRuntime: null,
  playingCategory: null,
  playingID: null,
  error: null,
  setCategoryPage: () => {},
  setLanding: () => {},
  setError: () => {},
  setBackground: () => {},
  setCategory: () => {},
  setCategoryList: () => {},
  setCategoryItems: () => {},
  setSearchedCategoryItems: () => {},
  setPlaying: () => {},
  setPlayingTitle: () => {},
  setPlayingRuntime: () => {},
  setPaused: () => {},
  startInterval: () => {},
  pauseInterval: () => {},
  resetMediaTimer: () => {},
  updateMediaTimer: () => {},
  setMediaTimer: () => {},
  updateCategoryItems: () => {},
  setHappenings: () => {},
  setCurrentThreadComments: () => {},
  clearError: () => {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
})

export default UserContext

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    const state = { user: {}, mediaTimer: 0, happenings: [], displayCommentBox: false, error: null }

    const jwtPayload = TokenService.parseAuthToken()

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      }

    this.state = state;
  }

  setCategoryPage = categoryPage => {
    this.setState({categoryPage});
  }

  setLanding = landing => {
    this.setState({landing});
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
  }

  //display comment box

  displayCommentSection = (falsy) => {
    let change = !this.state.displayCommentBox;
    if (falsy === true) {
      change = true;
    }
    this.setState({
      displayCommentBox: change
    })
  }

  //sets category AND categoryID AND categoryItems AND searchedCategoryItems AND filteredCategoryItems
  setCategory = async (category) => {
    this.setState({ category });
    let categoryFull = this.state.categoryList.filter(item => item.media_type.toLowerCase() === category.toLowerCase()) || {};
    let categoryID = categoryFull[0].id || '';
    this.setState({categoryID});
    let categoryItems = await AuthApiService.getSpecificThreads(category).then(response => response)
    this.setCategoryItems(categoryItems);
  }

  setCategoryList = categoryList => {
    this.setState({categoryList});
  }

  setCategoryItems = async categoryItems => {
    await this.setSearchedCategoryItems(categoryItems);
    await this.setState({categoryItems});
  }

  setSearchedCategoryItems = async searchedCategoryItems => {
    await this.setFilteredCategoryItems(searchedCategoryItems);
    await this.setState({searchedCategoryItems});
  }
  setFilteredCategoryItems = async filteredCategoryItems => {
    await this.setState({filteredCategoryItems})
  }

  updateCategoryItems = async () => {
    let categoryItems = await AuthApiService.getSpecificThreads(this.state.category).then(response=> response)
    await this.setCategoryItems(categoryItems);
  }
  setHappenings = events => {
    this.setState({
      happenings: events
    })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setBackground = background => {
    this.setState({background})
  }

  setUser = user => {
    this.setState({ user })
  }

  setPlaying = playing => {
    this.setState({playing});
  }

  setPlayingRuntime = playingRuntime => {
    this.setState({playingRuntime});
  }

  setPaused = paused => {
    this.setState({paused});
  }

  setPlayingTitle = playingTitle => {
    this.setState({playingTitle});
  }

  setPlayingCategory = playingCategory => {
    this.setState({playingCategory});
  }

  setPlayingID = playingID => {
    this.setState({playingID});
  }

  updateMediaTimer = () => {
    this.setState({mediaTimer: this.state.mediaTimer + 1});
  }

  setMediaTimer = (time) => {
    this.setState({mediaTimer: time})
  }

  resetMediaTimer = () => {
    this.setState({mediaTimer: 0});
  }

  setCurrentThreadComments = comments => {
    this.setState({currentThreadComments: comments})
  }

  setRenderedComments = comments => {
    this.setState({renderedComments: [...comments]})
  }

  startInterval = () => {
    this.myInterval = setInterval(() => {
      this.updateMediaTimer();
    }, 1000);
  }

  pauseInterval = () => {
    if (this.myInterval) {
      clearInterval(this.myInterval);
    }
  }
  
  processLogin = authToken => {
    TokenService.saveAuthToken(authToken)
    const jwtPayload = TokenService.parseAuthToken()
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
    })
  }

  processLogout = () => {
    TokenService.clearAuthToken()
    this.setUser({})
  }

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
      })
      .catch(err => {
        this.setError(err)
      })
  }

  render() {
    const value = {
      categoryPage: this.state.categoryPage,
      landing: this.state.landing,
      background: this.state.background,
      user: this.state.user,
      category: this.state.category,
      categoryID: this.state.categoryID,
      categoryList: this.state.categoryList,
      categoryItems: this.state.categoryItems,
      searchedCategoryItems: this.state.searchedCategoryItems,
      filteredCategoryItems: this.state.filteredCategoryItems,
      mediaTimer: this.state.mediaTimer,
      playing: this.state.playing,
      paused: this.state.paused,
      playingCategory: this.state.playingCategory,
      playingTitle: this.state.playingTitle,
      playingID: this.state.playingID,
      playingRuntime: this.state.playingRuntime,
      currentThreadComments: this.state.currentThreadComments,
      renderedComments: this.state.renderedComments,
      happenings: this.state.happenings,
      setBackground: this.setBackground,
      setLanding: this.setLanding,
      error: this.state.error,
      setError: this.setError,
      setPlaying: this.setPlaying,
      setPlayingTitle: this.setPlayingTitle,
      setPaused: this.setPaused,
      startInterval: this.startInterval,
      pauseInterval: this.pauseInterval,
      clearError: this.clearError,
      setCategoryPage: this.setCategoryPage,
      setUser: this.setUser,
      setCategory: this.setCategory,
      setCategoryList: this.setCategoryList,
      setCategoryItems: this.setCategoryItems,
      setSearchedCategoryItems: this.setSearchedCategoryItems,
      setFilteredCategoryItems: this.setFilteredCategoryItems,
      setCurrentThreadComments: this.setCurrentThreadComments,
      updateCategoryItems: this.updateCategoryItems,
      setRenderedComments: this.setRenderedComments,
      setPlayingCategory: this.setPlayingCategory,
      setPlayingID: this.setPlayingID,
      setPlayingRuntime: this.setPlayingRuntime,
      setHappenings: this.setHappenings,
      updateMediaTimer: this.updateMediaTimer,
      setMediaTimer: this.setMediaTimer,
      resetMediaTimer: this.resetMediaTimer,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      displayCommentBox: this.state.displayCommentBox,
      displayCommentSection: this.displayCommentSection,
    }
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
