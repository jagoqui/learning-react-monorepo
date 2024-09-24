import {WINNER_COMBOS} from "../constants/constants"

export const checkWinnerFrom = (boardToCheck) => {
    for(const comb of WINNER_COMBOS){
      const [a, b, c] = comb;
      if(boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[b] === boardToCheck[c]){
        return boardToCheck[a];
      }
    }
    return null;
  }
