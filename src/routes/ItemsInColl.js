import React, { Fragment, Component } from 'react'
import { withRouter, Redirect, Link } from 'react-router-dom'
import { itemsinColl } from './../api/item-auth.js'

class ItemsInColl extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: null,
      deleted: false
    }
  }
  componentDidMount () {
    const { match, msgAlert } = this.props
    itemsinColl(match.params.id)
      .then(res => this.setState({ items: res.data.items }))
      .catch(error => {
        msgAlert({
          heading: 'Try Again',
          message: 'ERROR: ' + error.message,
          variant: 'danger'
        })
      })
  }
  render () {
    let itemsJsx
    const { items, deleted } = this.state
    if (!items) {
      itemsJsx = 'Loading...'
      return itemsJsx
    }
    if (items) {
      itemsJsx = items.map(item => (
        <Link to={`/item/${item._id}`} key={item._id}>
          <p>{item.title}</p>
        </Link>
      ))
    }

    return (
      <Fragment>
        {deleted ? <Redirect to="/"/> : itemsJsx}
      </Fragment>
    )
  }
}
export default withRouter(ItemsInColl)
