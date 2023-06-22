using GildedRoseKata.Constants;
using System;
using System.Collections.Generic;

namespace GildedRoseKata
{
    public class GildedRose
    {
        public readonly IList<Item> _items;
        public GildedRose(IList<Item> items)
        {
            _items = items;
        }

        private void UpdateForAged(Item item)
        {
            item.SellIn--;

            if (item.Quality < QualityLimit.MAX_LIMIT)
                item.Quality++;

            if (item.SellIn < Default.ZERO && item.Quality < QualityLimit.MAX_LIMIT)
                item.Quality++;
        }

        private void UpdateForBackStage(Item item)
        {
            if (item.Quality < QualityLimit.MAX_LIMIT)
                item.Quality++;

            //Do less if SellIn is less than 10 Days
            if (item.SellIn <= Default.TEN_DAYS && item.Quality < QualityLimit.MAX_LIMIT)
                    item.Quality++;

            //Do less if SellIn is less than 5 Days
            if (item.SellIn <= Default.FIVE_DAYS && item.Quality < QualityLimit.MAX_LIMIT)
                item.Quality++;

            item.SellIn--;

            if (item.SellIn < Default.ZERO)
                item.Quality = QualityLimit.MIN_LIMIT;
        }

        private void UpdateForNormal(Item item)
        {
            UpdateItemByDegradeCount(item, Default.DEGRADE_VALUE_TO_ONE);
        }

        private void UpdateConjured(Item item)
        {
            UpdateItemByDegradeCount(item, Default.DEGRADE_VALUE_TO_TWO);
        }

        private void UpdateItemByDegradeCount(Item item, int degradeCount)
        {
            item.SellIn--;

            if (item.Quality > QualityLimit.MIN_LIMIT)
                item.Quality = GetDegradedQuality(item.Quality, degradeCount);

            if (item.SellIn < Default.ZERO && item.Quality > QualityLimit.MIN_LIMIT)
                item.Quality = GetDegradedQuality(item.Quality, degradeCount);
        }

        private int GetDegradedQuality(int oldQuality, int degradeCount)
        {
            var diff = oldQuality - degradeCount;
            return diff > QualityLimit.MIN_LIMIT ? diff : QualityLimit.MIN_LIMIT;
        }

        public void UpdateQuality()
        {
            foreach(var item in _items)
            {
                if (item.Quality < QualityLimit.MIN_LIMIT || item.Quality > QualityLimit.MAX_LIMIT)
                {                    
                    if(item.Name == SpecialItemNames.SULFURAS && item.Quality != QualityLimit.SULFURAS_STANDARD)
                        throw new Exception(ErrorMessage.EXCEED_SULFURAS_STANDARD_LIMIT);

                    throw new Exception(ErrorMessage.EXCEED_NORMAL_QUALITY_LIMIT);
                }

                switch(item.Name)
                {
                    case SpecialItemNames.AGED:
                        UpdateForAged(item);
                        continue;
                    case SpecialItemNames.BACKSTAGE:
                        UpdateForBackStage(item);
                        continue;
                    case SpecialItemNames.SULFURAS: /* Sulfuras sellIn and quality never change */
                        continue;
                    case SpecialItemNames.CONJURED:
                        UpdateConjured(item);
                        continue;
                    default:
                        UpdateForNormal(item);
                        continue;
                }
            }
        }
    }
}
