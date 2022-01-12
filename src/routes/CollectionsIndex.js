import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { collectionIndex } from '../api/collection-auth.js'
import Card from 'react-bootstrap/Card'
import apiUrl from '../apiConfig'
import axios from 'axios'
import ItemsInColl from './../routes/ItemsInColl.js'

class CollectionIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      collection: null
    }
  }
  componentDidMount () {
    const { msgAlert, user } = this.props
    collectionIndex(user)
      // .then(res => console.log(res.data.collection))
      .then(res => this.setState({ collection: res.data.collection }))
      .catch(error => {
        msgAlert({
          heading: 'Error',
          message: error.message,
          variant: 'danger'
        })
      })
  }

  loadBatch = () => {
    axios({
      url: `${apiUrl}/second14`,
      method: 'GET'
    })
      .then(res => this.setState({ collection: [...this.state.collection, res.data.collection] }))
      .then(() => console.log(`STATE: ${this.state.collection}`))
      .catch(console.error)
  }

  render () {
    const { collection } = this.state

    if (!collection) {
      return (
        <p>!collections</p>
      )
    }
    if (collection.length === 0) {
      return (
        <p>0 Items to show</p>
      )
    }

    const collectionsJsx = collection.map(coll => (
      <Link to={`/collection/${coll._id}`} key={coll._id}>
        <Card>
          <h3>{coll.title}</h3>
          <p>Below, are items with CollectionID of {coll._id}</p>
          < ItemsInColl key={coll._id} />
        </Card>
      </Link>
    ))

    return (
      <Fragment>
        <div className='content'>
          {collectionsJsx}
        </div>
      </Fragment>
    )
  }
}

export default CollectionIndex
