import snackBarRef from './SnackBarRef'; 


export const showSnackBar = () => {
  return snackBarRef.ref?.openSnack()
}

export const hideSnackBar = () => {
  return snackBarRef.ref?.closeSnack()
}