import { action, makeObservable, observable } from "mobx";

export class GameManager{
    solution?: string;
    length: number = 0;
    rowValidity;
    currentSet?: Array<string>;
    entryAllowed = true;
    activeRow;
    activeElement;
    solutionCode?: string;

    constructor(){
      makeObservable(this, {
        solution: observable,
        currentSet: observable.deep,
        rowValidity: observable.deep,
        entryAllowed: observable,
        onCharacterEnter: action,
        setRowValidity: action
      })
      this.init();
      this.rowValidity = 'inactive';
      this.activeRow = 0;
      this.activeElement = 0;
      
    }
    
    restart = () => {
      this.init();
    }
    init = async () => {
      // this.solution = await new Promise((res) => setTimeout(() => res("BELGIUM") , 3000));
      try{
        const response = await fetch('http://localhost:8080/get-country');
        const data = await response.json();
        console.log('___data', data);
        const {code, countryName} = data;
        this.solution = countryName.toUpperCase();
        this.solutionCode = code;
      }
      catch(e){
        console.error('___error', e);
      }

      this.length = this.solution.length;
      this.currentSet = Array(this.length).fill('');
    }

    setEntryAllowed = (value) => {
      this.entryAllowed = value;
    }
    
    setRowValidity = (state) => {
        this.rowValidity = state;
    }

    validate(){
        if(this.solution && this.solution === (this.currentSet?.join(''))){
            this.setRowValidity('valid');
            return true
        }
        this.setRowValidity('invalid');
        return false;
    }

    onCharacterEnter = (key) => {
      if(!this.entryAllowed){
        return;
      }
      if(key === 'ENTER' && this.activeElement === this.length){
        if(!this.validate()){
            return false;
        }
      }
      else if(key === '⌫'){
        this.currentSet && (this.currentSet[Math.max(0, this.activeElement-1)] = '');
        this.activeElement = Math.max(0, this.activeElement-1);
      }
      else if(key === 'ENTER' || this.activeElement === this.length){
        return;
      }
      else{
        this.currentSet && (this.currentSet[Math.max(0, this.activeElement)] = key);
        this.activeElement = Math.min(this.length, this.activeElement+1);
      }
    }
  }
  