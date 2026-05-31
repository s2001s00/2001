import { GameManager } from '../game/GameManager';

export class SaveManager {
    private gameManager: GameManager;
    private saveKey: string = 'cafe-game-save';

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
    }

    /**
     * 保存游戏进度
     */
    public saveGame(): void {
        const gameState = this.gameManager.getGameState();
        const saveData = {
            gameState,
            timestamp: new Date().toISOString(),
            version: '1.0.0'
        };

        try {
            localStorage.setItem(this.saveKey, JSON.stringify(saveData));
            console.log('✅ 游戏已保存');
        } catch (error) {
            console.error('保存失败:', error);
        }
    }

    /**
     * 加载游戏进度
     */
    public loadGame(): void {
        try {
            const saveData = localStorage.getItem(this.saveKey);
            if (saveData) {
                const data = JSON.parse(saveData);
                this.gameManager.setGameState(data.gameState);
                console.log('✅ 游戏已加载');
            } else {
                console.log('没有保存数据，开始新游戏');
            }
        } catch (error) {
            console.error('加载失败:', error);
        }
    }

    /**
     * 清除游戏数据
     */
    public clearSave(): void {
        try {
            localStorage.removeItem(this.saveKey);
            console.log('✅ 游戏数据已清除');
        } catch (error) {
            console.error('清除失败:', error);
        }
    }
}
