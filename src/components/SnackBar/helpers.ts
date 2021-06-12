import snackBarRef from './SnackBarRef'; 
import { SnackBarOptions } from './types';

export const showSnackBar = (options: SnackBarOptions) => {
  return snackBarRef.ref?.openSnack(options)
}

export const hideSnackBar = () => {
  return snackBarRef.ref?.closeSnack()
}