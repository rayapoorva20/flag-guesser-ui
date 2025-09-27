import { makeObservable, observable } from "mobx";

export enum ImageState{
    LOADING = 'LOADING',
    LOADED = 'DONE',
    FAILED = 'FAILED'
}
export class FlagImageManager {
    state = ImageState.LOADING;
    constructor(){
        makeObservable(this, {
            state: observable
        });
    }
    onFetchStart = () => {
        this.state = ImageState.LOADING;
    }
    onFetchComplete = () => {
        this.state = ImageState.LOADED;
    }
    onFetchError = () => {
        this.state = ImageState.FAILED;
    }
}