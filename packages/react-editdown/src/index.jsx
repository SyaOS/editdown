import React from 'react'
import useFetch from 'use-http'

const Editdown = ({ src }) => {
  const { data } = useFetch(src + '/', [])
  if (data === undefined) {
    return <div>Loading...</div>
  }
  return <div>Version: {data.version}</div>
}

export default Editdown
