const {
  Item,
  Shop,
  DynamicValidator,
  LengthRule,
  ValueRule,
  RequiredRule,
  NumberOfItemRule,
  NotDuplicatesRule,
} = require("../src/gilded_rose");

const conditions = [
  { day: 100, qualityChange: 1 },
  { day: 10, qualityChange: 1 },
  { day: 5, qualityChange: 1 }
]

const duplicateconditions = [
  { day: 100, qualityChange: 1 },
  { day: 10, qualityChange: 1 },
  { day: 10, qualityChange: 1 },
  { day: 5, qualityChange: 1 }
]
describe("[Gilded Rose] 1. Condition: a. name not agedBrie, backStage, sulfuras b. quality > 0;  Output: quality - 1", () =>{
  it.each([
    [new Item("curious", 1, 1), 0],
    [new Item("curious", 1, 2), 1],
    [new Item("curious", 1, 49), 48],
    [new Item("curious", 1, 50), 49],
    [new Item("Creature", 1, 20), 19],
    [new Item("Fantasy", 1, 20), 19],

  ])('Original item: %p expecting %p', (samples, result)=> {
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
    expect(items[0].quality).toBe(result)
  });
});

describe("[Gilded Rose] 2.i Condition: a. name agedBrie, backStage b. quality < 50; Output: quality + 1",() =>{
  it.each([
    [new Item("Aged Brie", 12, 0), 1],
    [new Item("Aged Brie", 12, 1), 2],
    [new Item("Aged Brie", 12, 2), 3],
    [new Item("Aged Brie", 12, 40), 41],
    [new Item("Aged Brie", 12, 48), 49],
    [new Item("Aged Brie", 12, 49), 50],,
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
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  });
});

describe("[Gilded Rose] 2.ii Condition: a. name agedBrie, backStage b. quality < 50 c. negative quality; Output: quality + 1 (AFTER AMENDMENT: throw error MinValueRule (quality))",() =>{
  it.each([
    [new Item("Aged Brie", 12, -1), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, -1), 0],
    [new Item("Aged Brie", 12, -2), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, -2), 0],
  ])('Original item: %p expecting %p', (samples, result)=>{
    try{
      const gildedRose = new Shop(
        [
          samples,
        ])
        const items = gildedRose.updateAll(conditions);
        expect(items[0].quality).toBe(result);
    }catch(err){
      expect(err.message).toContain(`Item's quality must be between 0 to 80`);
    }
    
  });
});

describe("[Gilded Rose] 3.i Condition: a. name = backStage b. sellIn < 12 c. quality < 50; Output: quality + 2(expected: quality + 1)",()=>{
  it.each([
    [new Item("Backstage passes to a TAFKAL80ETC concert", 13, 48), 49],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 13, 47), 48],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 13, 2), 3],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 13, 1), 2],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 13, 0), 1],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, 48), 49],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, 47), 48],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, 2), 3],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, 1), 2],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 12, 0), 1],

  ])('Original item: %p expecting %p', (samples, result)=>{
    const gildedRose = new Shop(
      [
          samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  });
});

describe("[Gilded Rose] 3.i Condition: a. name = backStage b. 6 < sellIn <= 11 c. quality < 50; Output: quality + 2(expected: quality + 1)",()=>{
  it.each([
    [new Item("Backstage passes to a TAFKAL80ETC concert", 11, 48), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 11, 47), 49],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 11, 2), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 11, 1), 3],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 11, 0), 2],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 48), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 47), 49],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 2), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 1), 3],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0), 2],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 9, 48), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 9, 47), 49],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 9, 2), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 9, 1), 3],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 9, 0), 2],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 8, 48), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 8, 47), 49],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 8, 2), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 8, 1), 3],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 8, 0), 2],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 7, 48), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 7, 47), 49],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 7, 2), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 7, 1), 3],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 7, 0), 2],


  ])('Original item: %p expecting %p', (samples, result)=>{
    const gildedRose = new Shop(
      [
          samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  });
});

describe("[Gilded Rose] 3.ii Condition: a. name = backStage b. 6 < sellIn <= 11 c. quality < 50; Output: quality + 2(quality more than 50)(AFTER AMENDMENT: quality = 50)",()=>{
  it.each([
    [new Item("Backstage passes to a TAFKAL80ETC concert", 11, 49), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 9, 49), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 8, 49), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 7, 49), 50],
  ])('Original item: %p expecting %p', (samples, result)=>{
    const gildedRose = new Shop(
      [
          samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  });
});

describe("[Gilded Rose] 4.i Condition: a. name = backStage b. 0 <= sellIn <= 6 c. quality < 50; Output: quality + 3(expected: quality + 1)", ()=>{
  it.each([

    [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 47), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 2), 5],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 1), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 0), 3],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 47), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 2), 5],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 1), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 0), 3],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 4, 47), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 4, 2), 5],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 4, 1), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 4, 0), 3],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 3, 47), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 3, 2), 5],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 3, 1), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 3, 0), 3],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 2, 47), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 2, 2), 5],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 2, 1), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 2, 0), 3],

    [new Item("Backstage passes to a TAFKAL80ETC concert", 1, 47), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 1, 2), 5],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 1, 1), 4],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 1, 0), 3],




  ])('Original item: %p expecting %p', (samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  });
});

