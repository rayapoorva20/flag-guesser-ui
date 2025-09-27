import { GameManager } from "../store/game-manager";
import { WordleRow } from "./wordle-row";
import { inject, observer } from "mobx-react";


export const PlayArea = inject('store')(observer(({store}: {store?: GameManager}) => {
    const word = store?.currentSet;
    return (
      <div className='wordle-play-area'>
        <WordleRow value={word} state={store!.rowValidity}/>
      </div>
    )
  
  }))