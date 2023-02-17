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
    this.helper = new Validator();
    this.enhancedHelper = new DynamicValidator({
      name: [
        new RequiredRule('Name is required'),
        new MaxLengthRule(100, `Item's name must be less than 100 alphanumeric number.`),
      ],
      sellIn: [
        new RequiredRule('SellIn is required'),
        new minValueRule(5, `Item's sellIn must be more than or equal to 0.`)
      ],
      quality: [
        new RequiredRule('Quality is required'),
        new minValueRule(0, `Item's quality must be more than or equal to 0.`)
      ]
    })

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
    this.helper.validateEmptyItems(this.items);
    this.items.map(item => {
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
    for (let item of this.items) {
      new item.itemHandler(conditions).updateSellIn(item, item.sellInChange);
    }
  }
  updateQuality(conditions) {
    this.helper.validateDuplicates(this.items, (item => item.name));
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

// change to dynamic validator

// helper class
// must be 2 types of items
// item.name cannot be more than 100 characters
// sellIn cannot be less than 5;
// quality cannot be 0?

// item
class MaxLengthRule {
  constructor(maxLength, errorMessage) {
    this.maxLength = maxLength;
    this.errorMessage = errorMessage;
  }
  validate(item) {
    return item > maxLength ? this.errorMessage : null;
  }
}

// item
class minValueRule{
  constructor(minValue, errorMessage) {
    this.minValue = minValue;
    this.errorMessage = errorMessage;
  }
  validate(item) {
    return item.length > minValue ? this.errorMessage : null;
  }
}


// itemList
class NotEmptyRule {
  constructor(minLength, errorMessage) {
    this.minLength = minLength;
    this.errorMessage = errorMessage;
  }
  validate(items) {
    return items.length <= minLength ? this.errorMessage : null;
  }
}

// itemList
class NotDuplicatesRule {
  constructor() {
    this.errorMessage = errorMessage;
  }
  validate(items, checkFunction) {
    let validatedArr = (items).map(checkFunction);
    let isDuplicate = validatedArr.some((item, idx) => validatedArr.indexOf(item) != idx);
    return isDuplicate == true ? this.errorMessage : null;
  }
}

// item
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

// item
class NotNonItemRule {
  constructor() {
    this.errorMessage = errorMessage;
  }
  validate(item){
    !(item instanceof Item) == true? this.errorMessage: null;
  }
}

class DynamicValidator{
  constructor(rules){
    this.rules = rules;
  }
  validate(data) {
    let errors = {};
    for (let field in this.rules) {
      let fieldRules = this.rules[field];
      for (let rule of fieldRules) {
        let errorMessage = rule.validate(data[field]);
        if (errorMessage) {
          errors[field] = errorMessage;
          break;
        }
      }
    }
    this.errors = errors;
    return Object.keys(errors).length === 0;
  }
}


module.exports = {
  Item,
  Shop,
  Validator
}

