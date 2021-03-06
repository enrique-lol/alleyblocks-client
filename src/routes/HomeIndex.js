import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { homeIndex } from '../api/item-auth.js'
import apiUrl from '../apiConfig'
import axios from 'axios'

class HomeIndex extends Component {
  constructor (props) {
    super(props)
    this.state = {
      item: null
    }
  }
  componentDidMount () {
    const { msgAlert, user } = this.props
    homeIndex(user)
      // .then(res => console.log(res.data.item))
      .then(res => this.setState({ item: res.data.item }))
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
      .then(res => this.setState({ items: [...this.state.item, res.data.item] }))
      .then(() => console.log(`STATE: ${this.state.item}`))
      .catch(console.error)
  }

  render () {
    const { item } = this.state

    if (!item) {
      return (
        <p>!items</p>
      )
    }
    if (item.length === 0) {
      return (
        <p>0 Items to show</p>
      )
    }

    const itemsJsx = item.map(item => (
      <Link to={`/item/${item._id}`} key={item._id}>
        <article>
          <section className='top-card'>
            <img className='home-image' src={item.thumbnail}/>
          </section>

          <section className='bot-card'>
            <h3 className='roboto-mono thicc-letters'>{item.title}</h3>
            <p>{item.artist}</p>
          </section>
        </article>
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
