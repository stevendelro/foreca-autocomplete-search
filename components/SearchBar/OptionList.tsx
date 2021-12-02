import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import { Divider, Typography } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import Option from './Option'

type OptionsListTypes = {
  closeList: boolean
  focusedListItemIndex: number
  list: string[]
  userInput: string
  setSelectedOption: Dispatch<SetStateAction<string>>
  setSuggestionLength: Dispatch<SetStateAction<number>>
  setSuggestionList: Dispatch<SetStateAction<string[]>>
  setUserInput: Dispatch<SetStateAction<string>>
  getWeatherAndLocation: Function
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    optionsList: {
      width: '100%',
      background: '#fff',
      border: 'none',
      borderRadius: theme.spacing(0, 0, 3, 3),
      overflow: 'hidden',
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      borderTop: 'none',
      outline: 'none',
      boxShadow: '0 4px 6px rgb(32 33 36 / 28%)',
      marginTop: -1,
    },
    divider: {
      margin: theme.spacing(0, 2.1),
    },
    trySearchText: {
      fontSize: theme.spacing(1.8),
      color: theme.palette.grey[500],
      margin: theme.spacing(0, 2),
      padding: theme.spacing(1, 0),
    },
  })
)

const OptionsList = ({
  closeList,
  focusedListItemIndex,
  list,
  setSelectedOption,
  setSuggestionLength,
  setSuggestionList,
  setUserInput,
  userInput,
  getWeatherAndLocation,
}: OptionsListTypes): JSX.Element => {
  const classes = useStyles()

  const renderedComponents = [
    <Typography key='try' className={classes.trySearchText}>
      Try searching for
    </Typography>,
  ] // Used to render UI
  const renderedListItems = [''] // Used to display info.

  const produceOptions = () => {
    list.forEach((listItem, index) => {
      // From the list of listItems, create a varable to match with the userInput
      const option = listItem.toLowerCase().substring(0, userInput.length)
      if (
        renderedComponents.length <= 9 &&
        option === userInput.toLowerCase()
      ) {
        renderedListItems.push(listItem)
        renderedComponents.push(
          <Option
            // `isFocused` will render true based on keyboard navigation.
            isFocused={listItem === renderedListItems[focusedListItemIndex]}
            key={`$item-${index}`}
            option={listItem}
            setSelectedOption={setSelectedOption}
            setUserInput={setUserInput}
            userInput={userInput}
            getWeatherAndLocation={getWeatherAndLocation}
          />
        )
      }
    })
  }

  useMemo(produceOptions, [renderedComponents, renderedListItems])
  useEffect(() => {
    setSuggestionLength(renderedComponents.length)
    setSuggestionList(renderedListItems)
  }, [])

  produceOptions()
  if (closeList || renderedComponents.length <= 1) return <div />
  return (
    <div className={classes.optionsList}>
      <Divider className={classes.divider} /> {renderedComponents}
    </div>
  )
}

export default OptionsList
