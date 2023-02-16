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

    // not shop settings, items additional information, so how to rename it?
    // or directly remove this.settings, and use this.items directly?
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
    //    getTypeByItemName(){}- function
  }



  categorize() {
    // Assume all category keys can be found in handlerMap.
    for (const [key, value] of Object.entries(this.categories)) {
      value.map((item => Object.assign(item, { itemHandler: this.handlerMap[key] })))
    }
  }

  updateSellIn(dayLimits) {
    for (let item of this.items) {
      // what if conjuredItem sellIn remained unchanged
      // 10 items - how many handler instance will have?
      // a. 10 legendary items
      // b. 5 legendary items  , 5 conjured items
      // min handler will be enough?

      // do not use if-else , what are the alternative?
      if (this.settings.find((i)=>i.type == this.legendaryItem)){
        new LegendaryItemHandler(dayLimits).updateSellIn(item);
      }else {
        new ItemHandler(dayLimits).updateSellIn(item);
      }
    }
  }

  // validate this.settings - what is it then?
  updateQuality(dayLimits) {

    // function name (.validate) - ensure what?
    new Validator().validate(this.settings, (item => item.name));
    for (let item of this.items) {
        // this.settings.find((i)=>{
        //   if(i.name == item.name){
            new item.itemHandler(dayLimits).updateQuality(item);
        //   }
        // })      
    }
  }

  updateAll(dayLimits) {
    // must not change the order of execution
    // return this.settings;
    this.updateSellIn(dayLimits);
    this.updateQuality(dayLimits);
    return this.items;
  }
}


class Validator {
  constructor(){

  }
  validate(list, validateItem) {
    let validatedArr = (list).map(validateItem);
    var isDuplicate = validatedArr.some((item, idx) => validatedArr.indexOf(item) != idx);
    if (isDuplicate == true) {
      throw new Error(`${validateItem} has duplicate items, please check again!`);
    } else {
      // rule 1 - cannot duplicate (catered); rule 2 - cannot be empty (NOT YET catered!)
      // validateItem -> need to describe more accurately because it is actually a function
      // is 'return' necessary?
      return
    }
  }
}


class ItemHandler {
  constructor(dayLimits) {
    this.minQuality = 0;
    this.maxQuality = 50;
    this.changedQuality = 1;
    this.changedSellIn = -1;
    this.minDayLimit = 0;

    // this.dayLimits = pass in? or default empty array
    // this.dayLimit==[]?[]: dayLimits;
    
    this.dayLimits = [];
    this.dayLimits = dayLimits;
  }

  updateSellIn(item) {
    item.sellIn += this.changedSellIn;
  }
  changeQuality(item, changedquality) {
    item.quality += this.changedQuality;
  }

  // + updateQuality(item){}
    // rename - because validate only check, not change the original item
  // Validator vs rules
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
  constructor(dayLimits) {
    super();
    this.changedQuality = 0;
    this.maxQuality = 80;
    this.minQuality = 80;
    this.dayLimits = dayLimits;
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
  constructor(dayLimits) {
    super();
    this.dayLimits = dayLimits;
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
  constructor(dayLimits) {
    super();
    this.dayLimits = dayLimits;
  }
  updateQuality(item) {
    new Validator().validate(this.dayLimits, (item => item.day));
    // rename dayLimit - too specific
    for (let dayLimit of this.dayLimits) {
      if (item.sellIn >= this.minDayLimit && item.sellIn <= dayLimit.day)
        changeQuality(item, dayLimit.changedQuality)
    }
    // may consider change the statement to method in itemHandler;
    if (item.sellIn < this.minDayLimit) item.quality = this.minQuality;
    this.validateQuality(item);
  }
}

// what if normalItemHandler to replace conjuredItemHandler?
class ConjuredItemHandler extends ItemHandler {
  constructor(dayLimits) {
    super();
    // check check how to name changedQuality
    this.changedQuality = -2;
    this.dayLimits = dayLimits;
  }

  // changeQuality
  updateQuality(item) {
    this.changeQuality(item);
    if (item.sellIn < this.minDayLimit) {
      this.changeQuality(item);
    }
    this.validateQuality(item);
  }
}

class NormalItemHandler extends ItemHandler {
  constructor(dayLimits) {
    super();
    this.changedQuality = -1;
    this.dayLimits = dayLimits;
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
  Shop,
  Validator
}

