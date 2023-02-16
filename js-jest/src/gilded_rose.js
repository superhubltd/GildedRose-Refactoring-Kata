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
    this.legendaryItem = 'LegendaryItem';
    this.epicItem = 'EpicItem';
    this.backstagePassItem = 'BackstagePassItem';
    this.conjuredItem = 'ConjuredItem';
    this.normalItem = 'NormalItem';

    this.settings = [];
    this.settingMap = {
      'LegendaryItem': 'Sulfuras',
      'EpicItem': 'Aged',
      'BackstagePassItem': 'Backstage passes',
      'ConjuredItem': 'Conjured',
    }

    this.setUp();

    this.categories = this.settings.reduce((categories, item) => {
      (categories[item.type] = categories[item.type] || []).push(item);
      return categories;
    }, {})

    this.handlerMap = {
      'LegendaryItem': LegendaryItemHandler,
      'EpicItem': EpicItemHandler,
      'BackstagePassItem': BackstagePassItemHandler,
      'ConjuredItem': ConjuredItemHandler,
      'NormalItem': NormalItemHandler
    }
    this.categorize();
  }

  setUp() {
    for (let item of this.items) {
      let type = null;
      for (const [key, value] of Object.entries(this.settingMap)) {
        if (item.name.includes(value)) {
          type = key; // need to check if it belongs to specific type // Y/N that type
        }
      }
      if (type == null) {
        type = this.normalItem;
      }

      this.settings.push({ 
        name: item.name, 
        sellIn: item.sellIn, 
        quality: item.quality, 
        type: type })
    }
    // getTypeByItemName - function
  }

  categorize() {
    // Assume all category keys can be found in handlerMap.
    for (const [key, value] of Object.entries(this.categories)) {
      value.map((item => Object.assign(item, { itemHandler: this.handlerMap[key] })))
    }
  }

  updateSellIn() {
    for (let item of this.items) {
      if (this.settings.type = this.legendaryItem){
        new LegendaryItemHandler().updateSellIn(item);
      }else {
        new ItemHandler().updateSellIn(item);
      }
    }
  }

  updateQuality() {
    new Validator().validate(this.settings, (item => item.name));
    for (let item of this.items) {
        this.settings.find((i)=>{
          if(i.name == item.name){
            new i.itemHandler().updateQuality(item);
          }
        })      
    }
  }

  updateAll() {
    this.updateSellIn();
    this.updateQuality();
    return this.items;
  }
}


class Validator {
  validate(list, validateItem) {
    let validatedArr = (list).map(validateItem);
    var isDuplicate = validatedArr.some((item, idx) => validatedArr.indexOf(item) != idx);
    if (isDuplicate == true) {
      throw new Error(`${validateItem} has duplicate items, please check again!`);
    } else {
      return
    }
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
      { day: 100, changedQuality: 1 },
      { day: 10, changedQuality: 1 },
      { day: 5, changedQuality: 1 },
    ];
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

class LegendaryItemHandler extends ItemHandler {
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

class EpicItemHandler extends ItemHandler {
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

class BackstagePassItemHandler extends ItemHandler {
  constructor() {
    super();
  }
  updateQuality(item) {
    new Validator().validate(this.dayLimits, (item => item.day));

    for (let dayLimit of this.dayLimits) {
      if (item.sellIn >= this.minDayLimit && item.sellIn <= dayLimit.day)
        item.quality += dayLimit.changedQuality;
    }
    if (item.sellIn < this.minDayLimit) item.quality = this.minQuality;
    this.validateQuality(item);
  }
}

class ConjuredItemHandler extends ItemHandler {
  constructor() {
    super();
    this.changedQuality = -2;
  }
  updateQuality(item) {
    this.changeQuality(item);
    this.validateQuality(item);
  }
}

class NormalItemHandler extends ItemHandler {
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

