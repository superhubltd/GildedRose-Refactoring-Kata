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
    this.categorizedLists = [
      {name: this.legendaryItemList, itemHandler: LegendaryItemsHandler},
      {name: this.epicItemList, itemHandler: EpicItemsHandler},
      {name: this.backstagePassItemList, itemHandler: BackstagePassItemsHandler},
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
    let handled = false;
    for (let item of this.items) {
      for(let list of this.categorizedLists){
        if (list.name.find((i) => i.name == item.name)) { 
          new list.itemHandler().updateQuality(item);
          handled = true;
        }
      }
      if(handled == false){
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
    this.dayLimits = [
      {day:100, changedQuality:1 },
      {day:10, changedQuality:1 },
      {day:5, changedQuality:1},
    ].sort((a, b)=> a.day>b.day?-1:1);
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
    for(let dayLimit of this.dayLimits){
      if (item.sellIn >= this.minDayLimit && item.sellIn <= dayLimit.day)
      item.quality += dayLimit.changedQuality;
    } 
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

