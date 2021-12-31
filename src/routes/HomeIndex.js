import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { homeIndex } from '../api/item-auth.js'
import apiUrl from '../apiConfig'
import axios from 'axios'

class HomeIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: null
    }
  }
  componentDidMount () {
    const { msgAlert, user } = this.props
    homeIndex(user)
      .then(res => this.setState({ items: res.data.items }))
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
      .then(res => this.setState({ items: [...this.state.items, res.data.items] }))
      .then(() => console.log(`STATE: ${this.state.items}`))
      .catch(console.error)
  }

  render () {
    const { items } = this.state
    if (!items) {
      return (
        <p>404</p>
      )
    }
    if (items.length === 0) {
      return (
        <p>0 Items to show</p>
      )
    }

    const itemsJsx = items.map(item => (
      <Link to={`/items/${item.id}`} key={item.id}>
        <item>
          <section className='top-card'>
            <img className='home-image' src={item.thumbnail}/>
          </section>

          <section className='bot-card'>
            <h3 className='roboto-mono thicc-letters'>{item.title}</h3>
            <p>{item.authorName}</p>
          </section>
        </item>
      </Link>
    ))

    return (
      <Fragment>
        <div className='content'>
          {itemsJsx}
        </div>
      </Fragment>
    )
  }
}

// <button onClick={this.loadBatch}>Load More!</button>

export default HomeIndex
