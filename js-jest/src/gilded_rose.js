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

    this.itemsMap = {
      'LegendaryItem': 'Sulfuras',
      'EpicItem': 'Aged',
      'BackstagePassItem': 'Backstage passes',
      'ConjuredItem': 'Conjured',
    }

    this.assignItemType();

    this.categories = this.items.reduce((categories, item) => {
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
    this.assignItemHandler();
  }

  assignItemType() {
    new Validator().validateEmptyItems(this.items);
    for (let item of this.items) {
      let type = null;
      for (const [key, value] of Object.entries(this.itemsMap)) {
        if (item.name.includes(value)) {
          type = key; // need to check if it belongs to specific type // Y/N that type
        }
      }
      if (type == null) {
        type = this.normalItem;
      }

      Object.assign(item, {type:type});
    }
    //    getTypeByItemName(){}- function
  }

  assignItemHandler() {
    // Assume all category keys can be found in handlerMap.
    for (const [key, value] of Object.entries(this.categories)) {
      value.map((item => Object.assign(item, { itemHandler: this.handlerMap[key] })))
    }
  }

  updateSellIn(conditions) {
    for (let item of this.items) {
      // what if conjuredItem sellIn remained unchanged
      // 10 items - how many handler instance will have?
      // a. 10 legendary items
      // b. 5 legendary items  , 5 conjured items
      // min handler will be enough?

      // do not use if-else , what are the alternative?
      if (this.items.find((i)=>i.type == this.legendaryItem)){
        new LegendaryItemHandler(conditions).updateSellIn(item);
      }else {
        new ItemHandler(conditions).updateSellIn(item);
      }
    }
  }

  // validate this.settings - what is it then?
  updateQuality(conditions) {

    // function name (.validate) - ensure what?
    new Validator().validateDuplicates(this.items, (item => item.name));
    for (let item of this.items) {
      new item.itemHandler(conditions).updateQuality(item);   
    }
  }

  updateAll(conditions) {
    // must not change the order of execution
    this.updateSellIn(conditions);
    this.updateQuality(conditions);
    return this.items;
  }
}


class Validator {
  constructor(){

  }
  validateDuplicates(list, validateItem) {
    let validatedArr = (list).map(validateItem);
    var isDuplicate = validatedArr.some((item, idx) => validatedArr.indexOf(item) != idx);
    if (isDuplicate == true) {
      throw new Error(`${validateItem} has duplicate items, please check again!`);
    } 
  }

  validateEmptyItems(items){
    if(items.length <=0){
      throw new Error('The itemList is empty!');
    }
  }
}


class ItemHandler {
  constructor(conditions) {
    this.minQuality = 0;
    this.maxQuality = 50;
    this.SellInChange = -1;
    this.minSellInDay = 0;
    this.conditions==[]?[]: conditions;
  }

  updateSellIn(item) {
    item.sellIn += this.SellInChange;
  }

  // updateQuality may be overwritten by different combination of changeQuality method. 
  updateQuality(item, qualityChange) {
    this.changeQuality(item,qualityChange);
  }

  // changeQuality method acts like a building unit of updateQuality method.
  changeQuality(item, qualityChange) {
    item.quality += qualityChange;
  }

  // adjustQuality method adjust quality when quality goes beyond minQuality and maxQuality.
  adjustQuality(item) {
    if (item.quality <= this.minQuality) {
      this.minimizeQuality(item);
    }
    else if (item.quality >= this.maxQuality) {
      this.maximizeQuality(item);
    }
  }

  maximizeQuality(item){
    item.quality = this.maxQuality;
  }

  minimizeQuality(item){
    item.quality = this.minQuality;
  }
}

class LegendaryItemHandler extends ItemHandler {
  constructor(conditions) {
    super();
    this.qualityChange = 0;
    this.maxQuality = 80;
    this.minQuality = 80;
    this.conditions = conditions;
    this.SellInChange = 0;
  }
  updateQuality(item) {
    this.changeQuality(item, this.qualityChange);
    this.adjustQuality(item);
  }
  adjustQuality(item) {
    this.maximizeQuality(item);
  }
}

class EpicItemHandler extends ItemHandler {
  constructor(conditions) {
    super();
    this.qualityChange = 1;
    this.conditions = conditions;
  }
  updateQuality(item) {
    this.changeQuality(item, this.qualityChange);
    if (item.sellIn < this.minSellInDay) {
      this.changeQuality(item, this.qualityChange);
    }
    this.adjustQuality(item);
  }
}

class BackstagePassItemHandler extends ItemHandler {
  constructor(conditions) {
    super();
    this.conditions = conditions;
  }
  updateQuality(item) {
    new Validator().validateDuplicates(this.conditions, (item => item.day));

    for (let condition of this.conditions) {
      if (item.sellIn >= this.minSellInDay && item.sellIn <= condition.day)
        this.changeQuality(item, condition.qualityChange);
    }

    if (item.sellIn < this.minSellInDay) 
    this.minimizeQuality(item);
    this.adjustQuality(item);
  }
}

// what if normalItemHandler to replace conjuredItemHandler?
class ConjuredItemHandler extends ItemHandler {
  constructor(conditions) {
    super();
    this.qualityChange = -2;
    this.conditions = conditions;
  }

  // changeQuality
  updateQuality(item) {
    this.changeQuality(item, this.qualityChange);
    if (item.sellIn < this.minSellInDay) {
      this.changeQuality(item, this.qualityChange);
    }
    this.adjustQuality(item);
  }
}

class NormalItemHandler extends ItemHandler {
  constructor(conditions) {
    super();
    this.qualityChange = -1;
    this.conditions = conditions;
  }
  updateQuality(item) {
    this.changeQuality(item, this.qualityChange);
    if (item.sellIn < this.minSellInDay) {
      this.changeQuality(item, this.qualityChange);
    }
    this.adjustQuality(item);
  }
}

module.exports = {
  Item,
  Shop,
  Validator
}

