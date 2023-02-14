class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
    this.agedBrie = 'Aged Brie';
    this.agedRum = 'Aged Rum';
    this.agedCheese = 'Aged Cheese';
    this.backStage = 'Backstage passes to a TAFKAL80ETC concert';
    this.backStage2 = 'Backstage passes to a TAFKAL80ETC concert - version 2';
    this.sulfuras = 'Sulfuras, Hand of Ragnaros';
    this.legendaryItem = 'legendaryItem';
    this.epicItem = 'epicItem';
    this.backstagePassItem = 'backstagePassItem';
    this.settings = [
      { name: this.sulfuras, type: this.legendaryItem }, 
      { name: this.agedBrie, type: this.epicItem },
      { name: this.agedRum, type: this.epicItem }, 
      { name: this.agedCheese, type: this.epicItem }, 
      { name: this.backStage, type: this.backstagePassItem },
      { name: this.backStage2, type: this.backstagePassItem },
    ];
    this.legendaryItemList = this.settings.filter(item => item.type == this.legendaryItem);
    this.epicItemList = this.settings.filter(item => item.type == this.epicItem);
    this.backstagePassItemList = this.settings.filter(item => item.type == this.backstagePassItem);
    this.combinedList = [
      {list: this.legendaryItemList, handler: new LegendaryItemsHandler()},
      {list: this.epicItemList, handler: new EpicItemsHandler()},
      {list: this.backstagePassItemList, handler: new BackstagePassItemsHandler()},
    ]
  }

  updateSellIn() {
    for (let item of this.items) {
      if (this.legendaryItemList.find((i) => i.name == item.name)) {
        new LegendaryItemsHandler().updateSellIn(item);
      } else {
        new ItemHandler().updateSellIn(item);
      }
    }
    return this.items;
  }

  updateQuality() {
    for (let item of this.items) {
      if (this.legendaryItemList.find((i) => i.name == item.name)) {
        new LegendaryItemsHandler().updateQuality(item);
      }
      else if (this.epicItemList.find((i) => i.name == item.name)) {
        new EpicItemsHandler().updateQuality(item);
      }
      else if (this.backstagePassItemList.find((i) => i.name == item.name)) {
        new BackstagePassItemsHandler().updateQuality(item);
      }
      else {
        new ConjuredItemsHandler().updateQuality(item);
      }
    }
    return this.items;
  }
}







class ItemHandler {
  constructor() {
    this.minQuality = 0;
    this.maxQuality = 50;
    this.changedQuality = 1;
    this.changedSellIn = -1;
    this.minDayLimit = 0;
    this.dayLimits = [10, 5].sort((a, b) => b - a);
  }
  updateSellIn(item) {
    item.sellIn += this.changedSellIn;
  }
  changeQuality(item) {
    item.quality += this.changedQuality;
  }
  validateQuality(item) {
    if (item.quality <= this.minQuality) {
      item.quality = this.minQuality;
    }
    else if (item.quality >= this.maxQuality) {
      item.quality = this.maxQuality;
    }
  }
}

class LegendaryItemsHandler extends ItemHandler {
  constructor() {
    super();
    this.changedQuality = 0;
    this.maxQuality = 80;
    this.minQuality = 80;
  }
  updateSellIn(item) {
    item.sellIn = item.sellIn;
  }
  updateQuality(item) {
    this.changeQuality(item);
    this.validateQuality(item);
  }
  validateQuality(item) {
    item.quality = this.maxQuality;
  }
}

class EpicItemsHandler extends ItemHandler {
  constructor() {
    super();
  }
  updateQuality(item) {
    this.changeQuality(item);
    if (item.sellIn < this.minDayLimit) {
      this.changeQuality(item);
    }
    this.validateQuality(item);
  }
}

class BackstagePassItemsHandler extends ItemHandler {
  constructor() {
    super();
  }
  updateQuality(item) {
    if (item.sellIn >= this.minDayLimit) this.changeQuality(item);
    if (item.sellIn >= this.minDayLimit && item.sellIn <= this.dayLimits[0]) this.changeQuality(item);
    if (item.sellIn >= this.minDayLimit && item.sellIn <= this.dayLimits[1]) this.changeQuality(item);
    if (item.sellIn < this.minDayLimit) item.quality = this.minQuality;
    this.validateQuality(item);
  }
}

class ConjuredItemsHandler extends ItemHandler {
  constructor() {
    super();
    this.changedQuality = -1;
  }
  updateQuality(item) {
    this.changeQuality(item);
    if (item.sellIn < this.minDayLimit) {
      this.changeQuality(item);
    }
    this.validateQuality(item);
  }
}

module.exports = {
  Item,
  Shop
}

