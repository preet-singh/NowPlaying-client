import React, { Component } from 'react'
import AuthApiService from './auth-service'
import TokenService from './token-service'

const UserContext = React.createContext({
  user: {},
  category: '',
  categoryID: '',
  categoryList: [],
  categoryItems: [],
  searchedCategoryItems: [],
  filteredCategoryItems: [],
  currentThreadComments: [],
  renderedComments: [],
  mediaTimer: null,
  playing: false,
  playingCategory: null,
  playingID: null,
  error: null,
  setError: () => {},
  setCategory: () => {},
  setCategoryList: () => {},
  setCategoryItems: () => {},
  setSearchedCategoryItems: () => {},
  setPlaying: () => {},
  resetMediaTimer: () => {},
  updateCategoryItems: () => {},
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
    const state = { user: {}, mediaTimer: 0, error: null }

    const jwtPayload = TokenService.parseAuthToken()

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      }

    this.state = state;
  }

  setError = error => {
    console.error(error)
    this.setState({ error })
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

  setCategoryItems = categoryItems => {
    this.setSearchedCategoryItems(categoryItems);
    this.setState({categoryItems});
  }

  setSearchedCategoryItems = searchedCategoryItems => {
    this.setFilteredCategoryItems(searchedCategoryItems);
    this.setState({searchedCategoryItems});
  }
  setFilteredCategoryItems = filteredCategoryItems => {
    this.setState({filteredCategoryItems})
  }

  updateCategoryItems = async () => {
    let categoryItems = await AuthApiService.getSpecificThreads(this.state.category).then(response=> response)
    this.setCategoryItems(categoryItems);
  }
  clearError = () => {
    this.setState({ error: null })
  }

  setUser = user => {
    this.setState({ user })
  }

  setPlaying = playing => {
    this.setState({playing});
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

  resetMediaTimer = () => {
    this.setState({mediaTimer: 0});
  }

  setCurrentThreadComments = comments => {
    this.setState({currentThreadComments: comments})
  }

  setRenderedComments = comments => {
    this.setState({renderedComments: [...comments]})
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
      user: this.state.user,
      category: this.state.category,
      categoryID: this.state.categoryID,
      categoryList: this.state.categoryList,
      categoryItems: this.state.categoryItems,
      searchedCategoryItems: this.state.searchedCategoryItems,
      filteredCategoryItems: this.state.filteredCategoryItems,
      mediaTimer: this.state.mediaTimer,
      playing: this.state.playing,
      playingCategory: this.state.playingCategory,
      playingID: this.state.playingID,
      currentThreadComments: this.state.currentThreadComments,
      renderedComments: this.state.renderedComments,
      error: this.state.error,
      setError: this.setError,
      setPlaying: this.setPlaying,
      clearError: this.clearError,
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
      updateMediaTimer: this.updateMediaTimer,
      resetMediaTimer: this.resetMediaTimer,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
    }
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
