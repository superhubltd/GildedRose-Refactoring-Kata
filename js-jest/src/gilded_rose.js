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
      let name = item.name;
      let sellIn = item.sellIn;
      let quality = item.quality;

      if (name != agedBrie && name != backStage) {
        if (quality > 0 && name != sulfuras) {
            item.quality = item.quality - 1;
        }
      } else {
        if (quality < 50) {
          item.quality = item.quality + 1;
          if (name == backStage) {
            if (sellIn < 11 && quality < 50) {
                item.quality = item.quality + 1;
            }
            if (sellIn < 6 && quality < 50) {
                item.quality = item.quality + 1;
            }
          }
        }
      }
      if (name != sulfuras) {
        item.sellIn = item.sellIn - 1;
      }
      if (sellIn < 0) {
        if (name != agedBrie) {
          if (name != backStage && name != sulfuras && quality > 0) {
              item.quality = item.quality - 1;
          } else {
              item.quality = item.quality - item.quality;
          }
        } else {
          if (quality < 50) {
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
