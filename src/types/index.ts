export interface Pair {
    pair1: string;
    pair2: string;
  }
  
  export interface FileHandlingState {
    isDragging: boolean;
    files: string[];
    pairs: Pair[];
  }