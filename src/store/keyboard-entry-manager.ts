import { GameManager } from './game-manager';

export class KeyboardEntryManager {
    gameManager: GameManager;
    constructor(store: GameManager) {
        this.gameManager = store;
        document.addEventListener('keydown', this.onKeyDown);
    }

    onKeyDown = (e) => {
        this.gameManager.onCharacterEnter(e.key.toUpperCase());
    }

}
