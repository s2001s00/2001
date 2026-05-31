import { GameManager } from '../game/GameManager';

export interface ShopItem {
    id: string;
    name: string;
    emoji: string;
    coins: number;
    price: string; // 人民币价格
    description: string;
}

export class ShopManager {
    private gameManager: GameManager;
    private shopItems: ShopItem[] = [
        {
            id: 'coins-100',
            name: '100金币',
            emoji: '🤑',
            coins: 100,
            price: '¥6.00',
            description: '立即获得100金币'
        },
        {
            id: 'coins-500',
            name: '500金币',
            emoji: '🤑',
            coins: 500,
            price: '¥25.00',
            description: '立即获得500金币 (省10%!)'
        },
        {
            id: 'coins-1000',
            name: '1000金币',
            emoji: '💰',
            coins: 1000,
            price: '¥45.00',
            description: '立即获得1000金币 (省25%!)'
        },
        {
            id: 'coins-5000',
            name: '5000金币',
            emoji: '💎',
            coins: 5000,
            price: '¥200.00',
            description: '立即获得5000金币 (省33%!)'
        },
        {
            id: 'coins-10000',
            name: '10000金币',
            emoji: '👑',
            coins: 10000,
            price: '¥368.00',
            description: '立即获得10000金币 (省39%!)'
        }
    ];

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
    }

    /**
     * 打开商城
     */
    public openShop(): void {
        const modal = document.getElementById('shop-modal');
        const container = document.getElementById('shop-items-container');
        
        if (!modal || !container) return;

        container.innerHTML = this.shopItems.map(item => `
            <div class="shop-item">
                <div class="shop-item-info">
                    <h3>${item.emoji} ${item.name}</h3>
                    <p style="font-size: 12px; color: #999;">${item.description}</p>
                </div>
                <button class="shop-item-price" onclick="shopManager.purchaseItem('${item.id}')">购买 ${item.price}</button>
            </div>
        `).join('');

        modal.classList.add('active');
    }

    /**
     * 购买商品
     */
    public purchaseItem(itemId: string): void {
        const item = this.shopItems.find(i => i.id === itemId);
        if (!item) return;

        // 在实际应用中，这里会调用支付SDK（如微信支付、App Store等）
        // 这里作为演示，直接给予金币
        this.gameManager.rechargeCoins(item.coins);
        
        alert(`✅ 购买成功！\n获得 ${item.coins} 金币`);
        
        // 记录购买信息
        this.logPurchase(item);
    }

    /**
     * 记录购买信息（用于分析和反作弊）
     */
    private logPurchase(item: ShopItem): void {
        const purchaseLog = {
            itemId: item.id,
            coins: item.coins,
            price: item.price,
            timestamp: new Date().toISOString(),
            userId: localStorage.getItem('userId') || 'anonymous'
        };
        
        // 可以发送到服务器进行验证
        console.log('Purchase Log:', purchaseLog);
    }

    /**
     * 获取所有商品
     */
    public getShopItems(): ShopItem[] {
        return this.shopItems;
    }
}
