using Xunit;
using System.Collections.Generic;
using GildedRoseKata;
using ApprovalUtilities.Utilities;
using System.Diagnostics.Metrics;

namespace GildedRoseTests
{
    public class GildedRoseTest
    {
        [Fact]
        public void foo()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "foo", SellIn = 0, Quality = 0 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal("foo", Items[0].Name);
        }

        #region Test Scenario 1
        // All items have a SellIn value which denotes the number of days we have to sell the item
        [Fact]
        public void TestScenario1_AGED()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Aged Brie", SellIn = 1, Quality = 0 }};
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(0, Items[0].SellIn);
        }
        [Fact]
        public void TestScenario1_BACKSTAGE()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 1, Quality = 0 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(0, Items[0].SellIn);
        }
        [Fact]
        //Note: "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
        public void TestScenario1_SULFURAS()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Sulfuras, Hand of Ragnaros", SellIn = 1, Quality = 0 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(1, Items[0].SellIn);
        }
        [Fact]
        public void TestScenario1_NORMAL()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Normal Me", SellIn = 1, Quality = 0 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(0, Items[0].SellIn);
        }
        #endregion

        #region Test Scenario 2
        // All items have a Quality value which denotes how valuable the item is
        [Fact]

        //Note: "Aged Brie" actually increases in Quality the older it gets
        public void TestScenario2_AGED()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Aged Brie", SellIn = 0, Quality = 1 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(3, Items[0].Quality);
        }
        [Fact]
        public void TestScenario2_BACKSTAGE()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 0, Quality = 1 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(0, Items[0].Quality);
        }
        [Fact]
        //Note: "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
        public void TestScenario2_SULFURAS()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Sulfuras, Hand of Ragnaros", SellIn = 0, Quality = 1 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(1, Items[0].Quality);
        }
        [Fact]
        public void TestScenario2_NORMAL()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Normal Me", SellIn = 0, Quality = 1 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(0, Items[0].Quality);
        }
        #endregion

        #region Test Scenario 3
        // At the end of each day our system lowers both values for every item
        [Fact]

        //Note: "Aged Brie" actually increases in Quality the older it gets
        public void TestScenario3_AGED()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Aged Brie", SellIn = 1, Quality = 1 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(0, Items[0].SellIn);
            Assert.Equal(2, Items[0].Quality);
        }

        [Fact]
        //Note: "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches
        public void TestScenario3_BACKSTAGE()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 1, Quality = 1 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(0, Items[0].SellIn);
            Assert.Equal(4, Items[0].Quality);
        }
        [Fact]
        //Note: "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
        public void TestScenario3_SULFURAS()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Sulfuras, Hand of Ragnaros", SellIn = 1, Quality = 1 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(1, Items[0].SellIn);
            Assert.Equal(1, Items[0].Quality);
        }
        [Fact]
        public void TestScenario3_NORMAL()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Normal Me", SellIn = 1, Quality = 1 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(0, Items[0].SellIn);
            Assert.Equal(0, Items[0].Quality);
        }
        #endregion

        #region Test Scenario 4
        // Once the sell by date has passed, Quality degrades twice as fast
        [Fact]

        //Note: "Aged Brie" actually increases in Quality the older it gets
        public void TestScenario4_AGED()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Aged Brie", SellIn = 0, Quality = 3 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(-1, Items[0].SellIn);
            Assert.Equal(5, Items[0].Quality);
        }

        [Fact]
        //Note: "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches
        public void TestScenario4_BACKSTAGE()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 0, Quality = 3 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(-1, Items[0].SellIn);
            Assert.Equal(0, Items[0].Quality);
        }
        [Fact]
        //Note: "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
        public void TestScenario4_SULFURAS()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Sulfuras, Hand of Ragnaros", SellIn = 0, Quality = 3 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(0, Items[0].SellIn);
            Assert.Equal(3, Items[0].Quality);
        }
        [Fact]
        public void TestScenario4_NORMAL()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Normal Me", SellIn = 0, Quality = 3 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(-1, Items[0].SellIn);
            Assert.Equal(1, Items[0].Quality);
        }
        #endregion

        #region Test Scenario 5
        // The Quality of an item is never negative
        [Fact]

        //Note: "Aged Brie" actually increases in Quality the older it gets
        public void TestScenario5_AGED()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Aged Brie", SellIn = 0, Quality = 0 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.True(Items[0].Quality >= 0);
        }

        [Fact]
        //Note: "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches
        public void TestScenario5_BACKSTAGE()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 0, Quality = 0 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.True(Items[0].Quality >= 0);
        }
        [Fact]
        //Note: "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
        public void TestScenario5_SULFURAS()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Sulfuras, Hand of Ragnaros", SellIn = 0, Quality = 0 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.True(Items[0].Quality >= 0);
        }
        [Fact]
        public void TestScenario5_NORMAL()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Normal Me", SellIn = 0, Quality = 0 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.True(Items[0].Quality >= 0);
        }
        #endregion

        #region Test Scenario 6
        // "Aged Brie" actually increases in Quality the older it gets
        [Fact]
        public void TestScenario6_AGED_0()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Aged Brie", SellIn = 0, Quality = 0 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(2, Items[0].Quality);
        }
        [Fact]
        public void TestScenario6_AGED_1()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Aged Brie", SellIn = 1, Quality = 0 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(1, Items[0].Quality);
        }
        #endregion

        #region Test Scenario 7
        // The Quality of an item is never more than 50
        [Fact]

        //Note: "Aged Brie" actually increases in Quality the older it gets
        public void TestScenario7_AGED()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Aged Brie", SellIn = 0, Quality = 50 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.True(Items[0].Quality <= 50);
        }

        [Fact]
        //Note: "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches
        public void TestScenario7_BACKSTAGE()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 0, Quality = 50 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.True(Items[0].Quality <= 50);
        }
        [Fact]
        //Note: "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
        public void TestScenario7_SULFURAS()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Sulfuras, Hand of Ragnaros", SellIn = 0, Quality = 50 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.True(Items[0].Quality <= 50);
        }
        [Fact]
        public void TestScenario7_NORMAL()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Normal Me", SellIn = 0, Quality = 50 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.True(Items[0].Quality <= 50);
        }
        #endregion

        #region Test Scenario 8
        // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
        [Fact]
        public void TestScenario8_SULFURAS_0()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Sulfuras, Hand of Ragnaros", SellIn = 0, Quality = 0 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(0, Items[0].SellIn);
            Assert.Equal(0, Items[0].Quality);
        }
        [Fact]
        public void TestScenario8_SULFURAS_1()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Sulfuras, Hand of Ragnaros", SellIn = 1, Quality = 0 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(1, Items[0].SellIn);
            Assert.Equal(0, Items[0].Quality);
        }
        [Fact]
        public void TestScenario8_SULFURAS_2()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Sulfuras, Hand of Ragnaros", SellIn = 0, Quality = 1 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(0, Items[0].SellIn);
            Assert.Equal(1, Items[0].Quality);
        }
        [Fact]
        public void TestScenario8_SULFURAS_3()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Sulfuras, Hand of Ragnaros", SellIn = 1, Quality = 1 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(1, Items[0].SellIn);
            Assert.Equal(1, Items[0].Quality);
        }
        #endregion

        #region Test Scenario 9
        /* "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
            Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
            Quality drops to 0 after the concert*/
        [Fact]
        public void TestScenario9_BACKSTAGE_0()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 10, Quality = 0 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(9, Items[0].SellIn);
            Assert.Equal(2, Items[0].Quality);
        }
        [Fact]
        public void TestScenario9_BACKSTAGE_1()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 5, Quality = 0 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(4, Items[0].SellIn);
            Assert.Equal(3, Items[0].Quality);
        }
        [Fact]
        public void TestScenario9_BACKSTAGE_2()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 1, Quality = 0 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(0, Items[0].SellIn);
            Assert.Equal(3, Items[0].Quality);
        }
        [Fact]
        public void TestScenario9_BACKSTAGE_3()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 0, Quality = 0 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(-1, Items[0].SellIn);
            Assert.Equal(0, Items[0].Quality);
        }
        [Fact]
        public void TestScenario9_BACKSTAGE_4()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 10, Quality = 30 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(9, Items[0].SellIn);
            Assert.Equal(32, Items[0].Quality);
        }
        [Fact]
        public void TestScenario9_BACKSTAGE_5()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 5, Quality = 30 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(4, Items[0].SellIn);
            Assert.Equal(33, Items[0].Quality);
        }
        [Fact]
        public void TestScenario9_BACKSTAGE_6()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 1, Quality = 30 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(0, Items[0].SellIn);
            Assert.Equal(33, Items[0].Quality);
        }
        [Fact]
        public void TestScenario9_BACKSTAGE_7()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 0, Quality = 30 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(-1, Items[0].SellIn);
            Assert.Equal(0, Items[0].Quality);
        }
        [Fact]
        public void TestScenario9_BACKSTAGE_8()
        {
            IList<Item> Items = new List<Item> { new Item { Name = "Backstage passes to a TAFKAL80ETC concert", SellIn = 15, Quality = 30 } };
            GildedRose app = new GildedRose(Items);
            app.UpdateQuality();
            Assert.Equal(14, Items[0].SellIn);
            Assert.Equal(31, Items[0].Quality);
        }
        #endregion
    }
}
