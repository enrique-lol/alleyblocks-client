import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import HeaderTwo from './components/Header/HeaderTwo'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import ViewItem from './routes/ViewItem.js'
import NewItem from './routes/NewItem.js'
import HomeIndex from './routes/HomeIndex.js'
import CollectionsIndex from './routes/CollectionsIndex.js'
import NewCollection from './routes/NewCollection.js'
import ViewCollection from './routes/ViewCollection.js'
import ItemsInColl from './routes/ItemsInColl.js'
import UpdateItem from './routes/UpdateItem.js'
import UpdateCollection from './routes/UpdateCollection.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <HeaderTwo user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <HomeIndex msgAlert={this.msgAlert} />
          )} />
          <Route exact path='/collections' render={() => (
            <CollectionsIndex msgAlert={this.msgAlert} />
          )} />
          <Route user={user} exact path='/item/:id' render={() => (
            <ViewItem msgAlert={this.msgAlert} />
          )} />
          <Route exact path='/collection/:id' render={() => (
            <ViewCollection msgAlert={this.msgAlert} />
          )} />
          <Route exact path='/itemsincoll/:id' render={() => (
            <ItemsInColl msgAlert={this.msgAlert} />
          )} />
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/new-item' render={() => (
            <NewItem msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/new-collection' render={() => (
            <NewCollection msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/item/:id/update' render={() => (
            <UpdateItem msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/collection/:id/update' render={() => (
            <UpdateCollection msgAlert={this.msgAlert} user={user} />
          )} />

        </main>
      </Fragment>
    )
  }
}

//   <AuthenticatedRoute user={user} exact path='/home/articles/:id/update/' render={() => (
//    <UpdateItem msgAlert={this.msgAlert} user={user} />
//  )} />

// <Route path='/item/:id' render={() => (
//   <ViewItem msgAlert={this.msgAlert} />
// )} />

export default App
