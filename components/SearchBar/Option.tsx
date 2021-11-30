import { Dispatch, SetStateAction, useEffect } from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import { Grid } from '@material-ui/core'
import MagnifyGlass from './MagnifyGlass'

type OptionProps = {
  isFocused: boolean
  option: string
  setSelectedOption: Dispatch<SetStateAction<string>>
  setUserInput: Dispatch<SetStateAction<string>>
  getWeatherAndLocation: Function
  userInput: string
}

const Option = ({
  isFocused,
  option,
  setSelectedOption,
  setUserInput,
  getWeatherAndLocation,
  userInput,
}: OptionProps): JSX.Element => {
  useEffect(() => {
    isFocused && setSelectedOption(option)
  }, [isFocused])
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      option: {
        fontSize: theme.spacing(2),
        '&:hover': {
          backgroundColor: '#00000012',
          cursor: 'pointer',
        },
      },
      focusedText: {
        fontWeight: 'bold',
      },
      listItem: {
        padding: theme.spacing(0.9, 1.2),
      },
      searchIconContainer: {
        paddingLeft: theme.spacing(1.5),
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isFocused ? '#00000012' : 'none',
      },
      listItemArrowSelected: {
        fontSize: theme.spacing(2),
        backgroundColor: '#00000012',
        cursor: 'pointer',
        padding: theme.spacing(0.9, 1.2),
        flexGrow: 1,
      },
      textOption: {
        width: '100%',
      },
    })
  )
  const classes = useStyles()
  const styledUserInput = (
    <span className={classes.focusedText}>
      {option.slice(0, userInput.length)}
    </span>
  )
  const appendedChars = (
    <span>{option.slice(userInput.length, option.length)}</span>
  )
  return (
    <Grid
      container
      onMouseDown={() => {
        // setUserInput('')
        getWeatherAndLocation(null, option)
      }}
      direction='row'
      justifyContent='flex-start'
      className={classes.option}>
      <Grid item className={classes.searchIconContainer}>
        <MagnifyGlass />
      </Grid>
      <Grid
        item
        className={
          isFocused ? classes.listItemArrowSelected : classes.listItem
        }>
        {styledUserInput}
        {appendedChars}
      </Grid>
    </Grid>
  )
}

export default Option
