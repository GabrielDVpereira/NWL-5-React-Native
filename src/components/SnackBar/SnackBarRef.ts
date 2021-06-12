import { SnackHandles } from "./types";

class SnackBarRef {
  private snackabar: SnackHandles | null = null;
  
  get ref(){
    return this.snackabar; 
  }

  set ref(newRef){
    this.snackabar = newRef;
  }
  
  
}

export default new SnackBarRef()