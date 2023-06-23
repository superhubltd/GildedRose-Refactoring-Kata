const {Shop, Item} = require("../src/gilded_rose");

// Elevate Items
const ITEM_AGED_BRIE = "Aged Brie";
const ITEM_BACKSTAGE_PASSES = "Backstage passes to a TAFKAL80ETC concert";

// Degrade Items
const ITEM_VEST = "+5 Dexterity Vest";

// Legendary items

describe("Gilded Rose", function() {
  describe('Degrade Item', () => { 
    describe('quality', () => { 
      describe('should decrease by 1', () => { 
        describe('when quality is positive, and sellIn is 1 or more', () => { 
          const dataSet = [
            { itemName: ITEM_VEST, sellIn: 1,  quality: 1,  expectedQuality: 0 },
            { itemName: ITEM_VEST, sellIn: 2,  quality: 1,  expectedQuality: 0 },
            { itemName: ITEM_VEST, sellIn: 1,  quality: 10, expectedQuality: 9 },
            { itemName: ITEM_VEST, sellIn: 2,  quality: 10, expectedQuality: 9 },
          ]
      
          it.each(dataSet)("%p", ({ itemName, sellIn, quality, expectedQuality }) => {
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(expectedQuality);
          })
        })
      })

      describe('should decrease by 2', () => { 
        describe('when sellIn is zero or negative', () => { 
          const dataSet = [
            { itemName: ITEM_VEST, sellIn: -1, quality: 2, expectedQuality: 0 },
            { itemName: ITEM_VEST, sellIn: 0,  quality: 2, expectedQuality: 0 },
          ]
      
          it.each(dataSet)("%p", ({ itemName, sellIn, quality, expectedQuality }) => {
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(expectedQuality);
          })
        })
      })

      describe('should decrease but never negative', () => { 
        const dataSet = [
          { itemName: ITEM_VEST, sellIn: -1, quality: 1, expectedQuality: 0 },
          { itemName: ITEM_VEST, sellIn: 0,  quality: 1, expectedQuality: 0 },
        ]
    
        it.each(dataSet)("%p", ({ itemName, sellIn, quality, expectedQuality }) => {
          const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
          const items = gildedRose.updateQuality();
          expect(items[0].quality).toBe(expectedQuality);
        })
      })

      describe('should remain unchanged', () => { 
        describe('when quality is 0', () => { 
          const dataSet = [
            { itemName: ITEM_VEST, sellIn: -1, quality: 0, expectedQuality: 0 },
            { itemName: ITEM_VEST, sellIn: 0,  quality: 0, expectedQuality: 0 },
            { itemName: ITEM_VEST, sellIn: 1,  quality: 0, expectedQuality: 0 },
            { itemName: ITEM_VEST, sellIn: 2,  quality: 0, expectedQuality: 0 },
          ]
      
          it.each(dataSet)("%p", ({ itemName, sellIn, quality, expectedQuality }) => {
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(expectedQuality);
          })
        })

        describe('when quality is negative', () => { 
          const dataSet = [
            { itemName: ITEM_VEST, sellIn: -1, quality: -1, expectedQuality: -1 },
            { itemName: ITEM_VEST, sellIn: 0,  quality: -1, expectedQuality: -1 },
            { itemName: ITEM_VEST, sellIn: 1,  quality: -1, expectedQuality: -1 },
            { itemName: ITEM_VEST, sellIn: 2,  quality: -1, expectedQuality: -1 },
          ]
      
          it.each(dataSet)("%p", ({ itemName, sellIn, quality, expectedQuality }) => {
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(expectedQuality);
          })
        })
  
        describe('when sellIn is 0 or less', () => { 
          const dataSet = [
            { itemName: ITEM_VEST, sellIn: -1, quality: 1, expectedQuality: 0 },
            { itemName: ITEM_VEST, sellIn: 0,  quality: 1, expectedQuality: 0 },
            { itemName: ITEM_VEST, sellIn: 1,  quality: 1, expectedQuality: 0 },
            { itemName: ITEM_VEST, sellIn: 2,  quality: 1, expectedQuality: 0 },
          ]
      
          it.each(dataSet)("%p", ({ itemName, sellIn, quality, expectedQuality }) => {
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(expectedQuality);
          })
        })
      })
    })

    describe('sellIn', () => { 
      describe('should decrease by 1', () => { 
        const dataSet = [
          { itemName: ITEM_VEST, sellIn: -1, quality: 1, expectedSellIn: -2 },
          { itemName: ITEM_VEST, sellIn: 0,  quality: 1, expectedSellIn: -1 },
          { itemName: ITEM_VEST, sellIn: 1,  quality: 1, expectedSellIn: 0 },
          { itemName: ITEM_VEST, sellIn: 2,  quality: 1, expectedSellIn: 1 },
        ]
    
        it.each(dataSet)("%p", ({ itemName, sellIn, quality, expectedSellIn }) => {
          const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
          const items = gildedRose.updateQuality();
          expect(items[0].sellIn).toBe(expectedSellIn);
        })
      })
    })
  })

  describe('Elevate Item', () => { 
    describe('Aged Brie', () => { 
      describe('quality', () => { 
        describe('should increase by 1', () => { 
          const dataSet = [
            { itemName: ITEM_AGED_BRIE, sellIn: 12, quality: 49, expectedSellIn: 11, expectedQuality: 50 },
            { itemName: ITEM_AGED_BRIE, sellIn: 12, quality: 48, expectedSellIn: 11, expectedQuality: 49 },
            { itemName: ITEM_AGED_BRIE, sellIn: 12, quality: 0,  expectedSellIn: 11, expectedQuality: 1 },
            { itemName: ITEM_AGED_BRIE, sellIn: 11, quality: 0,  expectedSellIn: 10, expectedQuality: 1 },
            { itemName: ITEM_AGED_BRIE, sellIn: 10, quality: 0,  expectedSellIn: 9,  expectedQuality: 1 },
            { itemName: ITEM_AGED_BRIE, sellIn: 1,  quality: 0,  expectedSellIn: 0,  expectedQuality: 1 },
          ]
      
          it.each(dataSet)("%p", ({ itemName, sellIn, quality, expectedSellIn, expectedQuality }) => {
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(expectedQuality);
          })
        })

        describe('should increase by 2 when sellIn is zero or negative, and quality is 48 or less', () => { 
          const dataSet = [
            { itemName: ITEM_AGED_BRIE, sellIn: 0,  quality: 50, expectedSellIn: -1, expectedQuality: 50 },
            { itemName: ITEM_AGED_BRIE, sellIn: -1, quality: 50, expectedSellIn: -2, expectedQuality: 50 },
            { itemName: ITEM_AGED_BRIE, sellIn: 0,  quality: 49, expectedSellIn: -1, expectedQuality: 50 },
            { itemName: ITEM_AGED_BRIE, sellIn: -1, quality: 49, expectedSellIn: -2, expectedQuality: 50 },
            { itemName: ITEM_AGED_BRIE, sellIn: 0,  quality: 48, expectedSellIn: -1, expectedQuality: 50 },
            { itemName: ITEM_AGED_BRIE, sellIn: -1, quality: 48, expectedSellIn: -2, expectedQuality: 50 },
            { itemName: ITEM_AGED_BRIE, sellIn: 0,  quality: 40, expectedSellIn: -1, expectedQuality: 42 },
            { itemName: ITEM_AGED_BRIE, sellIn: -1, quality: 40, expectedSellIn: -2, expectedQuality: 42 },
            { itemName: ITEM_AGED_BRIE, sellIn: 0,  quality: 0,  expectedSellIn: -1, expectedQuality: 2 },
            { itemName: ITEM_AGED_BRIE, sellIn: -1, quality: 0,  expectedSellIn: -2, expectedQuality: 2 },
          ]
      
          it.each(dataSet)("%p", ({ itemName, sellIn, quality, expectedSellIn, expectedQuality }) => {
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(expectedQuality);
          })
        })

        describe('should increase by 1 (but never more than 50)', () => { 
          const dataSet = [
            { itemName: ITEM_AGED_BRIE, sellIn: 2, quality: 50, expectedSellIn: 1, expectedQuality: 50 },
            { itemName: ITEM_AGED_BRIE, sellIn: 1, quality: 50, expectedSellIn: 0, expectedQuality: 50 },
          ]
      
          it.each(dataSet)("%p", ({ itemName, sellIn, quality, expectedSellIn, expectedQuality }) => {
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(expectedQuality);
          })
        })

        describe('should not increase when it is 50 or more', () => { 
          const dataSet = [
            { itemName: ITEM_AGED_BRIE, sellIn: 2, quality: 50, expectedSellIn: 1, expectedQuality: 50 },
            { itemName: ITEM_AGED_BRIE, sellIn: 2, quality: 51, expectedSellIn: 1, expectedQuality: 51 },
            { itemName: ITEM_AGED_BRIE, sellIn: 1, quality: 100, expectedSellIn: 0, expectedQuality: 100 },
          ]
      
          it.each(dataSet)("%p", ({ itemName, sellIn, quality, expectedSellIn, expectedQuality }) => {
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(expectedQuality);
          })
        })
      })

      describe('sellIn', () => { 

      })
    })

    describe('Backstage passes', () => { 
      describe('quality', () => { 
        describe('should increase by 1', () => { 
          const dataSet = [
            { itemName: ITEM_BACKSTAGE_PASSES, sellIn: 15, quality: 20, expectedSellIn: 14, expectedQuality: 21 },
            { itemName: ITEM_BACKSTAGE_PASSES, sellIn: 10, quality: 49, expectedSellIn: 9, expectedQuality: 50 },
            { itemName: ITEM_BACKSTAGE_PASSES, sellIn: 5, quality: 49, expectedSellIn: 4, expectedQuality: 50 },
          ]
      
          it.each(dataSet)("%p", ({ itemName, sellIn, quality, expectedSellIn, expectedQuality }) => {
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(expectedQuality);
          })
        })

        describe('should increase by 1 (but never more than 50)', () => { 
          const dataSet = [
            { itemName: ITEM_BACKSTAGE_PASSES, sellIn: 2, quality: 50, expectedSellIn: 1, expectedQuality: 50 },
            { itemName: ITEM_BACKSTAGE_PASSES, sellIn: 1, quality: 50, expectedSellIn: 0, expectedQuality: 50 },
          ]
      
          it.each(dataSet)("%p", ({ itemName, sellIn, quality, expectedSellIn, expectedQuality }) => {
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(expectedQuality);
          })
        })

        describe('should increase by 2 when sellIn is zero or negative, and quality is 48 or less', () => { 
          const dataSet = [
            { itemName: ITEM_BACKSTAGE_PASSES, sellIn: 2, quality: 0, expectedSellIn: 1, expectedQuality: 3 },
          ]
      
          it.each(dataSet)("%p", ({ itemName, sellIn, quality, expectedSellIn, expectedQuality }) => {
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(expectedQuality);
          })
        })

        describe('should not increase when more than 50', () => { 
          const dataSet = [
            { itemName: ITEM_BACKSTAGE_PASSES, sellIn: 2, quality: 51, expectedSellIn: 1, expectedQuality: 51 },
            { itemName: ITEM_BACKSTAGE_PASSES, sellIn: 1, quality: 100, expectedSellIn: 0, expectedQuality: 100 },
          ]
      
          it.each(dataSet)("%p", ({ itemName, sellIn, quality, expectedSellIn, expectedQuality }) => {
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(expectedQuality);
          })
        })

        describe('should decrease to 0', () => { 
          const dataSet = [
            { itemName: ITEM_BACKSTAGE_PASSES, sellIn: 0, quality: 51, expectedSellIn: -1, expectedQuality: 0 },
            { itemName: ITEM_BACKSTAGE_PASSES, sellIn: -1, quality: 100, expectedSellIn: -2, expectedQuality: 0 },
          ]
      
          it.each(dataSet)("%p", ({ itemName, sellIn, quality, expectedSellIn, expectedQuality }) => {
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(expectedQuality);
          })
        })
      })

      describe('sellIn', () => { 

      })
    })
  })

  describe("Legendary Item", () => {
    describe('Sulfuras', () => { 
      const dataSet = [
        { itemName: "Sulfuras, Hand of Ragnaros", sellIn: 1, quality: 80, expectedSellIn: 1, expectedQuality: 80 },
        { itemName: "Sulfuras, Hand of Ragnaros", sellIn: 0, quality: 80, expectedSellIn: 0, expectedQuality: 80 },
        { itemName: "Sulfuras, Hand of Ragnaros", sellIn: -1, quality: 80, expectedSellIn: -1, expectedQuality: 80 },
      ]

      describe('quality', () => { 
        describe('should always 80', () => { 
          it.each(dataSet)("%p", function({ itemName, sellIn, quality, expectedSellIn, expectedQuality }) {
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(expectedQuality);
          })
        })
    
        describe('should never decrease', () => { 
          it.each(dataSet)("%p", function({ itemName, sellIn, quality, expectedSellIn, expectedQuality }) {
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].quality).toBe(expectedQuality);
          })
        })
      })

      describe('sellIn', () => { 
        describe('should never decrease', () => { 
          it.each(dataSet)("%p", function({ itemName, sellIn, quality, expectedSellIn, expectedQuality }) {
            const gildedRose = new Shop([new Item(itemName, sellIn, quality)]);
            const items = gildedRose.updateQuality();
            expect(items[0].sellIn).toBe(expectedSellIn);
          })
        })
      })
    })
  })

  describe('Conjured Item', () => { 
    describe('quality', () => { 

    })

    describe('sellIn', () => { 

    })
  })
});
