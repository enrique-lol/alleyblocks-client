import React from 'react'

const CollectionForm = ({ collection, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <input
      required
      name="title"
      type="text"
      placeholder="Title"
      value={collection.title}
      onChange={handleChange}
    />
    <input
      required
      name="createdBy"
      type="text"
      placeholder="by"
      value={collection.createdBy}
      onChange={handleChange}
    />
    <input
      name="oneLiner"
      type="text"
      placeholder="1l"
      value={collection.oneLiner}
      onChange={handleChange}
    />
    <input
      required
      name="description"
      type="text"
      placeholder="description"
      value={collection.description}
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
  </form>
)

export default CollectionForm
