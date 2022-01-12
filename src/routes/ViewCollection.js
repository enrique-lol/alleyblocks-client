import React, { Fragment, Component } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import apiUrl from '../apiConfig'
import axios from 'axios'
import { viewCollection } from './../api/collection-auth.js'
import FutureFeature from './../components/FutureFeature/FutureFeature.js'

class ViewCollection extends Component {
  constructor (props) {
    super(props)

    this.state = {
      collection: null,
      deleted: false
    }
  }
  componentDidMount () {
    const { match, msgAlert } = this.props
    viewCollection(match.params.id)
      .then(res => this.setState({ collection: res.data.collection }))
      .catch(error => {
        msgAlert({
          heading: 'Try Again',
          message: 'ERROR: ' + error.message,
          variant: 'danger'
        })
      })
  }
  deleteItem = () => {
    const { user, match, msgAlert } = this.props
    axios({
      url: `${apiUrl}/collection/${match.params.id}`,
      method: 'delete',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .then(msgAlert({
        heading: 'Success!',
        message: 'been deleted',
        variant: 'primary'
      }))
      .catch(console.error)
  }
  render () {
    let collectionJsx
    const { collection, deleted } = this.state
    if (!collection) {
      collectionJsx = 'Loading...'
      return collectionJsx
    }
    if (collection) {
      collectionJsx = (
        <Fragment>
          <div className='collection-main'>
            <h2 className='roboto-mono'>{collection.title}</h2>
          </div>

        </Fragment>
      )
    }

    const comments = (
      <Fragment>
        <div>
          <div className='divider comm-comm'>
            <h2 className='community-comments-text raleway'>Community Comments</h2>
          </div>
          < FutureFeature />
        </div>
      </Fragment>
    )

    return (
      <Fragment>
        {deleted ? <Redirect to="/"/> : collectionJsx}
        {comments}
        <button className='a-button' onClick={this.deleteItem}>a1</button>
        <button className='a-button'><Link to={`/collection/${collection.id}/update/`}>a2</Link></button>
      </Fragment>
    )
  }
}
export default withRouter(ViewCollection)
