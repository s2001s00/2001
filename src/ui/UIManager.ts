import { GameManager } from '../game/GameManager';

export class UIManager {
    private gameManager: GameManager;
    private coinsDisplay: HTMLElement | null;
    private levelDisplay: HTMLElement | null;
    private coffeeDisplay: HTMLElement | null;
    private customersDisplay: HTMLElement | null;

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
        this.coinsDisplay = document.getElementById('coins-display');
        this.levelDisplay = document.getElementById('level-display');
        this.coffeeDisplay = document.getElementById('coffee-display');
        this.customersDisplay = document.getElementById('customers-display');
    }

    /**
     * 初始化UI
     */
    public init(): void {
        console.log('UI Manager initialized');
    }

    /**
     * 更新UI显示
     */
    public update(): void {
        if (this.coinsDisplay) {
            this.coinsDisplay.textContent = this.formatNumber(this.gameManager.getCoins());
        }
        if (this.levelDisplay) {
            this.levelDisplay.textContent = this.gameManager.getLevel().toString();
        }
        if (this.coffeeDisplay) {
            this.coffeeDisplay.textContent = this.gameManager.getCoffeeStock().toString();
        }
        if (this.customersDisplay) {
            this.customersDisplay.textContent = this.gameManager.getCustomersInQueue().toString();
        }
    }

    /**
     * 格式化大数字显示
     */
    private formatNumber(num: number): string {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    /**
     * 显示通知
     */
    public showNotification(message: string, duration: number = 2000): void {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #667eea;
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            z-index: 2000;
            animation: slideDown 0.3s;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, duration);
    }
}
