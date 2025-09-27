import { inject, observer } from "mobx-react";

const valueMap = {
    '#': 'ENTER',
    '⌫': 'BACKSPACE',
    ' ': 'SPACE'
}

export const KeyBoardCharacter = inject('store')(observer(({store, value}) => {
    const displayValue = value === '#' ? 'ENTER' : value;
    const id = valueMap[value] || value;

    const onClick = () => {
        store.onCharacterEnter(id);
    }
    
    return <span id={id} className='keyboard-character' onClick={onClick} >{displayValue}</span>
  }));