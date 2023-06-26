using Xunit;
using System.Collections.Generic;
using System;
using GildedRoseKata;
using GildedRoseKata.Constants;

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

        [Theory]
        #region Aged
        [InlineData(SpecialItemNames.AGED, 0, 0,  -1, 2)]
        [InlineData(SpecialItemNames.AGED, 0, 1,  -1, 3)]
        [InlineData(SpecialItemNames.AGED, 0, 50, -1, 50)]
        [InlineData(SpecialItemNames.AGED, 0, 49, -1, 50)]
        [InlineData(SpecialItemNames.AGED, 0, 48, -1, 50)]
        [InlineData(SpecialItemNames.AGED, 0, 47, -1, 49)]
        [InlineData(SpecialItemNames.AGED, 1, 0,  0, 1)]
        [InlineData(SpecialItemNames.AGED, 1, 1,  0, 2)]
        [InlineData(SpecialItemNames.AGED, 1, 50, 0, 50)]
        [InlineData(SpecialItemNames.AGED, 1, 49, 0, 50)]
        [InlineData(SpecialItemNames.AGED, 1, 48, 0, 49)]
        [InlineData(SpecialItemNames.AGED, 1, 47, 0, 48)]
        [InlineData(SpecialItemNames.AGED, 2, 0,  1, 1)]
        [InlineData(SpecialItemNames.AGED, 2, 1,  1, 2)]
        [InlineData(SpecialItemNames.AGED, 2, 50, 1, 50)]
        [InlineData(SpecialItemNames.AGED, 2, 49, 1, 50)]
        [InlineData(SpecialItemNames.AGED, 2, 48, 1, 49)]
        [InlineData(SpecialItemNames.AGED, 2, 47, 1, 48)]
        [InlineData(SpecialItemNames.AGED, 10, 0, 9, 1)]
        [InlineData(SpecialItemNames.AGED, 10, 1, 9, 2)]
        [InlineData(SpecialItemNames.AGED, 10, 50, 9, 50)]
        [InlineData(SpecialItemNames.AGED, 10, 49, 9, 50)]
        [InlineData(SpecialItemNames.AGED, 10, 48, 9, 49)]
        [InlineData(SpecialItemNames.AGED, 10, 47, 9, 48)]
        #endregion

        #region Backstage
        [InlineData(SpecialItemNames.BACKSTAGE, 0, 0, -1, 0)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, 1, -1, 0)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, 5, -1, 0)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, 6, -1, 0)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, 10, -1, 0)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, 11, -1, 0)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, 50, -1, 0)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, 49, -1, 0)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, 48, -1, 0)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, 47, -1, 0)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, 46, -1, 0)]

        [InlineData(SpecialItemNames.BACKSTAGE, 1, 0, 0, 3)]
        [InlineData(SpecialItemNames.BACKSTAGE, 1, 1, 0, 4)]
        [InlineData(SpecialItemNames.BACKSTAGE, 1, 5, 0, 8)]
        [InlineData(SpecialItemNames.BACKSTAGE, 1, 6, 0, 9)]
        [InlineData(SpecialItemNames.BACKSTAGE, 1, 10, 0, 13)]
        [InlineData(SpecialItemNames.BACKSTAGE, 1, 11, 0, 14)]
        [InlineData(SpecialItemNames.BACKSTAGE, 1, 50, 0, 50)]
        [InlineData(SpecialItemNames.BACKSTAGE, 1, 49, 0, 50)]
        [InlineData(SpecialItemNames.BACKSTAGE, 1, 48, 0, 50)]
        [InlineData(SpecialItemNames.BACKSTAGE, 1, 47, 0, 50)]
        [InlineData(SpecialItemNames.BACKSTAGE, 1, 46, 0, 49)]

        [InlineData(SpecialItemNames.BACKSTAGE, 5, 0, 4, 3)]
        [InlineData(SpecialItemNames.BACKSTAGE, 5, 1, 4, 4)]
        [InlineData(SpecialItemNames.BACKSTAGE, 5, 5, 4, 8)]
        [InlineData(SpecialItemNames.BACKSTAGE, 5, 6, 4, 9)]
        [InlineData(SpecialItemNames.BACKSTAGE, 5, 10, 4, 13)]
        [InlineData(SpecialItemNames.BACKSTAGE, 5, 11, 4, 14)]
        [InlineData(SpecialItemNames.BACKSTAGE, 5, 50, 4, 50)]
        [InlineData(SpecialItemNames.BACKSTAGE, 5, 49, 4, 50)]
        [InlineData(SpecialItemNames.BACKSTAGE, 5, 48, 4, 50)]
        [InlineData(SpecialItemNames.BACKSTAGE, 5, 47, 4, 50)]
        [InlineData(SpecialItemNames.BACKSTAGE, 5, 46, 4, 49)]

        [InlineData(SpecialItemNames.BACKSTAGE, 6, 0, 5, 2)]
        [InlineData(SpecialItemNames.BACKSTAGE, 6, 1, 5, 3)]
        [InlineData(SpecialItemNames.BACKSTAGE, 6, 5, 5, 7)]
        [InlineData(SpecialItemNames.BACKSTAGE, 6, 6, 5, 8)]
        [InlineData(SpecialItemNames.BACKSTAGE, 6, 10, 5, 12)]
        [InlineData(SpecialItemNames.BACKSTAGE, 6, 11, 5, 13)]
        [InlineData(SpecialItemNames.BACKSTAGE, 6, 50, 5, 50)]
        [InlineData(SpecialItemNames.BACKSTAGE, 6, 49, 5, 50)]
        [InlineData(SpecialItemNames.BACKSTAGE, 6, 48, 5, 50)]
        [InlineData(SpecialItemNames.BACKSTAGE, 6, 47, 5, 49)]
        [InlineData(SpecialItemNames.BACKSTAGE, 6, 46, 5, 48)]

        [InlineData(SpecialItemNames.BACKSTAGE, 10, 0, 9, 2)]
        [InlineData(SpecialItemNames.BACKSTAGE, 10, 1, 9, 3)]
        [InlineData(SpecialItemNames.BACKSTAGE, 10, 5, 9, 7)]
        [InlineData(SpecialItemNames.BACKSTAGE, 10, 6, 9, 8)]
        [InlineData(SpecialItemNames.BACKSTAGE, 10, 10, 9, 12)]
        [InlineData(SpecialItemNames.BACKSTAGE, 10, 11, 9, 13)]
        [InlineData(SpecialItemNames.BACKSTAGE, 10, 50, 9, 50)]
        [InlineData(SpecialItemNames.BACKSTAGE, 10, 49, 9, 50)]
        [InlineData(SpecialItemNames.BACKSTAGE, 10, 48, 9, 50)]
        [InlineData(SpecialItemNames.BACKSTAGE, 10, 47, 9, 49)]
        [InlineData(SpecialItemNames.BACKSTAGE, 10, 46, 9, 48)]

        [InlineData(SpecialItemNames.BACKSTAGE, 11, 0, 10, 1)]
        [InlineData(SpecialItemNames.BACKSTAGE, 11, 1, 10, 2)]
        [InlineData(SpecialItemNames.BACKSTAGE, 11, 5, 10, 6)]
        [InlineData(SpecialItemNames.BACKSTAGE, 11, 6, 10, 7)]
        [InlineData(SpecialItemNames.BACKSTAGE, 11, 10, 10, 11)]
        [InlineData(SpecialItemNames.BACKSTAGE, 11, 11, 10, 12)]
        [InlineData(SpecialItemNames.BACKSTAGE, 11, 50, 10, 50)]
        [InlineData(SpecialItemNames.BACKSTAGE, 11, 49, 10, 50)]
        [InlineData(SpecialItemNames.BACKSTAGE, 11, 48, 10, 49)]
        [InlineData(SpecialItemNames.BACKSTAGE, 11, 47, 10, 48)]
        [InlineData(SpecialItemNames.BACKSTAGE, 11, 46, 10, 47)]
        #endregion

        #region Sulfuras
        [InlineData(SpecialItemNames.SULFURAS, 0, QualityLimit.SULFURAS_DEFAULT, 0, QualityLimit.SULFURAS_DEFAULT)]
        [InlineData(SpecialItemNames.SULFURAS, 1, QualityLimit.SULFURAS_DEFAULT, 1, QualityLimit.SULFURAS_DEFAULT)]
        [InlineData(SpecialItemNames.SULFURAS, 10, QualityLimit.SULFURAS_DEFAULT, 10, QualityLimit.SULFURAS_DEFAULT)]
        [InlineData(SpecialItemNames.SULFURAS, 20, QualityLimit.SULFURAS_DEFAULT, 20, QualityLimit.SULFURAS_DEFAULT)]
        [InlineData(SpecialItemNames.SULFURAS, 30, QualityLimit.SULFURAS_DEFAULT, 30, QualityLimit.SULFURAS_DEFAULT)]
        [InlineData(SpecialItemNames.SULFURAS, 40, QualityLimit.SULFURAS_DEFAULT, 40, QualityLimit.SULFURAS_DEFAULT)]
        [InlineData(SpecialItemNames.SULFURAS, 50, QualityLimit.SULFURAS_DEFAULT, 50, QualityLimit.SULFURAS_DEFAULT)]
        #endregion

        #region Conjured
        [InlineData(SpecialItemNames.CONJURED, 0, 0, -1, 0)]
        [InlineData(SpecialItemNames.CONJURED, 0, 1, -1, 0)]
        [InlineData(SpecialItemNames.CONJURED, 0, 2, -1, 0)]
        [InlineData(SpecialItemNames.CONJURED, 0, 3, -1, 0)]
        [InlineData(SpecialItemNames.CONJURED, 0, 4, -1, 0)]
        [InlineData(SpecialItemNames.CONJURED, 0, 5, -1, 1)]
        [InlineData(SpecialItemNames.CONJURED, 0, 50, -1, 46)]
        [InlineData(SpecialItemNames.CONJURED, 0, 49, -1, 45)]
        [InlineData(SpecialItemNames.CONJURED, 0, 48, -1, 44)]
        [InlineData(SpecialItemNames.CONJURED, 0, 47, -1, 43)]
        [InlineData(SpecialItemNames.CONJURED, 0, 46, -1, 42)]
        [InlineData(SpecialItemNames.CONJURED, 0, 45, -1, 41)]

        [InlineData(SpecialItemNames.CONJURED, 1, 0, 0, 0)]
        [InlineData(SpecialItemNames.CONJURED, 1, 1, 0, 0)]
        [InlineData(SpecialItemNames.CONJURED, 1, 2, 0, 0)]
        [InlineData(SpecialItemNames.CONJURED, 1, 3, 0, 1)]
        [InlineData(SpecialItemNames.CONJURED, 1, 4, 0, 2)]
        [InlineData(SpecialItemNames.CONJURED, 1, 5, 0, 3)]
        [InlineData(SpecialItemNames.CONJURED, 1, 50, 0, 48)]
        [InlineData(SpecialItemNames.CONJURED, 1, 49, 0, 47)]
        [InlineData(SpecialItemNames.CONJURED, 1, 48, 0, 46)]
        [InlineData(SpecialItemNames.CONJURED, 1, 47, 0, 45)]
        [InlineData(SpecialItemNames.CONJURED, 1, 46, 0, 44)]
        [InlineData(SpecialItemNames.CONJURED, 1, 45, 0, 43)]
        #endregion

        #region Normal
        [InlineData("Normal Me", 0, 0, -1, 0)]
        [InlineData("Normal Me", 0, 1, -1, 0)]
        [InlineData("Normal Me", 0, 2, -1, 0)]
        [InlineData("Normal Me", 0, 3, -1, 1)]
        [InlineData("Normal Me", 0, 4, -1, 2)]
        [InlineData("Normal Me", 0, 5, -1, 3)]
        [InlineData("Normal Me", 0, 50, -1, 48)]
        [InlineData("Normal Me", 0, 49, -1, 47)]
        [InlineData("Normal Me", 0, 48, -1, 46)]
        [InlineData("Normal Me", 0, 47, -1, 45)]
        [InlineData("Normal Me", 0, 46, -1, 44)]
        [InlineData("Normal Me", 0, 45, -1, 43)]

        [InlineData("Normal Me", 1, 0, 0, 0)]
        [InlineData("Normal Me", 1, 1, 0, 0)]
        [InlineData("Normal Me", 1, 2, 0, 1)]
        [InlineData("Normal Me", 1, 3, 0, 2)]
        [InlineData("Normal Me", 1, 4, 0, 3)]
        [InlineData("Normal Me", 1, 5, 0, 4)]
        [InlineData("Normal Me", 1, 50, 0, 49)]
        [InlineData("Normal Me", 1, 49, 0, 48)]
        [InlineData("Normal Me", 1, 48, 0, 47)]
        [InlineData("Normal Me", 1, 47, 0, 46)]
        [InlineData("Normal Me", 1, 46, 0, 45)]
        [InlineData("Normal Me", 1, 45, 0, 44)]
        #endregion

        public void ValidData_Test(string name, int sellIn, int quality, int expectedSellIn, int expectedQuality)
        {
            //Arrange
            IList<Item> Items = new List<Item> { new Item { Name = name, SellIn = sellIn, Quality = quality } };
            GildedRose app = new GildedRose(Items);

            //Act
            app.UpdateQuality();

            //Assert
            Assert.Equal(expectedSellIn, Items[0].SellIn);
            Assert.Equal(expectedQuality, Items[0].Quality);
        }

        [Theory]
        #region Aged
        [InlineData(SpecialItemNames.AGED, 0, -1, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.AGED, 0, -2, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.AGED, 0, -3, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.AGED, 0, -4, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.AGED, 0, -5, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.AGED, 0, 51, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.AGED, 0, 52, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.AGED, 0, 53, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.AGED, 0, 54, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        #endregion

        #region Backstage
        [InlineData(SpecialItemNames.BACKSTAGE, 0, -1, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, -2, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, -3, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, -4, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, -5, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, 51, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, 52, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, 53, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.BACKSTAGE, 0, 54, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        #endregion

        #region Sulfuras
        [InlineData(SpecialItemNames.SULFURAS, 0, -1, Message.ERROR_EXCEED_SULFURAS_STANDARD_LIMIT)]
        [InlineData(SpecialItemNames.SULFURAS, 0, -2, Message.ERROR_EXCEED_SULFURAS_STANDARD_LIMIT)]
        [InlineData(SpecialItemNames.SULFURAS, 0, -3, Message.ERROR_EXCEED_SULFURAS_STANDARD_LIMIT)]
        [InlineData(SpecialItemNames.SULFURAS, 0, -4, Message.ERROR_EXCEED_SULFURAS_STANDARD_LIMIT)]
        [InlineData(SpecialItemNames.SULFURAS, 0, -5, Message.ERROR_EXCEED_SULFURAS_STANDARD_LIMIT)]
        [InlineData(SpecialItemNames.SULFURAS, 0, 51, Message.ERROR_EXCEED_SULFURAS_STANDARD_LIMIT)]
        [InlineData(SpecialItemNames.SULFURAS, 0, 52, Message.ERROR_EXCEED_SULFURAS_STANDARD_LIMIT)]
        [InlineData(SpecialItemNames.SULFURAS, 0, 53, Message.ERROR_EXCEED_SULFURAS_STANDARD_LIMIT)]
        [InlineData(SpecialItemNames.SULFURAS, 0, 54, Message.ERROR_EXCEED_SULFURAS_STANDARD_LIMIT)]
        #endregion

        #region Conjured
        [InlineData(SpecialItemNames.CONJURED, 0, -1, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.CONJURED, 0, -2, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.CONJURED, 0, -3, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.CONJURED, 0, -4, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.CONJURED, 0, -5, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.CONJURED, 0, 51, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.CONJURED, 0, 52, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.CONJURED, 0, 53, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData(SpecialItemNames.CONJURED, 0, 54, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        #endregion

        #region Normal
        [InlineData("Normal Me", 0, -1, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData("Normal Me", 0, -2, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData("Normal Me", 0, -3, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData("Normal Me", 0, -4, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData("Normal Me", 0, -5, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData("Normal Me", 0, 51, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData("Normal Me", 0, 52, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData("Normal Me", 0, 53, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        [InlineData("Normal Me", 0, 54, Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT)]
        #endregion
        public void InvalidData_Quality_Test(string name, int sellIn, int quality, string expectedErrorMessage)
        {
            string errroMessage = string.Empty;
            try
            {
                //Arrange
                IList<Item> Items = new List<Item> { new Item { Name = name, SellIn = sellIn, Quality = quality } };
                GildedRose app = new GildedRose(Items);

                //Act
                app.UpdateQuality();
            }
            catch(Exception ex) 
            {
                errroMessage = ex.Message;
            }
            Assert.Equal(expectedErrorMessage, errroMessage);
        }

        [Theory]
        [InlineData("", 0, 0, "The Name field is required.")]
        [InlineData("", 0, 1, "The Name field is required.")]
        [InlineData("", 0, 10, "The Name field is required.")]
        [InlineData("", 0, 20, "The Name field is required.")]
        [InlineData("", 0, 30, "The Name field is required.")]
        [InlineData("", 0, 40, "The Name field is required.")]
        [InlineData("", 0, 50, "The Name field is required.")]
        [InlineData("", 1, 1, "The Name field is required.")]
        [InlineData("", 10, 10, "The Name field is required.")]
        [InlineData("", 20, 20, "The Name field is required.")]
        [InlineData("", 30, 30, "The Name field is required.")]
        [InlineData("", 40, 40, "The Name field is required.")]
        [InlineData("", 50, 50, "The Name field is required.")]

        public void InvalidData_Name_Test(string name, int sellIn, int quality, string expectedErrorMessage)
        {
            string errroMessage = string.Empty;
            try
            {
                //Arrange
                IList<Item> Items = new List<Item> { new Item { Name = name, SellIn = sellIn, Quality = quality } };
                GildedRose app = new GildedRose(Items);

                //Act
                app.UpdateQuality();
            }
            catch (Exception ex)
            {
                errroMessage = ex.Message;
            }
            Assert.Equal(expectedErrorMessage, errroMessage);
        }
    }
}
