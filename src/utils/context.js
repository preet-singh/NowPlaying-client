import React, { Component } from 'react'
import AuthApiService from './auth-service'
import TokenService from './token-service'

const UserContext = React.createContext({
  user: {},
  category: '',
  categoryID: '',
  categoryList: [],
  categoryItems: [],
  error: null,
  setError: () => {},
  setCategory: () => {},
  setCategoryList: () => {},
  setCategoryItems: () => {},
  clearError: () => {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
})

export default UserContext

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    const state = { user: {}, error: null }

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

  //sets category AND categoryID AND categoryItems
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
    this.setState({categoryItems});
  }
  clearError = () => {
    this.setState({ error: null })
  }

  setUser = user => {
    this.setState({ user })
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
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      setCategory: this.setCategory,
      setCategoryList: this.setCategoryList,
      setCategoryItems: this.setCategoryItems,
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