describe("[Gilded Rose] 4.ii Condition: a. name = backStage b. 0 < sellIn < 6 c. quality < 50; Output: quality + 3(quality more than 50)(AFTER AMENDMENT: quality = 50)", ()=>{
  it.each([
    [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 49), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 6, 48), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 4, 49), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 4, 48), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 3, 49), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 3, 48), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 2, 49), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 2, 48), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 1, 49), 50],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 1, 48), 50],

  ])('Original item: %p expecting %p', (samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
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
      const items = gildedRose.updateAll(conditions);
      expect(items[0].sellIn).toBe(result);
  })
});

describe("[Gilded Rose] 5.ii Condition: a. name = sulfuras b. quality beyond 0-50; Output: sellIn unchanged",()=>{
  it.each([
    [new Item("Sulfuras, Hand of Ragnaros", 10, 52), 10],
    [new Item("Sulfuras, Hand of Ragnaros", 10, 51), 10],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].sellIn).toBe(result);
  })
});


describe("[Gilded Rose] 5.ii Condition: a. name = sulfuras b. quality beyond 0-50; Output: sellIn unchanged (AFTER AMENDMENT: MinValueRule(quality))",()=>{
  it.each([
    [new Item("Sulfuras, Hand of Ragnaros", 10, -1), `Item's quality must be between 0 to 80`],
    [new Item("Sulfuras, Hand of Ragnaros", 10, -2), `Item's quality must be between 0 to 80`],
  ])('Original item: %p expecting %p',(samples, result)=>{
    try{
      const gildedRose = new Shop(
        [
          samples,
        ])
        const items = gildedRose.updateAll(conditions);
        expect(items[0].sellIn).toBe(0);
    }catch(err){
        expect(err.message).toContain(result);
    }
    
  })
});

describe("[Gilded Rose] 5.iii Condition: a. name not sulfuras; Output: sellIn - 1",()=>{
  it.each([
    [new Item("curious", 10, 20), 9],
    [new Item("curious", 9, 20), 8],
    [new Item("Generous", 10, 20), 9],
    [new Item("Generous", 9, 20), 8],
    [new Item("Aged Brie", 10, 20), 9],
    [new Item("Aged Brie", 9, 20), 8],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20), 9],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 9, 20), 8],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].sellIn).toBe(result); 
  })
});

describe("[Gilded Rose] 6.i Condition: a. name not AgedBrie, backStage, sulfuras b. sellIn < 0 c. quality > 0; Output: quality - 2(expected: quality - 1)", ()=>{
  it.each([
    [new Item("curious", 0, 50), 48],
    [new Item("curious", 0, 49), 47],
    [new Item("curious", 0, 2), 0],
    [new Item("curious", 0, 1), 0],
    [new Item("curious", 0, 0), 0],
    [new Item("curious", -1, 50), 48],
    [new Item("curious", -1, 49), 47],
    [new Item("curious", -1, 2), 0],
    [new Item("Soulgem", -1, 50), 48],
    [new Item("Soulgem", -1, 49), 47],
    [new Item("Soulgem", -1, 2), 0],
    [new Item("curious", -2, 50), 48],
    [new Item("curious", -2, 49), 47],
    [new Item("curious", -2, 2), 0],
    [new Item("Soulgem", -2, 50), 48],
    [new Item("Soulgem", -2, 49), 47],
    [new Item("Soulgem", -2, 2), 0],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      let items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 6.ii Condition: a. name not AgedBrie, backStage, sulfuras b. sellIn < 0 c. quality > 0 d. quality more than 50; Output: quality - 2(expected: quality - 1)", ()=>{
  it.each([
    [new Item("curious", -1, 52), 50],
    [new Item("curious", -1, 51), 49],
    [new Item("Generous", -1, 52), 50],
    [new Item("Generous", -1, 51), 49],
    [new Item("curious", -2, 52), 50],
    [new Item("curious", -2, 51), 49],
    [new Item("Generous", -2, 52), 50],
    [new Item("Generous", -2, 51), 49],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 6.iii Condition: a. name not AgedBrie, backStage, sulfuras b. sellIn < 0 c. quality > 0 d. quality more than 50; Output: quality - 2(Quality more than 50)(AFTER AMENDMENT: quality = 50)", ()=>{
  it.each([
    [new Item("curious", -1, 54), 50],
    [new Item("curious", -1, 53), 50],
    [new Item("curious", -2, 54), 50],
    [new Item("curious", -2, 53), 50],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 6.iv Condition: a. name not AgedBrie, backStage, sulfuras b. sellIn <= 0 c. quality < 0; Output: quality - 2(Negative quality as result) (AFTER AMENDMENT: quality = zero)", ()=>{
  it.each([
    [new Item("curious", 0, 1), 0],
    [new Item("curious", -1, 1), 0],
    [new Item("curious", -2, 1), 0],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 6.v Condition: a. name not AgedBrie, backStage, sulfuras b. sellIn <= 0 c. quality < 0; Output: quality = 0", ()=>{
  it.each([
    [new Item("curious", -1, 0), 0],
    [new Item("curious", -2, 0), 0],

  ])('Original item: %p expecting %p',(samples, result)=>{

      const gildedRose = new Shop(
        [
          samples,
        ])
        const items = gildedRose.updateAll(conditions);
        expect(items[0].quality).toBe(result);

  })
});

describe("[Gilded Rose] 6.vi Condition: a. name not AgedBrie, backStage, sulfuras b. sellIn <= 0 c. quality < 0; Output: quality = 0 (AFTER AMENDMENT: throw error MinValueRule (quality))", ()=>{
  it.each([
    [new Item("curious", -1, -1), 0],
    [new Item("curious", -2, -1), 0],

  ])('Original item: %p expecting %p',(samples, result)=>{
    try{
      const gildedRose = new Shop(
        [
          samples,
        ])
        const items = gildedRose.updateAll(conditions);
        expect(items[0].quality).toBe(result);
    }catch(err){
        expect(err.message).toContain(`Item's quality must be between 0 to 80`)
    }
    
  })
});

describe("[Gilded Rose] 7.i Condition: a. name not agedBrie but name is backStage, sulfuras b. sellIn <= 0 c. quality > 0; Output: quality - quality", ()=>{
  it.each([
    [new Item("Sulfuras, Hand of Ragnaros", -1, 50), 80],
    [new Item("Sulfuras, Hand of Ragnaros", -1, 0), 80],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 47), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 2), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 1), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -1, 50), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -2, 50), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -2, 0), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -3, 50), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -3, 0), 0],

  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })

});

