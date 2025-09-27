import { action, makeObservable, observable, computed } from "mobx";
import { FlagImageManager, ImageState } from "./flag-image-manager";
export enum GameState {
  ACTIVE= 'active',
  WON= 'won',
  LOADING= 'loading',
  FAILED_LOADING = 'failed_loading'
}

export enum RowState{
  ACTIVE = 'active',
  VALID = 'valid',
  VALIDATION_FAILURE = 'validation_failure',
}

export class GameManager{
    solution?: string;
    length: number = 0;
    rowValidity?: RowState;
    currentSet: Array<string> = [];
    entryAllowed = true;
    activeRow;
    activeElement;
    solutionCode?: string;
    gameState: GameState = GameState.LOADING;
    imageManager = new FlagImageManager();

    constructor(){
      makeObservable(this, {
        gameState: observable,
        solution: observable,
        currentSet: observable.deep,
        rowValidity: observable.deep,
        entryAllowed: observable,
        onCharacterEnter: action,
        setRowValidity: action,
        setupNewGame: action,
        loading: computed
      })
    }
    
    restart = () => {
      if(this.entryAllowed === false){
        return;
      }
      this.setupNewGame();
    }
    setupNewGame = () => {
      this.gameState = GameState.LOADING;
      this.setRowValidity(RowState.ACTIVE);
      this.activeRow = 0;
      this.activeElement = 0;
      this.init();
    }

    setRowValidity = (state: RowState) => {
      this.rowValidity = state;
    }

    get loading(){
      return this.gameState === GameState.LOADING || this.imageManager.state === ImageState.LOADING;
    }

    init = async () => {
      // this.solution = await new Promise((res) => setTimeout(() => res("BELGIUM") , 3000));
      try{
        const response = await fetch('/api/get-country');
        // const response = await fetch('http://localhost:8080/get-country');
        const data = await response.json();
        this.gameState = GameState.ACTIVE;
        const {code, countryName} = data;
        this.solution = countryName.toUpperCase();
        this.solutionCode = code;
        this.setEntryAllowed(true)
        this.length = this.solution?.length || 0;
        this.currentSet = Array(this.length).fill('');
      }
      catch(e){
        this.gameState = GameState.FAILED_LOADING;
        console.error('___error', e);
      }
      
    }

    setEntryAllowed = (value) => {
      this.entryAllowed = value;
    }
    

    validate(){
        if(this.solution && this.solution === (this.currentSet?.join(''))){
            this.setRowValidity(RowState.VALID);
            this.gameState = GameState.WON;
            return true
        }
        this.setRowValidity(RowState.VALIDATION_FAILURE);
        return false;
    }

    onCharacterEnter = (key) => {
      if('ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(key) === -1 && key !== 'ENTER' && key !== 'BACKSPACE' && key !== ' '){
        return;
      }
      if(this.gameState === GameState.WON){
        return;
      }
      if(key === 'ENTER' && this.activeElement === this.length){
        if(!this.validate()){
            return;
        }
      }
      else if(key === 'BACKSPACE'){
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
  