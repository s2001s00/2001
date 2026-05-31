export class GameManager {
    // 游戏数据
    private coins: number = 0;           // 金币
    private level: number = 1;           // 等级
    private coffeeStock: number = 0;     // 咖啡库存
    private totalCustomers: number = 0;  // 总顾客数
    private coffeeMachineLevel: number = 1; // 咖啡机等级
    private baseIncomePerCustomer: number = 10; // 基础收入
    private customersInQueue: number = 0; // 排队顾客数
    private upgradeBaseCost: number = 50; // 升级基础成本

    constructor() {
        this.initializeGame();
    }

    private initializeGame(): void {
        // 初始化游戏状态
        console.log('游戏初始化完成');
    }

    /**
     * 启动游戏
     */
    public start(): void {
        this.generateCustomers();
        this.startProductionCycle();
    }

    /**
     * 生成顾客
     */
    private generateCustomers(): void {
        setInterval(() => {
            const newCustomers = Math.floor(Math.random() * 3) + 1 + this.level;
            this.customersInQueue += newCustomers;
        }, 3000); // 每3秒生成顾客
    }

    /**
     * 生产周期
     */
    private startProductionCycle(): void {
        setInterval(() => {
            // 自动生产咖啡
            const productionRate = 1 + this.coffeeMachineLevel;
            this.coffeeStock += productionRate;
        }, 2000); // 每2秒自动生产
    }

    /**
     * 服务顾客
     */
    public serveCustomer(): void {
        if (this.customersInQueue > 0 && this.coffeeStock > 0) {
            this.customersInQueue--;
            this.coffeeStock--;
            this.coins += this.getIncomePerCustomer();
            this.totalCustomers++;
            
            // 升级逻辑
            this.checkLevelUp();
            
            console.log(`服务顾客 +${this.getIncomePerCustomer()} 金币`);
        } else {
            alert('咖啡不足或没有顾客！');
        }
    }

    /**
     * 升级咖啡机
     */
    public upgradeCoffeeMachine(): void {
        const upgradeCost = this.getUpgradeCost();
        if (this.coins >= upgradeCost) {
            this.coins -= upgradeCost;
            this.coffeeMachineLevel++;
            console.log(`咖啡机升级到 ${this.coffeeMachineLevel} 级`);
        } else {
            alert(`升级需要 ${upgradeCost} 金币！`);
        }
    }

    /**
     * 充值金币
     */
    public rechargeCoins(amount: number): void {
        this.coins += amount;
        console.log(`充值 ${amount} 金币，总计: ${this.coins}`);
    }

    /**
     * 检查升级
     */
    private checkLevelUp(): void {
        const coinsNeededForLevel = this.level * 100;
        if (this.totalCustomers >= coinsNeededForLevel) {
            this.level++;
            console.log(`升级到等级 ${this.level}`);
        }
    }

    /**
     * 获取每个顾客的收入
     */
    private getIncomePerCustomer(): number {
        return this.baseIncomePerCustomer * (1 + this.coffeeMachineLevel * 0.5);
    }

    /**
     * 获取升级成本
     */
    private getUpgradeCost(): number {
        return Math.floor(this.upgradeBaseCost * Math.pow(1.5, this.coffeeMachineLevel - 1));
    }

    // Getters
    public getCoins(): number { return Math.floor(this.coins); }
    public getLevel(): number { return this.level; }
    public getCoffeeStock(): number { return Math.floor(this.coffeeStock); }
    public getTotalCustomers(): number { return this.totalCustomers; }
    public getCoffeeMachineLevel(): number { return this.coffeeMachineLevel; }
    public getCustomersInQueue(): number { return this.customersInQueue; }
    public getUpgradeCostDisplay(): number { return this.getUpgradeCost(); }
    public getIncomeDisplay(): number { return Math.floor(this.getIncomePerCustomer()); }

    // 私有属性访问（用于保存）
    public getGameState() {
        return {
            coins: this.coins,
            level: this.level,
            coffeeStock: this.coffeeStock,
            totalCustomers: this.totalCustomers,
            coffeeMachineLevel: this.coffeeMachineLevel,
            customersInQueue: this.customersInQueue
        };
    }

    public setGameState(state: any) {
        this.coins = state.coins || 0;
        this.level = state.level || 1;
        this.coffeeStock = state.coffeeStock || 0;
        this.totalCustomers = state.totalCustomers || 0;
        this.coffeeMachineLevel = state.coffeeMachineLevel || 1;
        this.customersInQueue = state.customersInQueue || 0;
    }
}
