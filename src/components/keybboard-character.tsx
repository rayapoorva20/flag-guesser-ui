import { inject, observer } from "mobx-react";

export const KeyBoardCharacter = inject('store')(observer(({store, value}) => {
    const onClick = () => {
        store.onCharacterEnter(displayValue);
    }
    const displayValue = value === '#' ? 'ENTER' : value;
    
    return <span id={displayValue} className='keyboard-character' onClick={onClick}>{displayValue}</span>
  }));