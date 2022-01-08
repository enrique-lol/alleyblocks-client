import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { collectionIndex } from '../api/collection-auth.js'
import apiUrl from '../apiConfig'
import axios from 'axios'

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

    const collectionsJsx = collection.map(collection => (
      <Link to={`/collection/${collection._id}`} key={collection._id}>
        <article>
          <section className='top-card'>
            <img className='home-image' src={collection.thumbnail}/>
          </section>

          <section className='bot-card'>
            <h3 className='roboto-mono thicc-letters'>{collection.title}</h3>
            <p>{collection.artist}</p>
          </section>
        </article>
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

// <button onClick={this.loadBatch}>Load More!</button>

export default CollectionIndex
