import { bindActionCreators, Dispatch, ActionCreator } from 'redux'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'
import React, { useState } from 'react'

import { Action } from '../store/actions'
import { fetchData } from '../store/action-creators'

// setup a dropdown to choose what language weather data should come back in

type FetchData = {
  fetchData: (userInput: string) => void
}

const Index = ({ fetchData }: FetchData) => {
  const [userInput, setUserInput] = useState('')

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    fetchData(userInput)

    setUserInput('')
  }

  return (
    <Container maxWidth='sm'>
      <h1>index.js</h1>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </Container>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  fetchData: bindActionCreators(fetchData, dispatch),
})

export default connect(null, mapDispatchToProps)(Index)
