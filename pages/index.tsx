import { bindActionCreators, Dispatch } from 'redux'
import { connect } from 'react-redux'
import Container from '@material-ui/core/Container'
import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { Action } from '../store/actions'
import { fetchData } from '../store/action-creators'

// setup a dropdown to choose what language weather data should come back in

interface IndexProps {
  fetchData(userInput: string): Function
}

const Index = ({ fetchData }: IndexProps): JSX.Element => {
  const [userInput, setUserInput] = useState('')

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    fetchData(userInput)
    setUserInput('')
  }

  return (
    <Container maxWidth='sm'>
      <form onSubmit={onSubmit}>
        <TextField
          label='Enter Location'
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Container>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  fetchData: bindActionCreators(fetchData, dispatch),
})

export default connect(null, mapDispatchToProps)(Index)
