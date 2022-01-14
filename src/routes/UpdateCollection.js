import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import CollectionForm from '../shared/CollectionForm.js'
import { viewCollection, collectionUpdate } from './../api/collection-auth.js'

class UpdateCollection extends Component {
  constructor (props) {
    super(props)

    this.state = {
      collection: null,
      updated: false
    }
  }
  async componentDidMount () {
    const { user, match, msgAlert } = this.props
    viewCollection(match.params.id, user)
      .then(res => this.setState({ collection: res.data.collection }))
      .catch(error => {
        msgAlert({
          heading: 'Try Again',
          message: 'ERROR: ' + error.message,
          variant: 'danger'
        })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { user, match, msgAlert } = this.props
    const { collection } = this.state
    collectionUpdate(match.params.id, collection, user)
      .then(() => this.setState({ updated: true }))
      .then(msgAlert({
        heading: 'Success!',
        message: 'Your collection has been updated ',
        variant: 'primary'
      }))
      .catch(console.error)
  }
  handleChange = (event) => {
    event.persist()
    this.setState(currState => {
      const updatedField = {
        [event.target.name]: event.target.value
      }
      const newCollection = { ...currState.collection, ...updatedField }
      return { collection: newCollection }
    })
  }
  render () {
    const { collection, updated } = this.state
    if (!collection) {
      return <h2>Make an Collection!</h2>
    } if (updated) {
      return <Fragment><Redirect to={`/collection/${this.props.match.params.id}`}/></Fragment>
    }
    return (
      <Fragment>
        <CollectionForm
          collection={collection}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </Fragment>
    )
  }
}

export default withRouter(UpdateCollection)
