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
    this.curious = 'curious';
    this.generous = 'Generous';
    this.creature = 'Creature';
    this.fantasy = 'Fantasy';
    this.soulgem = 'Soulgem';
    this.conjured = 'Conjured';
    this.sulfuras = 'Sulfuras, Hand of Ragnaros';
    this.sulfuras2 = 'Sulfuras, Hand of Ragnaros v2';
    this.legendaryItem = 'LegendaryItem';
    this.epicItem = 'EpicItem';
    this.backstagePassItem = 'BackstagePassItem';
    this.conjuredItem = 'ConjuredItem';
    this.normalItem = 'NormalItem';

    this.settings = [
      { name: this.sulfuras, type: this.legendaryItem },
      { name: this.sulfuras2, type: this.legendaryItem },
      { name: this.agedBrie, type: this.epicItem },
      { name: this.agedRum, type: this.epicItem },
      { name: this.agedCheese, type: this.epicItem },
      { name: this.backStage, type: this.backstagePassItem },
      { name: this.backStage2, type: this.backstagePassItem },
      { name: this.curious, type: this.normalItem },
      { name: this.generous, type: this.normalItem },
      { name: this.creature, type: this.normalItem },
      { name: this.fantasy, type: this.normalItem },
      { name: this.soulgem, type: this.normalItem },
      { name: this.conjured, type: this.conjuredItem },
    ];
    this.settings2 = [];

    this.categories = this.settings.reduce((categories, item) => {
      (categories[item.type] = categories[item.type] || []).push(item);
      return categories;
    }, {})

    // source: categories2 , function name: updateQuality
    this.categories['LegendaryItem'].map((item => Object.assign(item, { itemHandler: LegendaryItemsHandler })))
    this.categories['EpicItem'].map((item => Object.assign(item, { itemHandler: EpicItemsHandler })))
    this.categories['BackstagePassItem'].map((item => Object.assign(item, { itemHandler: BackstagePassItemsHandler })))
    this.categories['ConjuredItem'].map((item => Object.assign(item, { itemHandler: ConjuredItemsHandler })))
    this.categories['NormalItem'].map((item => Object.assign(item, { itemHandler: NormalItemsHandler })))

    // console.log('categories: ', this.categories2);
    // console.log('categories key: ', Object.keys(this.categories2));

  }
  // categorization(){}

  updateSellIn() {
    for (let item of this.items) {
      if (this.categories[this.legendaryItem].find((i) => i.name == item.name)) {
        new LegendaryItemsHandler().updateSellIn(item);
      } else {
        new ItemHandler().updateSellIn(item);
      }
    }
    return this.items;
  }


  updateQuality() {
    new Validator().validate(this.settings, (item => item.name));

    for (let item of this.items) {
      for (let subCategory in this.categories) {
        this.categories[subCategory].find((subItem) => {
          if (subItem.name == item.name) {
            new subItem.itemHandler().updateQuality(item);
          }
        })
      }

      return this.items;
    }
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
    new Validator().validate(this.dayLimits, (item => item.day));

    for (let dayLimit of this.dayLimits) {
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
    this.changedQuality = -2;
  }
  updateQuality(item) {
    this.changeQuality(item);
    this.validateQuality(item);
  }
}

class NormalItemsHandler extends ItemHandler {
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

