class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  // Assume Items are all instances of Item
  constructor(items = []) {
    this.items = items;
    this.normalItem = 'NormalItem';
    this.helper = new Validator();

    // rename itemsMap - ask Poe (need to be more self-descriptive)
    this.itemsMap = {
      'LegendaryItem': 'Sulfuras',
      'EpicItem': 'Aged',
      'BackstagePassItem': 'Backstage passes',
      'ConjuredItem': 'Conjured',
    }

    this.assignItemType();

    this.categorizedItems = this.items.reduce((categories, item) => {
      (categories[item.type] = categories[item.type] || []).push(item);
      return categories;
    }, {})

    this.propertiesMap = {
      'LegendaryItem': { 
        itemHandler: LegendaryItemHandler, 
        sellInChange: 0, 
        qualityChange: 0, 
      },
      'EpicItem': { 
        itemHandler: EpicItemHandler, 
        sellInChange: -1, 
        qualityChange: 1,
      },
      'BackstagePassItem': { 
        itemHandler: BackstagePassItemHandler, 
        sellInChange: -1, 
        qualityChange: 1, 
      },
      'ConjuredItem': { 
        itemHandler: ConjuredItemHandler, 
        sellInChange: -1, 
        qualityChange: -2,
      },
      'NormalItem': { 
        itemHandler: NormalItemHandler, 
        sellInChange: -1, 
        qualityChange: -1, 
      },
    }

    this.assignItemProperties()

    // console.log('newItemList: ', Object.keys(this.propertiesMap['LegendaryItem']));
  }

  // helper class
  // must be 2 types of items
  // item.name cannot be more than 100 characters
  // sellIn cannot be less than 5;
  // quality cannot be 0?
  assignItemType() {
    this.helper.validateEmptyItems(this.items);
    this.items.map(item=>{
      this.helper.validateNonItemObjects(item);

      let type = null;
      for (const [key, value] of Object.entries(this.itemsMap)) {
        if (item.name.includes(value)) {
          type = key;
        }
      }
      if (type == null) {
        type = this.normalItem;
      }
      Object.assign(item, { type: type });
      }
    )
  }

  // arrange reduced categorized items inside the assignItemProperties method 
  // propertiesMap --> strategiesMap[key]
  assignItemProperties() {
    // Assume all category keys can be found in handlerMap.
  
    for (const [key, value] of Object.entries(this.categorizedItems)) {
      value.map((item => Object.assign(item, {
        itemHandler: this.propertiesMap[key].itemHandler,
        sellInChange: this.propertiesMap[key].sellInChange,
        qualityChange: this.propertiesMap[key].qualityChange,
      })))
    }
  }
  updateSellIn(conditions) {
    for (let item of this.items) {
      new item.itemHandler(conditions).updateSellIn(item, item.sellInChange);
    }
  }
  updateQuality(conditions) {
    new Validator().validateDuplicates(this.items, (item => item.name));
    for (let item of this.items) {
      new item.itemHandler(conditions).updateQuality(item, item.qualityChange);
    }
  }
  updateAll(conditions) {
    // must not change the order of execution
    this.updateSellIn(conditions);
    this.updateQuality(conditions);
    return this.items;
  }
}

class ItemHandler {
  constructor(conditions) {
    this.minQuality = 0;
    this.maxQuality = 50;
    this.minSellInDay = 0;
    this.conditions == [] ? [] : conditions;
  }

  updateSellIn(item, sellInChange) {
    item.sellIn += sellInChange;
  }

  // updateQuality may be overwritten by different combination of changeQuality method. 
  updateQuality(item, qualityChange) {
    this.changeQuality(item, qualityChange);
  }

  // changeQuality method acts like a building unit of updateQuality method.
  changeQuality(item, qualityChange) {
    item.quality += qualityChange;
  }

  // adjustQuality method adjust quality when quality goes beyond minQuality and maxQuality.
  adjustQuality(item) {
    if (item.quality <= this.minQuality) {
      // Maths related function - ask Poe (if eliminate if what can be done?)
      this.minimizeQuality(item);
    }
    // Maths related function - ask Poe (if eliminate if what can be done?)
    else if (item.quality >= this.maxQuality) {
      this.maximizeQuality(item);
    }
  }

  maximizeQuality(item) {
    item.quality = this.maxQuality;
  }

  minimizeQuality(item) {
    item.quality = this.minQuality;
  }
}

class LegendaryItemHandler extends ItemHandler {
  constructor(conditions) {
    super();
    this.maxQuality = 80;
    this.minQuality = 80;
    this.conditions = conditions;
  }

  // simplify this handler
  updateQuality(item, qualityChange) {
    this.changeQuality(item, qualityChange);
    this.adjustQuality(item);
  }
  adjustQuality(item) {
    this.maximizeQuality(item);
  }
}

class EpicItemHandler extends ItemHandler {
  constructor(conditions) {
    super();
  }
  updateQuality(item, qualityChange) {
    this.changeQuality(item, qualityChange);
    if (item.sellIn < this.minSellInDay) {
      this.changeQuality(item, qualityChange);
    }
    this.adjustQuality(item);
  }
}

class BackstagePassItemHandler extends ItemHandler {
  constructor(conditions) {
    super();
    this.conditions = conditions;
  }
  updateQuality(item, qualityChange) {
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


class NormalItemHandler extends ItemHandler {
  constructor(conditions) {
    super();
  }
  // changeQuality
  updateQuality(item, qualityChange) {
    this.changeQuality(item, qualityChange);
    if (item.sellIn < this.minSellInDay) {
      this.changeQuality(item, qualityChange);
    }
    this.adjustQuality(item);
  }
}

class ConjuredItemHandler extends NormalItemHandler {
  constructor(conditions) {
    super();
  }
}

class Validator {
  constructor() {

  }
  validateDuplicates(list, validateItem) {
    let validatedArr = (list).map(validateItem);
    var isDuplicate = validatedArr.some((item, idx) => validatedArr.indexOf(item) != idx);
    if (isDuplicate == true) {
      throw new Error(`${validateItem} has duplicate items, please check again!`);
    }
  }

  validateEmptyItems(items) {
    if (items.length <= 0) {
      throw new Error('The itemList is empty!');
    }
  }

  validateNonItemObjects(item) {
    if (!(item instanceof Item) == true) {
      throw new Error('The itemList has non-Item object!')
    }

  }
}

module.exports = {
  Item,
  Shop,
  Validator
}

