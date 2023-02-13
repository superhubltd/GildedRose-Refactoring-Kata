const {Shop, Item} = require("../src/gilded_rose");

describe("[Gilded Rose] 1. Condition: a. name not agedBrie, backStage, sulfuras b. quality > 0;  Output: quality - 1", () =>{
  it.each([
    [new Item("Curious", 1, 1), 0],
    [new Item("Curious", 1, 2), 1],
    [new Item("Curious", 1, 49), 48],
    [new Item("Curious", 1, 50), 49],
    [new Item("Creature", 1, 20), 19],
    [new Item("Fantasy", 1, 20), 19],

  ])('Original item: %p expecting %p', (samples, result)=> {
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(result)
  });
});

describe("[Gilded Rose] 2.i Condition: a. name agedBrie, backStage b. quality < 50; Output: quality + 1",() =>{
  it.each([
    [new Item("Aged Brie", 12, -1), 0],
    [new Item("Aged Brie", 12, 0), 1],
    [new Item("Aged Brie", 12, 1), 2],
    [new Item("Aged Brie", 12, 2), 3],
    [new Item("Aged Brie", 12, 40), 41],
    [new Item("Aged Brie", 12, 48), 49],
    [new Item("Aged Brie", 12, 49), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, -1), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, 0), 1],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, 1), 2],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, 2), 3],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, 40), 41],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, 48), 49],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, 49), 50],
  ])('Original item: %p expecting %p', (samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  });
});

describe("[Gilded Rose] 2.ii Condition: a. name agedBrie, backStage b. quality < 50 c. negative quality; Output: quality + 1",() =>{
  it.each([
    [new Item("Aged Brie", 12, -1), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, -1), 0],
    [new Item("Aged Brie", 12, -2), -1],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, -2), -1],
  ])('Original item: %p expecting %p', (samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  });
});

describe("[Gilded Rose] 3. Condition: a. name = backStage b. 6 <= sellIn < 11 c. quality < 50; Output: quality + 2(expected: quality + 1)",()=>{
  it.each([
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49), 51],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 48), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 47), 49],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 2), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 1), 3],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0), 2],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 9, 49), 51],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 9, 48), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 9, 47), 49],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 9, 2), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 9, 1), 3],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 9, 0), 2],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 8, 49), 51],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 8, 48), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 8, 47), 49],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 8, 2), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 8, 1), 3],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 8, 0), 2],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 7, 49), 51],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 7, 48), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 7, 47), 49],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 7, 2), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 7, 1), 3],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 7, 0), 2],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 49), 51],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 48), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 47), 49],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 2), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 1), 3],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 0), 2],
  ])('Original item: %p expecting %p', (samples, result)=>{
    const gildedRose = new Shop(
      [
          samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  });
});

describe("[Gilded Rose] 4. Condition: a. name = backStage b. 0 <= sellIn < 6 c. quality < 50; Output: quality + 3(expected: quality + 1)", ()=>{
  it.each([
    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49), 52],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48), 51],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 47), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 2), 5],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 1), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0), 3],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 4, 49), 52],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 4, 48), 51],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 4, 47), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 4, 2), 5],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 4, 1), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 4, 0), 3],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 3, 49), 52],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 3, 48), 51],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 3, 47), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 3, 2), 5],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 3, 1), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 3, 0), 3],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 2, 49), 52],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 2, 48), 51],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 2, 47), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 2, 2), 5],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 2, 1), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 2, 0), 3],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49), 52],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 1, 48), 51],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 1, 47), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 1, 2), 5],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 1, 1), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 1, 0), 3],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 49), 52],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 48), 51],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 47), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 2), 5],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 1), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0), 3],


  ])('Original item: %p expecting %p', (samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  });
});

describe("[Gilded Rose] 5.i Condition: a. name = sulfuras; Output: sellIn unchanged",()=>{
  it.each([
    [new Item("Sulfuras, Hand of Ragnaros", 50, 50), 50],
    [new Item("Sulfuras, Hand of Ragnaros", 50, 49), 50],
    [new Item("Sulfuras, Hand of Ragnaros", 50, 2), 50],
    [new Item("Sulfuras, Hand of Ragnaros", 50, 1), 50],
    [new Item("Sulfuras, Hand of Ragnaros", 50, 0), 50],
    [new Item("Sulfuras, Hand of Ragnaros", 49, 50), 49],
    [new Item("Sulfuras, Hand of Ragnaros", 49, 49), 49],
    [new Item("Sulfuras, Hand of Ragnaros", 49, 2), 49],
    [new Item("Sulfuras, Hand of Ragnaros", 49, 1), 49],
    [new Item("Sulfuras, Hand of Ragnaros", 49, 0), 49],
    [new Item("Sulfuras, Hand of Ragnaros", 1, 50), 1],
    [new Item("Sulfuras, Hand of Ragnaros", 1, 49), 1],
    [new Item("Sulfuras, Hand of Ragnaros", 1, 2), 1],
    [new Item("Sulfuras, Hand of Ragnaros", 1, 1), 1],
    [new Item("Sulfuras, Hand of Ragnaros", 1, 0), 1],
    [new Item("Sulfuras, Hand of Ragnaros", 0, 50), 0],
    [new Item("Sulfuras, Hand of Ragnaros", 0, 49), 0],
    [new Item("Sulfuras, Hand of Ragnaros", 0, 2), 0],
    [new Item("Sulfuras, Hand of Ragnaros", 0, 1), 0],
    [new Item("Sulfuras, Hand of Ragnaros", 0, 0), 0],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(result);
  })
});

