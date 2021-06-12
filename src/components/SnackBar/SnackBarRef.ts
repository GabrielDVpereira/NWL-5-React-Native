interface SnackRefProps {
  openSnack: () => void; 
  closeSnack: () => void; 
}

class SnackBarRef {
  private snackabar: SnackRefProps | null = null;
  
  get ref(){
    return this.snackabar; 
  }

  set ref(newRef){
    this.snackabar = newRef;
  }
  
  
}

export default new SnackBarRef()