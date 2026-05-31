import { GameManager } from './game/GameManager';
import { ShopManager } from './shop/ShopManager';
import { UIManager } from './ui/UIManager';
import { SaveManager } from './save/SaveManager';

// 初始化游戏
const gameManager = new GameManager();
const shopManager = new ShopManager(gameManager);
const uiManager = new UIManager(gameManager);
const saveManager = new SaveManager(gameManager);

// 全局引用，便于HTML调用
(window as any).shopManager = shopManager;

// 启动游戏
gameManager.start();
uiManager.init();

// UI 事件绑定
document.getElementById('serve-btn')?.addEventListener('click', () => {
    gameManager.serveCustomer();
});

document.getElementById('upgrade-btn')?.addEventListener('click', () => {
    gameManager.upgradeCoffeeMachine();
});

document.getElementById('shop-btn')?.addEventListener('click', () => {
    shopManager.openShop();
});

document.getElementById('save-btn')?.addEventListener('click', () => {
    saveManager.saveGame();
    alert('游戏已保存！');
});

// 定时更新UI
setInterval(() => {
    uiManager.update();
}, 100);

// 自动保存（每30秒）
setInterval(() => {
    saveManager.saveGame();
}, 30000);

// 页面加载时恢复进度
window.addEventListener('load', () => {
    saveManager.loadGame();
    uiManager.update();
});

// 页面关闭前保存
window.addEventListener('beforeunload', () => {
    saveManager.saveGame();
});
