const {Shop, Item} = require("../src/gilded_rose");

describe("[Gilded Rose] 1. Condition: a. name not agedBrie, backStage, sulfuras b. quality > 0;  Output: quality-1", () =>{
  it.each([
    [new Item("Curious", 1, 20), 19],
    [new Item("Creature", 1, 20), 19],
    [new Item("Fantasy", 1, 20), 19]
  ])('Original item: %p expecting %p', (samples, result)=> {
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(result)
  });
});

describe("[Gilded Rose] 2. Condition: a. name not agedBrie, backStage b. quality < 50; Output: quality + 1",() =>{
  it.each([
    [new Item("Aged Brie", 12, 20), 21],
    [new Item("Aged Brie", 12, 30), 31],
    [new Item("Aged Brie", 12, 40), 41],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, 20), 21],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, 30), 31],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, 40), 41],
  ])('Original item: %p expecting %p', (samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  });
});

describe("[Gilded Rose] 3. Condition: a. name = backStage b. sellIn < 11 c. quality < 50; Output: quality + 1",()=>{
  it.each([
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 40), 42],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 30), 32],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20), 22],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 9, 20), 22],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 8, 20), 22],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 7, 20), 22],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 40), 42],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 30), 32],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 20), 22],
  ])('Original item: %p expecting %p', (samples, result)=>{
    const gildedRose = new Shop(
      [
          samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  });
});

describe("[Gilded Rose] 4. Condition: a. name = backStage b. sellIn < 6 c. quality < 50; Output: item's quality + 1", ()=>{
  it.each([
    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 10), 13],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20), 23],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 30), 33],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 40), 43],
  ])('Original item: %p expecting %p', (samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  });
});

describe("[Gilded Rose] 5a. Condition: a. name = sulfuras; Output: sellIn unchanged",()=>{
  it.each([
    [new Item("Sulfuras, Hand of Ragnaros", 10, 20), 10],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(result);
  })
});

describe("[Gilded Rose] 5b. Condition: a. name not sulfuras; Output: sellIn - 1",()=>{
  it.each([
    [new Item("Curious", 10, 20), 9],
    [new Item("Curious", 9, 20), 8],
    [new Item("Generous", 10, 20), 9],
    [new Item("Generous", 9, 20), 8],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(result);
  })
});

describe("[Gilded Rose] 6. Condition: a. name not AgedBrie, backStage, sulfuras b. sellIn < 0 c. quality > 0; Output: quality - 1", ()=>{
  it.each([
    [new Item("Curious", -1, 20), 18],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);

  })

});

describe("[Gilded Rose] 7. Condition: a. name not agedBrie, backStage b. sellIn < 0; Output: quality - quality", ()=>{
  it.each([
    [new Item("Curious", -1, 0), 0],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  })

});

describe("[Gilded Rose] 8. Condition: a. name agedBrie b. sellIn < 0 c. quality < 50 ; Output: quality + 1", ()=>{
  it.each([
    [new Item("Aged Brie", -1, 10), 12],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  })
});



