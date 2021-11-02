import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  KeyboardEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Grid, IconButton } from '@material-ui/core'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import ClearIcon from '@material-ui/icons/Clear'
import MagnifyGlass from './MagnifyGlass'
import OptionsList from './OptionList'

type SearchbarProps = {
  cityNames: string[]
  userInput: string
  fetchData: (userInput?: string, lat?: number, lon?: number) => Function
  setUserInput: Dispatch<SetStateAction<string>>
}

const SearchBar = ({
  cityNames,
  userInput,
  fetchData,
  setUserInput,
}: SearchbarProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [suggestionList, setSuggestionList] = useState<string[]>([])
  const [suggestionLength, setSuggestionLength] = useState(0)
  const [closeList, setCloseList] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const [focusedListItemIndex, setFocusedListItemIndex] = useState(0)
  const handleInput = (event: ChangeEvent<HTMLInputElement>) =>
    setUserInput(event.target.value)

  // Reset list and list item focus when no user input
  useEffect(() => {
    if (!userInput) {
      setSuggestionList([])
      setFocusedListItemIndex(0)
    }
  }, [userInput])
  const listItemPosition = useMemo(
    () => (suggestionLength ? suggestionLength - 1 : 0),
    [suggestionLength]
  )
  const increment = useMemo(
    () => (focusedListItemIndex >= 0 ? focusedListItemIndex + 1 : 0),
    [focusedListItemIndex]
  )
  const decrement = useMemo(
    () => (focusedListItemIndex >= 0 ? focusedListItemIndex - 1 : 0),
    [focusedListItemIndex]
  )

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const shiftTabPressed = event.shiftKey && event.key === 'Tab'
      const upArrowPress = event.key === 'ArrowUp' || shiftTabPressed
      const downArrowPress = event.key === 'ArrowDown' || event.key === 'Tab'

      /**********************************
       ****** ARROW KEY NAVIGATION ******
       **********************************/

      // Set focus to next list item
      if (focusedListItemIndex >= 0 && downArrowPress) {
        setFocusedListItemIndex(increment)
      }

      // Prevent focus from extending past list length
      if (focusedListItemIndex === listItemPosition) {
        setFocusedListItemIndex(listItemPosition)
      }
      // Escape from focusing any item
      if (focusedListItemIndex === 0 && upArrowPress) {
        setFocusedListItemIndex(0)
      }

      // Set focus to previous list item
      if (focusedListItemIndex > 0 && upArrowPress) {
        setFocusedListItemIndex(decrement)
      }

      /**********************************
       ****** KEYBOARD NAVIGATION *******
       **********************************/

      // Allows subsequent Tab presses to iterate through the list
      if (event.key === 'Tab' && suggestionList) {
        event.preventDefault()
        inputRef.current?.focus()
      }

      // Display the suggestion list on new key press.
      setCloseList(false)
      if (event.key === 'Escape') setCloseList(true)
    },
    [suggestionLength, focusedListItemIndex]
  )
  // Handle return key press
  const getWeatherAndLocation = (event?: FormEvent, input?: string) => {
    event && event.preventDefault()
    selectedOption && fetchData(selectedOption)
    input ? fetchData(input) : fetchData(userInput)
    setUserInput('')
    suggestionList &&
      focusedListItemIndex &&
      setUserInput(suggestionList[focusedListItemIndex])
    setFocusedListItemIndex(-1)
  }

  const handleClearInput = () => {
    setUserInput('')
    setCloseList(true)
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      container: {
        cursor: 'text',
        marginTop: '12vh',
        zIndex: 3,
      },
      searchIconContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexGrow: 2,
      },
      clearIconContainer: {
        padding: '12px',
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        color: '#00000039',
        cursor: 'pointer',
        height: '51px',
        width: '51px',
        '&:hover': {
          color: '#000',
        },
      },
      searchbar: {
        background: '#fff',
        border: '1px solid #dfe1e5',
        borderRadius: userInput ? theme.spacing(3, 3, 0, 0) : theme.spacing(3),
        paddingLeft: theme.spacing(1.5),
        maxWidth: theme.spacing(73),
        height: theme.spacing(6),
        width: 'auto',
        color: '#000',
        fontFamily: 'Roboto, sans-serif',
        fontWeight: 300,
        boxShadow: userInput ? theme.shadows[3] : 'none',
        '&:hover': {
          outline: 'none',
          border: '1px solid #dfe1e5',
          borderBottom: 'none',
          boxShadow: '0 4px 6px rgb(32 33 36 / 28%)',
        },
      },
      iconInputContainer: {
        width: '100%',
      },
      clearIcon: {
        height: '100%',
        width: '100%',
      },
      input: {
        outline: 'none',
        border: 'none',
        fontSize: theme.spacing(2),
        width: '100%',
        height: theme.spacing(5),
        margin: '3.75px 0px',
        display: 'flex',
        flexGrow: 3,
      },
      optionListContainer: {
        marginTop: '0px',
        zIndex: 3,
      },
    })
  )

  const classes = useStyles()
  return (
    <>
      <div
        className={classes.container}
        onClick={() => inputRef.current?.focus()}>
        <form onSubmit={event => getWeatherAndLocation(event)}>
          <div className={classes.searchbar}>
            <Grid container justifyContent='flex-start' alignItems='center'>
              <Grid item className={classes.iconInputContainer}>
                <Grid
                  container
                  direction='row'
                  justifyContent='flex-start'
                  wrap='nowrap'
                  className={classes.iconInputContainer}>
                  <div className={classes.searchIconContainer}>
                    <MagnifyGlass />
                  </div>
                  <input
                    className={classes.input}
                    onChange={handleInput}
                    onKeyDown={handleKeyPress}
                    ref={inputRef}
                    type='text'
                    value={userInput}
                    onBlur={() => {
                      setCloseList(true)
                      setUserInput('')
                    }}
                  />
                  <div
                    className={classes.clearIconContainer}
                    onClick={handleClearInput}>
                    <ClearIcon
                      className={classes.clearIcon}
                      fontSize='inherit'
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </form>
      </div>
      {userInput && (
        <div className={classes.optionListContainer}>
          <OptionsList
            closeList={closeList}
            focusedListItemIndex={focusedListItemIndex}
            list={cityNames}
            setSelectedOption={setSelectedOption}
            setSuggestionLength={setSuggestionLength}
            setSuggestionList={setSuggestionList}
            setUserInput={setUserInput}
            userInput={userInput}
            getWeatherAndLocation={getWeatherAndLocation}
          />
        </div>
      )}
    </>
  )
}

export { SearchBar }
