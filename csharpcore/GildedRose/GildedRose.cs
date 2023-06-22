using System.Collections.Generic;

namespace GildedRoseKata
{
    public class GildedRose
    {
        public class SpecialItemNames
        {
            public const string AGED = "Aged Brie";
            public const string BACKSTAGE = "Backstage passes to a TAFKAL80ETC concert";
            public const string SULFURAS = "Sulfuras, Hand of Ragnaros";
        }

        IList<Item> Items;
        public GildedRose(IList<Item> Items)
        {
            this.Items = Items;
        }

        public void UpdateForAged(Item item)
        {
            if (item.Quality < 50)
            {
                item.Quality = item.Quality + 1;
            }

            if (item.Name != "Sulfuras, Hand of Ragnaros")
            {
                item.SellIn = item.SellIn - 1;
            }

            if (item.SellIn < 0 && item.Quality < 50)
            {
                item.Quality = item.Quality + 1;
            }
        }

        public void UpdateForBackStage(Item item)
        {
            if (item.Quality < 50)
            {
                item.Quality = item.Quality + 1;

                if (item.Name == "Backstage passes to a TAFKAL80ETC concert")
                {
                    if (item.SellIn < 11 && item.Quality < 50)
                    {
                        item.Quality = item.Quality + 1;
                    }

                    if (item.SellIn < 6 && item.Quality < 50)
                    {
                        item.Quality = item.Quality + 1;
                    }
                }
            }

            if (item.Name != "Sulfuras, Hand of Ragnaros")
            {
                item.SellIn = item.SellIn - 1;
            }

            if (item.SellIn < 0 && item.Name != "Aged Brie")
            {
                item.Quality = item.Quality - item.Quality;
            }
        }
        public void UpdateForSulfuras(Item item)
        {
        }
        public void UpdateForNormal(Item item)
        {
            if (item.Quality > 0)
            {
                item.Quality = item.Quality - 1;
            }

            if (item.Name != "Sulfuras, Hand of Ragnaros")
            {
                item.SellIn = item.SellIn - 1;
            }

            if (item.SellIn < 0 && item.Quality > 0)
            {
                item.Quality = item.Quality - 1;
            }
        }

        public void UpdateQuality()
        {
            foreach(var item in Items)
            {
                switch(item.Name)
                {
                    case SpecialItemNames.AGED:
                        UpdateForAged(item);
                        continue;
                    case SpecialItemNames.BACKSTAGE:
                        UpdateForBackStage(item);
                        continue;
                    case SpecialItemNames.SULFURAS:
                        UpdateForSulfuras(item);
                        continue;
                    default:
                        UpdateForNormal(item);
                        continue;
                }
            }
        }
    }
}
