import { observer } from "mobx-react"
import { KeyBoardCharacter } from "./keybboard-character"

export const KeyboardLayout = observer(() => {
    const rows = [
      "QWERTYUIOP",
      "ASDFGHJKL",
      "#ZXCVBNM⌫",
      " "
    ]
    return (
      <div className='keyboard-layout'>
        {rows.map((currRow, index) => {
          return (
            <div className='keyboard-row' key={index}>
              {
                currRow.split('').map((value) => {
                    return <KeyBoardCharacter key={value} value={value}/>
                })
              }
            </div>
          )
        })}
      </div>
    )
  })