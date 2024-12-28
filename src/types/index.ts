export interface Pair {
  pair1: string;
  pair2: string;
}

export interface DrawResponse {
  code: string;
  pairs: Pair[];
}

export interface FileHandlingState {
  isDragging: boolean;
  files: string[];
  pairs: Pair[];
}