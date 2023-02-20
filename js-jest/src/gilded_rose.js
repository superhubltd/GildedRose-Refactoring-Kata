class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  // Assume Items are all instances of Class Item
  constructor(items = []) {
    this.items = items;
    this.normalItem = 'NormalItem';
    this.itemHelper = new DynamicValidator({
      name: [
        new RequiredRule('Name is required'),
        new MaxLengthRule(100, `Item's name must be less than 100 alphanumeric number`),
        new MinLengthRule(1, `Please input the item's name`),
      ],
      sellIn: [
        new RequiredRule('SellIn is required'),
        new MaxValueRule(50, `Item's quality must be less than or equal to 50`),
        new MinValueRule(-5, `Item's sellIn must be more than or equal to -5`),
      ],
      quality: [
        new RequiredRule('Quality is required'),
        new MaxValueRule(80, `Item's quality must be less than or equal to 80`),
        new MinValueRule(0, `Item's quality must be more than or equal to 0`),
      ]
    })

    this.listHelper = new DynamicValidator([
      new NumberOfItemRule(0, 'The itemList cannot be empty'),
      new NotDuplicatesRule('There are item duplicates in the list'),

    ]
    )

    // rename itemsMap - ask Poe (need to be more self-descriptive)
    this.itemsMap = {
      'LegendaryItem': 'Sulfuras',
      'EpicItem': 'Aged',
      'BackstagePassItem': 'Backstage passes',
      'ConjuredItem': 'Conjured',
    }

    this.assignItemType();

    this.strategiesMap = {
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

  }


  assignItemType() {
    let error = this.items.filter(item => !this.itemHelper.validateItem(item))
                          .map(item=> `${JSON.stringify(item)} + ${this.itemHelper.errors}`)
    if(error.length !== 0){
      console.log('error',error)
      throw new Error(`Validation of item type failed: ${error}`)
    }
    this.items.map(item => {
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
    })
  }

  assignItemProperties() {
    // Assume all category keys can be found in handlerMap.
    const categorizedItems = this.items.reduce((categories, item) => {
      (categories[item.type] = categories[item.type] || []).push(item);
      return categories;
    }, {})

    for (const [key, value] of Object.entries(categorizedItems)) {
      value.map((item => Object.assign(item, {
        itemHandler: this.strategiesMap[key].itemHandler,
        sellInChange: this.strategiesMap[key].sellInChange,
        qualityChange: this.strategiesMap[key].qualityChange,
      })))
    }
  }
  updateSellIn(conditions) {
    this.items.map(item => {
      new item.itemHandler(conditions).updateSellIn(item, item.sellInChange);
    })
  }

  updateQuality(conditions) {
    if (this.listHelper.validateItemList(this.items, (item => item.name)) == false) {
      throw new Error(`Validation of list failed: ${this.listHelper.errors}`);
    }

    this.items.map(item => {
      new item.itemHandler(conditions).updateQuality(item, item.qualityChange);
    })
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
    item.quality <= this.minQuality ? this.minimizeQuality(item) :
      item.quality >= this.maxQuality ? this.maximizeQuality(item) :
        item.quality == item.quality;
  }
  maximizeQuality(item) {
    item.quality = Math.max(this.maxQuality);
  }
  minimizeQuality(item) {
    item.quality = Math.min(this.minQuality);
  }
}

class LegendaryItemHandler extends ItemHandler {
  constructor(conditions) {
    super();
    this.maxQuality = 80;
    this.minQuality = 80;
    this.conditions = conditions;
  }
  updateQuality(item, qualityChange) {
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
    this.listHelper = new DynamicValidator([
      new NotDuplicatesRule('Duplicates found in the conditions'),
    ]
    )

  }
  updateQuality(item, qualityChange) {
    if (this.listHelper.validateItemList(this.conditions, (item => item.day)) == false) {
      throw new Error(`BackstagePassItemHandler valiation failed: ${this.listHelper.errors}`);
    }

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


class DynamicValidator {
  constructor(rules) {
    this.rules = rules;
    this.errors = [];
  }
  validateItem(data) {
    let errors = [];
    for (let field in this.rules) {
      let fieldRules = this.rules[field];
      fieldRules.map(rule => {
        let errorMessage = rule.validate(data[field]);
        if (errorMessage) {
          this.errors.push(errorMessage);
        }
      })
    }
    return this.errors.length === 0;
  }

  validateItemList(data, checkFunction) {
    let errors = [];
    this.rules.map(rule => {
      let errorMessage = rule.validate(data, checkFunction);
      if (errorMessage) {
        errors.push(errorMessage);
      }
      this.errors = errors;
    })
    return this.errors.length === 0;
  };
}


// Item Rules
class MaxLengthRule {
  constructor(requiredLength, errorMessage) {
    this.requiredLength = requiredLength;
    this.errorMessage = errorMessage;
  }
  validate(item) {
    return item.length > this.requiredLength ? this.errorMessage : null;
  }
}

class MinLengthRule {
  constructor(requiredLength, errorMessage) {
    this.requiredLength = requiredLength;
    this.errorMessage = errorMessage;
  }
  validate(item) {
    return item.length < this.requiredLength ? this.errorMessage : null;
  }
}

class MaxValueRule {
  constructor(requiredValue, errorMessage) {
    this.requiredValue = requiredValue;
    this.errorMessage = errorMessage;

  }
  validate(item) {
    return item > this.requiredValue ? this.errorMessage : null;
  }
}

class MinValueRule {
  constructor(requiredValue, errorMessage) {
    this.requiredValue = requiredValue;
    this.errorMessage = errorMessage;
  }
  validate(item) {
    return item < this.requiredValue ? this.errorMessage : null;
  }
}

class RequiredRule {
  constructor(errorMessage) {
    this.errorMessage = errorMessage;
  }

  validate(value) {
    return value === undefined || value === null || value === ''
      ? this.errorMessage
      : null;
  }
}

// ItemList Rules
class NumberOfItemRule {
  constructor(requiredLength, errorMessage) {
    this.requiredLength = requiredLength;
    this.errorMessage = errorMessage;
  }
  validate(items, checkFunction) {
    return items.length <= this.requiredLength ? this.errorMessage : null;
  }
}

class NotDuplicatesRule {
  constructor(errorMessage) {
    this.errorMessage = errorMessage;
  }
  validate(items, checkFunction) {
    let validatedArr = (items).map(checkFunction);
    let isDuplicate = validatedArr.some((item, idx) => validatedArr.indexOf(item) != idx);
    return isDuplicate == true ? this.errorMessage : null;
  }
}


module.exports = {
  Item,
  Shop,
  DynamicValidator,
}