describe("[Gilded Rose] 5.ii Condition: a. name = sulfuras b. quality beyond 0-50; Output: sellIn unchanged",()=>{
  it.each([
    [new Item("Sulfuras, Hand of Ragnaros", 10, 52), 10],
    [new Item("Sulfuras, Hand of Ragnaros", 10, 51), 10],
    [new Item("Sulfuras, Hand of Ragnaros", 10, -1), 10],
    [new Item("Sulfuras, Hand of Ragnaros", 10, -2), 10],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toBe(result);
  })
});

describe("[Gilded Rose] 5.iii Condition: a. name not sulfuras; Output: sellIn - 1",()=>{
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

describe("[Gilded Rose] 6.i Condition: a. name not AgedBrie, backStage, sulfuras b. sellIn < 0 c. quality > 0; Output: quality - 2(expected: quality - 1)", ()=>{
  it.each([
    [new Item("Curious", -1, 50), 48],
    [new Item("Curious", -1, 49), 47],
    [new Item("Curious", -1, 2), 0],
    [new Item("Soulgem", -1, 50), 48],
    [new Item("Soulgem", -1, 49), 47],
    [new Item("Soulgem", -1, 2), 0],
    [new Item("Curious", -2, 50), 48],
    [new Item("Curious", -2, 49), 47],
    [new Item("Curious", -2, 2), 0],
    [new Item("Soulgem", -2, 50), 48],
    [new Item("Soulgem", -2, 49), 47],
    [new Item("Soulgem", -2, 2), 0],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 6.ii Condition: a. name not AgedBrie, backStage, sulfuras b. sellIn < 0 c. quality > 0 d. quality more than 50; Output: quality - 2(expected: quality - 1)", ()=>{
  it.each([
    [new Item("Curious", -1, 52), 50],
    [new Item("Curious", -1, 51), 49],
    [new Item("Generous", -1, 52), 50],
    [new Item("Generous", -1, 51), 49],
    [new Item("Curious", -2, 52), 50],
    [new Item("Curious", -2, 51), 49],
    [new Item("Generous", -2, 52), 50],
    [new Item("Generous", -2, 51), 49],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 6.iii Condition: a. name not AgedBrie, backStage, sulfuras b. sellIn < 0 c. quality > 0 d. quality more than 50; Output: quality - 2(expected: quality - 1)(Negative quality as result)", ()=>{
  it.each([
    [new Item("Curious", -1, 54), 52],
    [new Item("Curious", -1, 53), 51],
    [new Item("Curious", -2, 54), 52],
    [new Item("Curious", -2, 53), 51],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 6.iv Condition: a. name not AgedBrie, backStage, sulfuras b. sellIn < 0 c. quality < 0; Output: quality - 2(Negative quality as result)", ()=>{
  it.each([
    [new Item("Curious", -1, 1), -1],
    [new Item("Curious", -2, 1), -1],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 6.v Condition: a. name not AgedBrie, backStage, sulfuras b. sellIn < 0 c. quality < 0; Output: quality from 0 to 0", ()=>{
  it.each([
    [new Item("Curious", -1, 0), 0],
    [new Item("Curious", -2, 0), 0],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 7.i Condition: a. name not agedBrie but name is backStage, sulfuras b. sellIn < 0 c. quality > 0; Output: quality - quality", ()=>{
  it.each([
    [new Item("Sulfuras, Hand of Ragnaros", -1, 0), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -2, 0), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -3, 0), 0],
    [new Item("Sulfuras, Hand of Ragnaros", -1, 50), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -1, 50), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -2, 50), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -3, 50), 0],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  })

});

describe("[Gilded Rose] 7.ii Condition: a. name not agedBrie but name is backStage, sulfuras b. sellIn < 0 c. quality < 0; Output: quality - quality", ()=>{
  it.each([
    [new Item("Sulfuras, Hand of Ragnaros", -1, -1), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -1, -1), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -2, -1), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -3, -1), 0],
    [new Item("Sulfuras, Hand of Ragnaros", -1, -2), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -1, -2), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -2, -2), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -3, -2), 0],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  })

});

describe("[Gilded Rose] 8. Condition: a. name agedBrie b. sellIn < 0 c. quality < 50 ; Output: quality + 2(expected: quality + 1)", ()=>{
  it.each([
    [new Item("Aged Brie", -1, 49), 51],
    [new Item("Aged Brie", -1, 48), 50],
    [new Item("Aged Brie", -1, 47), 49],
    [new Item("Aged Brie", -1, 2), 4],
    [new Item("Aged Brie", -1, 1), 3],
    [new Item("Aged Brie", -1, 0), 2],
    [new Item("Aged Brie", -2, 49), 51],
    [new Item("Aged Brie", -2, 48), 50],
    [new Item("Aged Brie", -2, 47), 49],
    [new Item("Aged Brie", -2, 2), 4],
    [new Item("Aged Brie", -2, 1), 3],
    [new Item("Aged Brie", -2, 0), 2],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 9. Condition: a. name backStage b. sellIn < 0 c. quality < 50 ; Output: zero", ()=>{
  it.each([
    [new Item("Backstage passes to a TAFKAL80ETC concert", -1, 49), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -1, 48), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -1, 47), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -1, 2), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -1, 1), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0), 0],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toBe(result);
  })
});