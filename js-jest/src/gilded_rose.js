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
  }
  updateQuality() {
    let agedBrie = 'Aged Brie';
    let backStage = 'Backstage passes to a TAFKAL80ETC concert';
    let sulfuras = 'Sulfuras, Hand of Ragnaros';


    for (let item of this.items) {
      if (item.name != agedBrie && item.name != backStage) {
        if (item.quality > 0 && item.name != sulfuras) {
            item.quality = item.quality - 1;
        }
      } else {
        if (item.quality < 50) {
          item.quality = item.quality + 1;
          if (item.name == backStage) {
            if (item.sellIn < 11 && item.quality < 50) {
                item.quality = item.quality + 1;
            }
            if (item.sellIn < 6 && item.quality < 50) {
                item.quality = item.quality + 1;
            }
          }
        }
      }
      if (item.name != sulfuras) {
        item.sellIn = item.sellIn - 1;
      }
      if (item.sellIn < 0) {
        if (item.name != agedBrie) {
          if (item.name != backStage && item.name != sulfuras && item.quality > 0) {
              item.quality = item.quality - 1;
          } else {
              item.quality = item.quality - item.quality;
          }
        } else {
          if (item.quality < 50) {
            item.quality = item.quality + 1;
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
