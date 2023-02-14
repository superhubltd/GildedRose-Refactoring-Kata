

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
    this.backStage = 'Backstage passes to a TAFKAL80ETC concert';
    this.sulfuras = 'Sulfuras, Hand of Ragnaros';
    this.legendaryItem = 'legendaryItem';
    this.epicItem = 'epicItem';
    this.backstagePassItem = 'backstagePassItem';
    this.settings = [{ name: this.sulfuras, type: this.legendaryItem }, { name: this.agedBrie, type: this.epicItem }, { name: this.backStage, type: this.backstagePassItem }];
    this.legendaryItemList = this.settings.filter(item => item.type == this.legendaryItem);
    this.epicItemList = this.settings.filter(item => item.type == this.epicItem);
    this.backstagePassItemList = this.settings.filter(item => item.type == this.backstagePassItem);
    this.minQuality = 0;
    this.maxQuality = 50;
    this.increasedQuality = 1;
    this.degradedQuality = 1;
    this.decreasedSellIn = 1;
    this.minDayLimit = 0;
    this.dayLimits = [10, 5, this.minDayLimit].sort((a, b) => b - a);
  }

  updateSellIn() {
    for (let item of this.items) {
      if (this.legendaryItemList.every((i) => i.name == item.name) == true) {
        new HandleLegendaryItems().updateSellIn(item);
      } else {
        new ItemHandler().updateSellIn(item);
      }
    }
    return this.items;
  }

  updateQuality() {
    for (let item of this.items) {
      if (this.legendaryItemList.every((i) => i.name == item.name) == true) {
        new HandleLegendaryItems().upgradeQuality(item);
      }
      else if (this.epicItemList.every((i) => i.name == item.name) == true) {
        new HandleEpicItems().upgradeQuality(item);
      }
      else if (this.backstagePassItemList.every((i) => i.name == item.name) == true) {
        new HandleBackstagePassItems().upgradeQuality(item);
      }
      else {
        new HandleConjuredItems().degradeQuality(item);
      }
    }
    return this.items;
  }
}

class ItemHandler extends Shop {
  constructor() {
    super();
  }
  updateSellIn(item) {
    item.sellIn -= this.decreasedSellIn;
  }
  increaseQuality(item) {
    item.quality += this.increasedQuality;
  }
  decreaseQuality(item) {
    item.quality -= this.increasedQuality;
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

class HandleLegendaryItems extends ItemHandler {
  constructor() {
    super();
    this.increasedQuality = 0;
    this.decreasedQuality = 0;
    this.maxQuality = 80;
    this.minQuality = 80;
  }
  updateSellIn(item) {
    item.sellIn = item.sellIn;
  }
  upgradeQuality(item) {
    this.increaseQuality(item);
    this.validateQuality(item);
  }
  degradeQuality(item) {
    this.decreaseQuality(item);
    this.validateQuality(item);
  }
  validateQuality(item) {
    item.quality = this.maxQuality;
  }
}

class HandleEpicItems extends ItemHandler {
  constructor() {
    super();
    this.decreasedQuality = 0;
  }
  upgradeQuality(item) {
    this.increaseQuality(item);
    if (item.sellIn < this.minDayLimit) {
      this.increaseQuality(item);
    }
    this.validateQuality(item);
  }
  degradeQuality(item) {
    this.decreaseQuality(item);
    this.validateQuality(item);
  }
}

class HandleBackstagePassItems extends ItemHandler {
  constructor() {
    super();
    this.decreasedQuality = 0;
  }
  upgradeQuality(item) {
    if (item.sellIn >= this.minDayLimit) this.increaseQuality(item);
    if (item.sellIn >= this.minDayLimit && item.sellIn <= this.dayLimits[0]) this.increaseQuality(item);
    if (item.sellIn >= this.minDayLimit && item.sellIn <= this.dayLimits[1]) this.increaseQuality(item);
    if (item.sellIn < this.minDayLimit) item.quality = this.minQuality;
    this.validateQuality(item);
  }
  degradeQuality(item) {
    this.decreaseQuality(item);
    this.validateQuality(item);
  }
}

class HandleConjuredItems extends ItemHandler {
  constructor() {
    super();
  }
  upgradeQuality(item) {
    this.increaseQuality(item);
    this.validateQuality(item);
  }
  degradeQuality(item) {
    this.decreaseQuality(item);
    if (item.sellIn < this.minDayLimit) {
      this.decreaseQuality(item);
    }
    this.validateQuality(item);
  }
}


module.exports = {
  Item,
  Shop
}

// updateSellIn(item) {
//   if (this.legendaryItemList.every((i) => i.name == item.name) == true) {
//     item.sellIn = item.sellIn;
//   } else {
//     item.sellIn -= this.decreasedSellIn;
// }
// return this.items;
// }

// handleLegendaryItems(item) {
//   item.sellIn = item.sellIn;
//   if (item.sellIn < this.minDayLimit) {
//     item.quality = this.minQuality;
//   } else {
//     item.quality = item.quality;
//   }
// }

// handleBackstagePassItems(item) {
//   if (item.sellIn >= this.minDayLimit) this.increaseQuality(item);
//   if (item.sellIn >= this.minDayLimit && item.sellIn <= this.dayLimits[0]) this.increaseQuality(item);
//   if (item.sellIn >= this.minDayLimit && item.sellIn <= this.dayLimits[1]) this.increaseQuality(item);
//   if (item.sellIn < this.minDayLimit) item.quality = this.minQuality;
// }

// handleEpicItems(item) {
//   this.increaseQuality(item);
//   if (item.sellIn < this.minDayLimit) {
//     this.increaseQuality(item);
//   }
// }

// handleConjuredItems(item) {
//   this.degradeQuality(item);
//   if (item.sellIn < this.minDayLimit) {
//     this.degradeQuality(item);
//   }
// }

// validateQuality(item) {
//   if (item.quality <= this.minQuality) {
//     item.quality = this.minQuality;
//   }
//   else if (item.quality >= this.maxQuality) {
//     item.quality = this.maxQuality;
//   }
// }

// increaseQuality(item) {
//   item.quality += this.increasedQuality;
// }

// degradeQuality(item) {
//   item.quality -= this.degradedQuality;
// }