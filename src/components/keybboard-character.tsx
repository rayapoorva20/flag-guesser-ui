import { inject, observer } from "mobx-react";

const valueMap = {
    '#': 'ENTER',
    '⌫': 'BACKSPACE',
}

const idMap = {
    ...valueMap,
    ' ': 'SPACE',
}



export const KeyBoardCharacter = inject('store')(observer(({store, value}) => {
    const displayValue = value === '#' ? 'ENTER' : value;
    const id = idMap[value] || value;

    const onClick = () => {
        store.onCharacterEnter(valueMap[value] || value);
    }
    
    return <span id={id} className='keyboard-character' onClick={onClick} >{displayValue}</span>
  }));