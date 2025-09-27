import { GameManager } from './game-manager';

export class KeyboardEntryManager {
    gameManager: GameManager;
    constructor(store: GameManager) {
        this.gameManager = store;
        document.addEventListener('keydown', this.onKeyDown);
    }

    onKeyDown = (e) => {
        console.log('***PRESSING', e.key.toUpperCase());
        this.gameManager.onCharacterEnter(e.key.toUpperCase());
    }

}
