import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import { collectionCreate } from '../api/collection-auth.js'
import CollectionForm from '../shared/CollectionForm.js'

class CreateCollection extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collection: {
        title: '',
        createdBy: '',
        oneLiner: '',
        description: ''
      },
      createdId: null
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { user, msgAlert } = this.props
    const { collection } = this.state
    collectionCreate(collection, user)
      .then(res => this.setState({ createdId: res.data.collection._id }))
      .then(msgAlert({
        heading: 'Success!',
        message: 'Your collection has been created ',
        variant: 'primary'
      }))
      .catch(console.error)
  }

  handleChange = event => {
    event.persist()
    this.setState(state => {
      return {
        collection: { ...state.collection, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
    const { collection, createdId } = this.state
    if (createdId) {
      return <Redirect to={'/'}/>
    }
    return (
      <Fragment>
        <h1>New Collection</h1>
        <CollectionForm
          collection={collection}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </Fragment>
    )
  }
}

export default CreateCollection