describe("[Gilded Rose] 7.ii Condition: a. name not agedBrie but name is backStage, sulfuras b. sellIn <= 0 c. quality < 0; Output: quality - quality (AFTER AMENDMENT: throw error MinValueRule (quality))", ()=>{
  it.each([
    [new Item("Sulfuras, Hand of Ragnaros", -1, -1), 80],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, -1), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -1, -1), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -2, -1), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -3, -1), 0],
    [new Item("Sulfuras, Hand of Ragnaros", -1, -2), 80],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, -2), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -1, -2), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -2, -2), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", -3, -2), 0],
  ])('Original item: %p expecting %p',(samples, result)=>{
    try{
      const gildedRose = new Shop(
        [
          samples,
        ])
        const items = gildedRose.updateAll(conditions);
        expect(items[0].quality).toBe(result);
    }catch(err){
      expect(err.message).toContain(`Item's quality must be between 0 to 80`);
    }
    
  })

});

describe("[Gilded Rose] 8.i Condition: a. name agedBrie b. sellIn <= 0 c. quality < 50 ; Output: quality + 2(expected: quality + 1)", ()=>{
  it.each([
    [new Item("Aged Brie", 0, 48), 50],
    [new Item("Aged Brie", 0, 47), 49],
    [new Item("Aged Brie", 0, 2), 4],
    [new Item("Aged Brie", 0, 1), 3],
    [new Item("Aged Brie", 0, 0), 2],

    [new Item("Aged Brie", -1, 48), 50],
    [new Item("Aged Brie", -1, 47), 49],
    [new Item("Aged Brie", -1, 2), 4],
    [new Item("Aged Brie", -1, 1), 3],
    [new Item("Aged Brie", -1, 0), 2],

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
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 8.ii Condition: a. name agedBrie b. sellIn <= 0 c. quality < 50 ; Output: quality + 2(quality more than 50)(AFTER AMENDMENT: quality = 50)", ()=>{
  it.each([
    [new Item("Aged Brie", 0, 49), 50],
    [new Item("Aged Brie", -1, 49), 50],
    [new Item("Aged Brie", -2, 49), 50],

  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 8.iii Condition: a. name agedBrie b. 0 < sellIn <= 6  c. quality < 50 ; Output: quality + 1", ()=>{
  it.each([
    [new Item("Aged Brie", 1, 49), 50],
    [new Item("Aged Brie", 1, 48), 49],
    [new Item("Aged Brie", 1, 47), 48],
    [new Item("Aged Brie", 1, 2), 3],
    [new Item("Aged Brie", 1, 1), 2],
    [new Item("Aged Brie", 1, 0), 1],

    [new Item("Aged Brie", 5, 49), 50],
    [new Item("Aged Brie", 5, 48), 49],
    [new Item("Aged Brie", 5, 47), 48],
    [new Item("Aged Brie", 5, 2), 3],
    [new Item("Aged Brie", 5, 1), 2],
    [new Item("Aged Brie", 5, 0), 1],

    [new Item("Aged Brie", 6, 49), 50],
    [new Item("Aged Brie", 6, 48), 49],
    [new Item("Aged Brie", 6, 47), 48],
    [new Item("Aged Brie", 6, 2), 3],
    [new Item("Aged Brie", 6, 1), 2],
    [new Item("Aged Brie", 6, 0), 1],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 8.iv Condition: a. name agedBrie b. 6 < sellIn <= 11 c. quality < 50 ; Output: quality + 1", ()=>{
  it.each([
    [new Item("Aged Brie", 7, 49), 50],
    [new Item("Aged Brie", 7, 48), 49],
    [new Item("Aged Brie", 7, 47), 48],
    [new Item("Aged Brie", 7, 2), 3],
    [new Item("Aged Brie", 7, 1), 2],
    [new Item("Aged Brie", 7, 0), 1],

    [new Item("Aged Brie", 9, 49), 50],
    [new Item("Aged Brie", 9, 48), 49],
    [new Item("Aged Brie", 9, 47), 48],
    [new Item("Aged Brie", 9, 2), 3],
    [new Item("Aged Brie", 9, 1), 2],
    [new Item("Aged Brie", 9, 0), 1],

    [new Item("Aged Brie", 10, 49), 50],
    [new Item("Aged Brie", 10, 48), 49],
    [new Item("Aged Brie", 10, 47), 48],
    [new Item("Aged Brie", 10, 2), 3],
    [new Item("Aged Brie", 10, 1), 2],
    [new Item("Aged Brie", 10, 0), 1],

    [new Item("Aged Brie", 11, 49), 50],
    [new Item("Aged Brie", 11, 48), 49],
    [new Item("Aged Brie", 11, 47), 48],
    [new Item("Aged Brie", 11, 2), 3],
    [new Item("Aged Brie", 11, 1), 2],
    [new Item("Aged Brie", 11, 0), 1],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 8.v Condition: a. name not agedBrie b. 6 < sellIn <= 11 c. quality < 50 ; Output: quality - 1", ()=>{
  it.each([
    [new Item("curious", 7, 49), 48],
    [new Item("curious", 7, 48), 47],
    [new Item("curious", 7, 47), 46],
    [new Item("curious", 7, 2), 1],
    [new Item("curious", 7, 1), 0],
    [new Item("curious", 7, 0), 0],

    [new Item("curious", 10, 49), 48],
    [new Item("curious", 10, 48), 47],
    [new Item("curious", 10, 47), 46],
    [new Item("curious", 10, 2), 1],
    [new Item("curious", 10, 1), 0],
    [new Item("curious", 10, 0), 0],

    [new Item("curious", 11, 49), 48],
    [new Item("curious", 11, 48), 47],
    [new Item("curious", 11, 47), 46],
    [new Item("curious", 11, 2), 1],
    [new Item("curious", 11, 1), 0],
    [new Item("curious", 11, 0), 0],
  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 8.vi Condition: a. name not agedBrie b. 0 < sellIn <= 6 c. quality < 50 ; Output: quality - 1", ()=>{
  it.each([

    [new Item("curious", 6, 49), 48],
    [new Item("curious", 6, 48), 47],
    [new Item("curious", 6, 47), 46],
    [new Item("curious", 6, 2), 1],
    [new Item("curious", 6, 1), 0],
    [new Item("curious", 6, 0), 0],

    [new Item("curious", 5, 49), 48],
    [new Item("curious", 5, 48), 47],
    [new Item("curious", 5, 47), 46],
    [new Item("curious", 5, 2), 1],
    [new Item("curious", 5, 1), 0],
    [new Item("curious", 5, 0), 0],

    [new Item("curious", 1, 49), 48],
    [new Item("curious", 1, 48), 47],
    [new Item("curious", 1, 47), 46],
    [new Item("curious", 1, 2), 1],
    [new Item("curious", 1, 1), 0],
    [new Item("curious", 1, 0), 0],


  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 9. Condition: a. name backStage b. sellIn <= 0 c. quality < 50 ; Output: quality = zero", ()=>{
  it.each([
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 49), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 48), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 47), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 2), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 1), 0],
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 0), 0],
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
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 10.i Condition: a. name sulfaras b. sellIn > 0 c. quality < 50 ; Output: quality = quality", ()=>{
  it.each([
    [new Item("Sulfuras, Hand of Ragnaros", 50, 49), 80],
    [new Item("Sulfuras, Hand of Ragnaros", 49, 49), 80],
    [new Item("Sulfuras, Hand of Ragnaros", 2, 49), 80],
    [new Item("Sulfuras, Hand of Ragnaros", 1, 49), 80],

  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 10.ii Condition: a. name sulfaras b. sellIn <= 0 c. quality < 50 ; Output: quality = zero", ()=>{
  it.each([
    [new Item("Sulfuras, Hand of Ragnaros", 0, 49), 80],
    [new Item("Sulfuras, Hand of Ragnaros", -1, 49), 80],
    [new Item("Sulfuras, Hand of Ragnaros", -2, 49), 80],

  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 11.i Condition: a. name conjured b. sellIn > 0 c. quality < 50 ; Output: quality = zero", ()=>{
  it.each([
    [new Item("Conjured", 1, 2), 0],
    [new Item("Conjured", 1, 1), 0],
    [new Item("Conjured", 1, 0), 0],
    [new Item("Conjured", 2, 2), 0],
    [new Item("Conjured", 2, 1), 0],
    [new Item("Conjured", 2, 0), 0],

  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 11.ii Condition: a. name conjured b. sellIn <= 0 c. quality < 50 ; Output: quality = zero", ()=>{
  it.each([
    [new Item("Conjured", -1, 3), 0],
    [new Item("Conjured", -1, 2), 0],
    [new Item("Conjured", -1, 1), 0],
    [new Item("Conjured", -1, 0), 0],
    [new Item("Conjured", -2, 3), 0],
    [new Item("Conjured", -2, 2), 0],
    [new Item("Conjured", -2, 1), 0],
    [new Item("Conjured", -2, 0), 0],

  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 11.iii Condition: a. name conjured b. sellIn > 0 c. quality < 50 ; Output: quality -2", ()=>{
  it.each([

    [new Item("Conjured", 1, 50), 48],
    [new Item("Conjured", 1, 49), 47],
    [new Item("Conjured", 1, 48), 46],
    [new Item("Conjured", 1, 3), 1],
    [new Item("Conjured", 1, 2), 0],
    [new Item("Conjured", 2, 50), 48],
    [new Item("Conjured", 2, 49), 47],
    [new Item("Conjured", 2, 48), 46],
    [new Item("Conjured", 2, 3), 1],
    [new Item("Conjured", 2, 2), 0],

  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 11.iv Condition: a. name conjured b. sellIn <= 0 c. quality < 50 ; Output: quality -4", ()=>{
  it.each([
    [new Item("Conjured", 0, 50), 46],
    [new Item("Conjured", 0, 49), 45],
    [new Item("Conjured", 0, 48), 44],
    [new Item("Conjured", 0, 5), 1],
    [new Item("Conjured", 0, 4), 0],

    [new Item("Conjured", -1, 50), 46],
    [new Item("Conjured", -1, 49), 45],
    [new Item("Conjured", -1, 48), 44],
    [new Item("Conjured", -1, 5), 1],
    [new Item("Conjured", -1, 4), 0],   

    [new Item("Conjured", -2, 50), 46],
    [new Item("Conjured", -2, 49), 45],
    [new Item("Conjured", -2, 48), 44],
    [new Item("Conjured", -2, 5), 1],
    [new Item("Conjured", -2, 4), 0],   

  ])('Original item: %p expecting %p',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      const items = gildedRose.updateAll(conditions);
      expect(items[0].quality).toBe(result);
  })
});

describe("[Gilded Rose] 12.i Condition: a. validator b. conditions list - no duplicate items; Output: do not throw error", ()=>{
  it.each([
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 49), 0], 

  ])('Original item: %p expecting not throw error',(samples, result)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      try{
        const items = gildedRose.updateAll(conditions);
        expect(items[0].quality).toBe(result);
      }catch(err){
        console.log(err)
      } 
  })
});

describe("[Gilded Rose] 12.ii Condition: a. validator b. conditions list - duplicate items; Output: throw error", ()=>{
  it.each([
    [new Item("Backstage passes to a TAFKAL80ETC concert", 0, 49)], 

  ])('Original item: %p expecting throw error',(samples)=>{
    const gildedRose = new Shop(
      [
        samples,
      ])
      try{
        const err = gildedRose.updateAll(duplicateconditions);
        expect(items[0].quality).toBe(null);
      }catch(err){
        expect(err.message).toContain('BackstagePassItemHandler valiation failed');
      } 
  })
});


describe("[Gilded Rose] 12.iii Condition: a. validator b. items list - do not have duplicate items; Output: do not throw error", ()=>{
  it.each([
    [
      [
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 49),
        new Item("Conjured", 1, 50),
      ]
    ], 
  ])('Original item: %p expecting not throw error',(samples)=>{
    const gildedRose = new Shop(
        samples,
      )
        const items = gildedRose.updateAll(conditions);
        expect(items[0].quality).toBe(0);
      
      
  })
});


describe("[Gilded Rose] 12.iv Condition: a. validator b. items list - duplicate items; Output: throw error", ()=>{
  it.each([
    [
      [
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 49),
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 49),
        new Item("Conjured", 1, 50),
      ]
    ], 

  ])('Original item: %p expecting throw error',(samples)=>{
    const gildedRose = new Shop(
        samples,
      )
      try{
        const items = gildedRose.updateAll(conditions);
        expect(items[0].quality).toBe(null);
      }catch(err){
        expect(err.message).toContain('Validation of list failed');
        expect(err.message).toContain('There are item duplicates in the list');
      }
      
      
  })
});

describe("[Gilded Rose] 13. Condition: a. validator b. items list - empty list; Output: throw error", ()=>{
  it.each([
    [
      []
    ], 

  ])('Original item: %p expecting throw error',(samples)=>{
      try{
        const gildedRose = new Shop(
          samples,
        )
        const items = gildedRose.updateAll(conditions);
        expect(items).toBe(null);
      }catch(err){
        expect(err.message).toContain('Validation of list failed');
        expect(err.message).toContain('The itemList cannot be empty');
      }
  })
});

describe("[Gilded Rose] 14.i. Condition: a. validator b. items list - empty string; Output: throw error", ()=>{
  it.each([
    [
      [
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 49),
        new Item("", 0, 49),
        new Item("Conjured", 1, 50),
      ], 'Name is required'
    ], 
    [
      [
        new Item("Backstage passes to a TAFKAL80ETC concert", 0, 49),
        new Item("111111111100000000001111111111000000000011111111110000000000111111111100000000001111111111000000000011111111110000000000", 0, 49),
        new Item("Conjured", 1, 50),
      ], `Item's name must be between 1 and 100 alphanumeric number`
    ], 

  ])('Original item: %p expecting throw error: %p',(samples, result)=>{

    try{
        const gildedRose = new Shop(
        samples,
        )
        const items = gildedRose.updateAll(conditions);
        expect(gildedRose).toBe(null);
      }catch(err){
        expect(err.message).toContain('Validation of item type failed');
        expect(err.message).toContain(result);
      }
  })
});

describe("[Gilded Rose] 14.ii. Condition: a. validator b. items list - sellIn is invalid; Output: throw error", ()=>{
  it.each([
    [
      [
        new Item('aged Brie', 0, 49),
        new Item("Curious", null , 49),
        new Item("xyz", 0, 10),
      ], 'SellIn is required'
    ], 
    [
      [
        new Item('aged Brie', 0, 49),
        new Item("Curious", undefined , 49),
        new Item("xyz", 0, 10),
      ], 'SellIn is required'
    ], 
    [
      [
        new Item('aged Brie', 0, 49),
        new Item("Curious", 51 , 49),
        new Item("xyz", 0, 10),
      ], `Item's sellIn must be between -5 and 50`
    ], 
    [
      [
        new Item('aged Brie', -6, 49),
        new Item("Curious", 30 , 49),
        new Item("xyz", 0, 10),
      ], `Item's sellIn must be between -5 and 50`
    ], 
  ])('Original item: %p expecting throw error: %p',(samples, result)=>{

    try{
        const gildedRose = new Shop(
        samples,
        )
        const items = gildedRose.updateAll(conditions);
        expect(gildedRose).toBe(null);
      }catch(err){
        expect(err.message).toContain('Validation of item type failed');
        expect(err.message).toContain(result);
        // error list
        // count errors item in the list

      }
  })
});

describe("[Gilded Rose] 14.iii. Condition: a. validator b. items list - Quality is invalid; Output: throw error", ()=>{
  it.each([
    [
      [
        new Item('aged Brie', 0, 49),
        new Item("Curious", 0 , 49),
        new Item("xyz", 0, null),
      ], 'Quality is required'
    ], 
    [
      [
        new Item('aged Brie', 0, 49),
        new Item("Curious", 0 , 49),
        new Item("xyz", 0, undefined),
      ], 'Quality is required'
    ], 
    [
      [
        new Item('aged Brie', 0, 49),
        new Item("Curious", 0 , 100),
        new Item("xyz", 0, 49),
      ], `Item's quality must be between 0 to 80`
    ], 
    [
      [
        new Item('aged Brie', 0, 49),
        new Item("Curious", 0 , -1),
        new Item("xyz", 0, 49),
      ],  `Item's quality must be between 0 to 80`
    ], 

  ])('Original item: %p expecting throw error: %p',(samples, result)=>{

    try{
        const gildedRose = new Shop(
        samples,
        )
        const items = gildedRose.updateAll(conditions);
        expect(gildedRose).toBe(null);
      }catch(err){
        expect(err.message).toContain('Validation of item type failed');
        expect(err.message).toContain(result);
      }
  })
});

describe("[Gilded Rose] 15. Condition: a. validator b. name, sellIn, quality in the same item are invalid ; Output: throw error (two error messages)", ()=>{
  it.each([
    [
      [
        new Item("", null, null),
      ], 
    ], 

  ])('Original item: %p expecting throw name, sellIn and quality error',(samples)=>{

    try{
        const gildedRose = new Shop(
        samples,
        )
        const items = gildedRose.updateAll(conditions);
        expect(gildedRose).toBe(null);
      }catch(err){
        expect(err.message).toContain('Validation of item type failed');
        expect(err.message).toContain('Name is required');
        expect(err.message).toContain('SellIn is required');
        expect(err.message).toContain('Quality is required');
      }
  })
});

describe("[Gilded Rose] 16. Condition: a. validator b. two fields in different items are invalid ; Output: throw error (two error messages)", ()=>{
  it.each([
    [
      [
        new Item("", 50, 50),
        new Item("", null, 50),
        new Item("abc", 50, 50),
      ], 
    ], 

  ])('Original item: %p expecting throw name, sellIn and quality error',(samples)=>{

    try{
        const gildedRose = new Shop(
        samples,
        )
        const items = gildedRose.updateAll(conditions);
        expect(gildedRose).toBe(null);
      }catch(err){
        expect(err.message).toContain('Validation of item type failed');
        expect(err.message).toContain('Name is required');
        expect(err.message).toContain('SellIn is required');
      }
  })
});

describe("[Gilded Rose] 17. Condition: a. validator b. name, sellIn, quality in different items are invalid ; Output: throw error (two error messages)", ()=>{
  it.each([
    [
      [
        new Item("", 50, 50),
        new Item("abc", null, 50),
        new Item("abc", 50, null),
      ], 
    ], 
    [
      [
        new Item("", 50, 50),
        new Item("", null, 50),
        new Item("abc", null, null),
      ], 
    ], 
  ])('Original item: %p expecting throw name, sellIn and quality error',(samples)=>{
    try{
        const gildedRose = new Shop(
        samples,
        )
        const items = gildedRose.updateAll(conditions);
        expect(gildedRose).toBe(null);
      }catch(err){
        expect(err.message).toContain('Validation of item type failed');
        expect(err.message).toContain('Name is required');
        expect(err.message).toContain('SellIn is required');
        expect(err.message).toContain('Quality is required');
      }
  })
});

describe("[Gilded Rose] 18.i Condition: a. validator b. validateItem(data) c. invalid item; Output: return 3 false", ()=>{
  it.each([
    [
      [
        new Item("", 50, 50),
        new Item("abc", null, 50),
        new Item("abc", 50, null),
      ], [false, false, false]
    ],  
    [
      [
        new Item("", 50, 50),
        new Item("", null, 50),
        new Item("", undefined, null),
      ], [false, false, false]
    ], 
    [
      [
        new Item("abc", 50, null),
        new Item("", null, 50),
        new Item("", undefined, null),
      ], [false, false, false]
    ], 
    [
      [
        new Item("", 50, null),
        new Item("", null, 50),
        new Item("abc", 50, 50),
      ], [false, false, false]
    ], 
  ])('Original item: %p expecting result: %p',(samples, result)=>{
      const helper = new DynamicValidator({
        name: [
          new RequiredRule('Name is required'),
          new LengthRule(100, 1,  `Item's name must be between 1 and 100 alphanumeric number`),
        ],
        sellIn: [
          new RequiredRule('SellIn is required'),
          new ValueRule(50, -5,  `Item's sellIn must be between -5 and 50`),
        ],
        quality: [
          new RequiredRule('Quality is required'),
          new ValueRule(80, 0, `Item's quality must be between 0 to 80`),
        ]
      }
      )
      const validationItem = samples.map(item=>helper.validateItem(item))
      expect(validationItem).toEqual(result);
  })
});

describe("[Gilded Rose] 18.ii Condition: a. validator b. validateItem(data) c. Invalid Items; Output: return 2 false", ()=>{
  it.each([
    [
      [
        new Item("abc", 50, 50),
        new Item("", undefined, 50),
        new Item("abcde", 50, 50),
      ], [true, false, false]
    ],  

  ])('Original item: %p expecting result: %p',(samples, result)=>{
      const helper = new DynamicValidator({
        name: [
          new RequiredRule('Name is required'),
          new LengthRule(100, 1,  `Item's name must be between 1 and 100 alphanumeric number`),
        ],
        sellIn: [
          new RequiredRule('SellIn is required'),
          new ValueRule(50, -5,  `Item's sellIn must be between -5 and 50`),
        ],
        quality: [
          new RequiredRule('Quality is required'),
          new ValueRule(80, 0, `Item's quality must be between 0 to 80`),
        ]
      }
      )
      const validationItem = samples.map(item=>helper.validateItem(item))
      expect(validationItem).toEqual(result);
  })
});

describe("[Gilded Rose] 18.iii Condition: a. validator b. validateItem(data) c. Invalid Items; Output: return 1 false", ()=>{
  it.each([
    [
      [
        new Item("abc", 50, 50),
        new Item("abced", 50, 50),
        new Item("abcde", null, 50),
      ], [true, true, false]
    ],  

  ])('Original item: %p expecting result: %p',(samples, result)=>{
      const helper = new DynamicValidator({
        name: [
          new RequiredRule('Name is required'),
          new LengthRule(100, 1,  `Item's name must be between 1 and 100 alphanumeric number`),
        ],
        sellIn: [
          new RequiredRule('SellIn is required'),
          new ValueRule(50, -5,  `Item's sellIn must be between -5 and 50`),
        ],
        quality: [
          new RequiredRule('Quality is required'),
          new ValueRule(80, 0, `Item's quality must be between 0 to 80`),
        ]
      }
      )
      const validationItem = samples.map(item=>helper.validateItem(item))
      expect(validationItem).toEqual(result);
  })
});


describe("[Gilded Rose] 18.iv Condition: a. validator b. validateItem(data) c. Normal Items; Output: return 3 true", ()=>{
  it.each([
    [
      [
        new Item("abc", 50, 50),
        new Item("abced", 50, 50),
        new Item("abcde", 50, 50),
      ], [true, true, true]
    ],  

  ])('Original item: %p expecting result: %p',(samples, result)=>{
      const helper = new DynamicValidator({
        name: [
          new RequiredRule('Name is required'),
          new LengthRule(100, 1,  `Item's name must be between 1 and 100 alphanumeric number`),
        ],
        sellIn: [
          new RequiredRule('SellIn is required'),
          new ValueRule(50, -5,  `Item's sellIn must be between -5 and 50`),
        ],
        quality: [
          new RequiredRule('Quality is required'),
          new ValueRule(80, 0, `Item's quality must be between 0 to 80`),
        ]
      }
      )
      const validationItem = samples.map(item=>helper.validateItem(item))
      expect(validationItem).toEqual(result);
  })
});

describe("[Gilded Rose] 19.i Condition: a. validator b. validateItem(data) c. duplicateItems; Output: return false", ()=>{
  it.each([
    [
      [
        new Item("abc", 50, 50),
        new Item("abc", 50, 50),
        new Item("abcde", 50, 50),
      ], (item => item.name)
    ], 
    [
      duplicateconditions, 
      (item => item.day)
    ] 

  ])('Original item: %p expecting result: return false',(samples, checkFunction)=>{
      const helper = new DynamicValidator([
        new NumberOfItemRule(0, 'The itemList cannot be empty'),
        new NotDuplicatesRule('There are item duplicates in the list'),
      ]
      )
      const validationItemList = helper.validateItem(samples, checkFunction);
      expect(validationItemList).toEqual(false);
  })
});

describe("[Gilded Rose] 19.ii Condition: a. validator b. validateItem(data) c. Empty List; Output: return false", ()=>{
  it.each([
    [
      [
      ], false
    ], 

  ])('Original item: %p expecting result: %p',(samples, result)=>{
      const helper = new DynamicValidator([
        new NumberOfItemRule(0, 'The itemList cannot be empty'),
        new NotDuplicatesRule('There are item duplicates in the list'),
      ]
      )
      const checkFunction = (item => item.name);
      const validationItemList = helper.validateItem(samples, checkFunction);
      expect(validationItemList).toEqual(result);
  })
});

describe("[Gilded Rose] 19.iii Condition: a. validator b. validateItem(data) c. Normal List; Output: return true", ()=>{
  it.each([
    [
      [
        new Item("curious", 50, 49), 
        new Item("generous", 50, 49), 
        new Item("Sulfuras, Hand of Ragnaros", 50, 49), 
      ], true
    ], 
    [
      [
        new Item("curious", 50, 49), 
      ], true
    ], 

  ])('Original item: %p expecting result: %p',(samples, result)=>{
      const helper = new DynamicValidator([
        new NumberOfItemRule(0, 'The itemList cannot be empty'),
        new NotDuplicatesRule('There are item duplicates in the list'),
      ]
      )
      const checkFunction = (item => item.name);
      const validationItemList = helper.validateItem(samples, checkFunction);
      expect(validationItemList).toEqual(result);
  })
});

describe("[Gilded Rose] 20.i Condition: a. validator b. showError(errorItems, errorMessage) c. Invalid items; Output: errorMessage", ()=>{
  it.each([
    [
      [
        new Item("", 50, 49), 
        new Item("generous", null, 49), 
        new Item("Sulfuras, Hand of Ragnaros", 50, null), 
      ]
    ], 

  ])('Original item: %p expecting errorMessage',(samples)=>{
    const helper = new DynamicValidator({
      name: [
        new RequiredRule('Name is required'),
        new LengthRule(100, 1,  `Item's name must be between 1 and 100 alphanumeric number`),
      ],
      sellIn: [
        new RequiredRule('SellIn is required'),
        new ValueRule(50, -5,  `Item's sellIn must be between -5 and 50`),
      ],
      quality: [
        new RequiredRule('Quality is required'),
        new ValueRule(80, 0, `Item's quality must be between 0 to 80`),
      ]
    }
    )
      const errorItems = samples.filter(item => !helper.validateItem(item))
      const showError = helper.showError(errorItems, helper.errors);
      expect(showError[0]).toContain(`Name is required`);
      expect(showError[0]).toContain(`SellIn is required`);
      expect(showError[0]).toContain(`Quality is required`);
  })
});

describe("[Gilded Rose] 20.ii Condition: a. validator b. showError(errorItems, errorMessage) c. Normal List; Output: emptyArray", ()=>{
  it.each([
    [
      [
        new Item("Curious", 50, 49), 
        new Item("generous", 50, 49), 
        new Item("Sulfuras, Hand of Ragnaros", 50, 80), 
      ]
    ], 

  ])('Original item: %p expecting emptyArray',(samples)=>{
    const helper = new DynamicValidator({
      name: [
        new RequiredRule('Name is required'),
        new LengthRule(100, 1,  `Item's name must be between 1 and 100 alphanumeric number`),
      ],
      sellIn: [
        new RequiredRule('SellIn is required'),
        new ValueRule(50, -5,  `Item's sellIn must be between -5 and 50`),
      ],
      quality: [
        new RequiredRule('Quality is required'),
        new ValueRule(80, 0, `Item's quality must be between 0 to 80`),
      ]
    }
    )
      const errorItems = samples.filter(item => !helper.validateItem(item))
      const showError = helper.showError(errorItems, helper.errors);
      expect(showError).toEqual([]);
  })
});