import { inject, observer } from "mobx-react"
import { useEffect, useState } from "react"
import { GameManager, RowState } from "../store/game-manager";

interface WordleRowOwnProps {
  value?: string[];
  state?: RowState;
}

type WordleRowProps = WordleRowOwnProps & { store?: GameManager };

const charMap = {
    ' ': '.',
}
const getClassArrayFromSolution = (state, value, solution) => {
    console.log('***solution', solution);
    if(state !== 'valid'){
        return Array(value.length).fill('');
    }
    
    const res = Array(value.length).fill('single-character--incorrect');
    for(let i = 0; i < value.length; ++i){
        if(value[i] === solution[i]){
            res[i] = 'single-character--correct';
        }
    }
    return res;
}
export const WordleRow = inject('store')(observer((props: WordleRowProps) => {
    const { store, value = [], state } = props;
    const rotationTime = 200;
    const [shake, setShake] = useState(true);
    const [toRotate, setToRotate] = useState(Array(value.length).fill(false));
    const [rotatedIndex, setRotatedIndex] = useState(-1);
    const {solution} = store!;
    const classArray = getClassArrayFromSolution(state, value, solution);
    useEffect(() => {
        setToRotate(Array(value.length).fill(false));
        setRotatedIndex(-1);
    }, [solution]);

    useEffect(()=>{
        if(state === RowState.VALID){
            setRotatedIndex(0);
            store?.setEntryAllowed(false);
        }
        else if(state === RowState.VALIDATION_FAILURE){
            setShake(true);
            store?.setEntryAllowed(false);
            setTimeout(() => {
                store?.setRowValidity(RowState.ACTIVE);
            }, 500);
        }
        else{
            setShake(false);
            store?.setEntryAllowed(true);
        }
    },[state])

    useEffect(() => {
        if(state === RowState.VALID && rotatedIndex < value.length){
            setTimeout(()=>{
                const dup = structuredClone(toRotate);
                dup[rotatedIndex] = true;
                setToRotate(dup);
                setRotatedIndex(rotatedIndex+1);
            }, rotationTime);
        }
    }, [rotatedIndex])

    useEffect(() => {
        if(rotatedIndex === value.length){
            store?.setEntryAllowed(true);
        }
    }, [rotatedIndex])

    return (
      <div className={`wordle-row ${shake ? 'wordle-row--shake' : ''}`}>
        {value.map((curr, index) => {
          return <span style={{
            '--rotationTime': `${rotationTime}ms`
          } as any} className={`single-character ${toRotate[index] ? `single-character--flip  ${classArray[index]}` : ''}`} key={index}>{charMap[curr]||curr}</span>
        })}
      </div> 
    )

}))