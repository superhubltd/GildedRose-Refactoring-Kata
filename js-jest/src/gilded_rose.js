class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
    this.minQuality = 0;
    this.maxQuality = 50;
    this.increasedQuality = 1;
    this.decreasedQuality = 1;
    this.decreasedSellIn = 1;
    this.firstDayLimit = 11;
    this.secondDayLimit = 6;
    this.thirdDayLimit = 0;
  }

  updateQuality() {
    let agedBrie = 'Aged Brie';
    let backStage = 'Backstage passes to a TAFKAL80ETC concert';
    let sulfuras = 'Sulfuras, Hand of Ragnaros';
    let minQuality = this.minQuality;
    let maxQuality = this.maxQuality;
    let increasedQuality = this.increasedQuality;
    let decreasedQuality = this.decreasedQuality;
    let decreasedSellIn = this.decreasedSellIn;
    let firstDayLimit = this.firstDayLimit;
    let secondDayLimit = this.secondDayLimit;
    let thirdDayLimit = this.thirdDayLimit;
    
    // categorise these three items (by category to deal with)
    // extract method

    for (let item of this.items) {
      let name = item.name;
      let sellIn = item.sellIn;
      let quality = item.quality;

      if (name != agedBrie && name != backStage) {
        if (quality > minQuality && name != sulfuras) {
                item.quality -= decreasedQuality;
        }
      } else {
        if (quality < maxQuality) {
                item.quality += increasedQuality;
          if (name == backStage) {
            if (sellIn < firstDayLimit && quality < maxQuality) {
                item.quality += increasedQuality;
            }
            if (sellIn < secondDayLimit && quality < maxQuality) {
                item.quality += increasedQuality;
            }
            // how to minimise change cost of dayLimit(s)?
          }
        }
      }
      if (name != sulfuras) {
                item.sellIn -= decreasedSellIn;
      }
      if (sellIn < thirdDayLimit) 
      {
        if (name != agedBrie) {
          if (name != backStage && name != sulfuras && quality > minQuality) {
                item.quality -= decreasedQuality;
          } else {
                item.quality -= item.quality;
          }
        } else {
          if (quality < maxQuality) {
                item.quality += increasedQuality;
          }
        }
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop
}
