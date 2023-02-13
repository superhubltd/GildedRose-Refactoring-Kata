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
    this.minQuality = 0;
    this.maxQuality = 50;
    this.increasedQuality = 1;
    this.degradedQuality = 1;
    this.decreasedSellIn = 1;
    this.minDayLimit = 0;
    this.dayLimits = [10, 5, 0].sort((a, b) => b - a);
  }

  updateSellIn() {

    let sulfuras = 'Sulfuras, Hand of Ragnaros';
    let decreasedSellIn = this.decreasedSellIn;

    for (let item of this.items) {
      if (item.name == sulfuras){
        item.sellIn = item.sellIn;
      } else {
        item.sellIn -= decreasedSellIn;
      }
    }
    return this.items;
  }

  updateQuality() {
    let agedBrie = 'Aged Brie';
    let backStage = 'Backstage passes to a TAFKAL80ETC concert';
    let sulfuras = 'Sulfuras, Hand of Ragnaros';
    let legendaryItem = 'legendaryItem';
    let epicItem = 'epicItem';
    let backstagePassItem = 'backstagePassItem';
    let settings = [{name: sulfuras, type: legendaryItem}, {name: agedBrie, type: epicItem}, {name: backStage, type: backstagePassItem}];
    let legendaryItemList = settings.filter(item => item.type == legendaryItem)
    let epicItemList = settings.filter(item => item.type == epicItem)
    let backstagePassItemList = settings.filter(item => item.type == backstagePassItem)

    for(let item of this.items){
        if(legendaryItemList.every((i)=>i.name == item.name) == true){
          this.handleLegendaryItems(item);
        }
        else if(epicItemList.every((i)=>i.name == item.name) == true){
          this.handleEpicItems(item);
        }
        else if(backstagePassItemList.every((i)=>i.name == item.name) == true){
          this.handlebackstagePassItems(item);
        }
        else{
          this.handleConjuredItems(item);
        }
        this.checkQuality(item);
      }
      return this.items;
    }
    
    handleLegendaryItems(item){
      item.sellIn = item.sellIn;
      if(item.sellIn< this.minDayLimit){
        item.quality = this.minQuality;
      }else{
        item.quality = item.quality;
      }
    }
    
    handlebackstagePassItems(item){

      if(item.sellIn >= this.minDayLimit) item.quality += this.increasedQuality;
      if(item.sellIn >= this.minDayLimit && item.sellIn <= this.dayLimits[0]) item.quality += this.increasedQuality;
      if(item.sellIn >= this.minDayLimit && item.sellIn <= this.dayLimits[1]) item.quality += this.increasedQuality;
      if(item.sellIn < 0) item.quality = this.minQuality;
    }
    handleEpicItems(item){
      item.quality += this.increasedQuality; 
      if(item.sellIn < this.minDayLimit){
        item.quality += this.increasedQuality; 
      }
    }
    handleConjuredItems(item){
        item.quality -= this.degradedQuality;
        if(item.sellIn < 0){
          item.quality -= this.degradedQuality;
        } 
      }

    checkQuality(item){
      if(item.quality <= this.minQuality){
        item.quality = this.minQuality;
      }
      else if(item.quality>= this.maxQuality){
        item.quality = this.maxQuality;
      }
    }
}





module.exports = {
  Item,
  Shop
}
