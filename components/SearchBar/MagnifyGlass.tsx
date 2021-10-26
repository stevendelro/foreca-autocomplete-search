import { Theme, createStyles, makeStyles } from '@material-ui/core/styles'

import SearchIcon from '@material-ui/icons/Search'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchIcon: {
      color: '#00000039',
      fontSize: theme.spacing(2.7),
      marginRight: theme.spacing(1.5),
    },
  })
)
const MagnifyGlass = () => {
  const classes = useStyles()
  return <SearchIcon className={classes.searchIcon} />
}

export default MagnifyGlass
