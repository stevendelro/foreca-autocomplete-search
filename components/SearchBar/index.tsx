import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import Grid from '@material-ui/core/Grid'
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

  const handleKeyPress = (event: KeyboardEvent) => {
    const shiftTabPressed = event.shiftKey && event.key === 'Tab'
    const listItemPosition = suggestionLength ? suggestionLength - 1 : 0
    const upArrowPress = event.key === 'ArrowUp' || shiftTabPressed
    const downArrowPress = event.key === 'ArrowDown' || event.key === 'Tab'
    const increment = focusedListItemIndex >= 0 ? focusedListItemIndex + 1 : 0
    const decrement = focusedListItemIndex >= 0 ? focusedListItemIndex - 1 : 0

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
  }
  // Handle return key press
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    selectedOption ? fetchData(selectedOption) : fetchData(userInput)
    setUserInput('')
    suggestionList &&
      focusedListItemIndex &&
      setUserInput(suggestionList[focusedListItemIndex])
    setFocusedListItemIndex(-1)
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
      },
      searchbar: {
        background: '#fff',
        border: '1px solid #dfe1e5',
        borderRadius: userInput ? theme.spacing(3, 3, 0, 0) : theme.spacing(3),
        padding: theme.spacing(0, 1.5),
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
      input: {
        outline: 'none',
        border: 'none',
        fontSize: theme.spacing(2),
        width: 'auto',
        height: theme.spacing(5),
        margin: '3.75px 0px',
        display: 'flex',
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
        <form onSubmit={event => handleSubmit(event)}>
          <div className={classes.searchbar}>
            <Grid container direction='row' justifyContent='flex-start'>
              <Grid item className={classes.searchIconContainer}>
                <MagnifyGlass />
              </Grid>
              <Grid item>
                <input
                  className={classes.input}
                  onChange={handleInput}
                  onKeyDown={handleKeyPress}
                  ref={inputRef}
                  type='text'
                  value={userInput}
                  onBlur={() => setCloseList(true)}
                />
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
          />
        </div>
      )}
    </>
  )
}

export { SearchBar }
