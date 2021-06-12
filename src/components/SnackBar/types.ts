export interface SnackBarOptions {
  type?: 'success' | 'error' | 'info';  
  top?: boolean;  
  bottom?: boolean; 
  message: string;
  durantion?: number; 
  onPress?: () => void
}
export interface SnackHandles {
  openSnack: (options: SnackBarOptions) => void; 
  closeSnack: () => void; 
}
