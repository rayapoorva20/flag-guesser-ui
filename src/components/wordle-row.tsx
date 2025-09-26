import { inject, observer } from "mobx-react"
import { useEffect, useState } from "react"

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
        else if(solution.includes(value[i])){
            res[i] = 'single-character--present';
        }
    }
    return res;
}
export const WordleRow = inject('store')(observer(({store, value, state}) => {
    console.log('***value', value);
    const rotationTime = 200;
    const [shake, setShake] = useState(true);
    const [toRotate, setToRotate] = useState(Array(value.length).fill(false));
    const [rotatedIndex, setRotatedIndex] = useState(-1);
    const {solution} = store;
    const classArray = getClassArrayFromSolution(state, value, solution);
    useEffect(()=>{
        if(state === 'valid'){
            setRotatedIndex(0);
            store.setEntryAllowed(false);
        }
        else if(state === 'invalid'){
            setShake(true);
            store.setEntryAllowed(false);
        }
        else{
            setShake(false);
            store.setEntryAllowed(true);
        }
    },[state])


    useEffect(() => {
        if(state === 'valid' && rotatedIndex < value.length){
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
            store.setEntryAllowed(true);
        }
    }, [rotatedIndex])

    return (
      <div className={`wordle-row ${shake ? 'wordle-row--shake' : ''}`}>
        {value.map((curr, index) => {
          return <span style={{
            '--rotationTime': `${rotationTime}ms`
          } as any} className={`single-character ${toRotate[index] ? `single-character--flip  ${classArray[index]}` : ''}`} key={index}>{curr}</span>
        })}
      </div> 
    )

}))