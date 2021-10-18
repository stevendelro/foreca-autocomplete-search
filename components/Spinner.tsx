import LinearProgress from '@material-ui/core/LinearProgress'

export const Spinner = ({ isLoading }: { isLoading: boolean }): JSX.Element => {
  // prettier-ignore
  return isLoading
    ? <LinearProgress />
    : <div style={{ height: '4px' }}></div>
}
