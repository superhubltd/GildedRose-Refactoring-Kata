using GildedRoseKata.Constants;

namespace GildedRoseKata.Strategies
{
    public abstract class ItemStrategyBase
    {
        public abstract void UpdateItem(Item item);
        public void UpdateItem(Item item, int degratedCount)
        {
            item.SellIn--;

            if (item.Quality > QualityLimit.MIN_LIMIT)
                item.Quality = GetDegradedQuality(item.Quality, degratedCount);

            if (item.SellIn < Default.ZERO && item.Quality > QualityLimit.MIN_LIMIT)
                item.Quality = GetDegradedQuality(item.Quality, degratedCount);
        }

        private int GetDegradedQuality(int oldQuality, int degradeCount)
        {
            var diff = oldQuality - degradeCount;
            return diff > QualityLimit.MIN_LIMIT ? diff : QualityLimit.MIN_LIMIT;
        }
    }

    public class BackStageItemStrategy : ItemStrategyBase
    {
        public override void UpdateItem(Item item)
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
    }

    public class AgedItemStrategy : ItemStrategyBase
    {
        public override void UpdateItem(Item item)
        {
            item.SellIn--;

            if (item.Quality < QualityLimit.MAX_LIMIT)
                item.Quality++;

            if (item.SellIn < Default.ZERO && item.Quality < QualityLimit.MAX_LIMIT)
                item.Quality++;
        }
    }

    public class NormalItemStrategy : ItemStrategyBase
    {
        public override void UpdateItem(Item item)
        {
            UpdateItem(item, Default.DEGRADE_VALUE_ONCE);
        }
    }

    public class ConjuredItemStrategy : ItemStrategyBase
    {
        public override void UpdateItem(Item item)
        {
            UpdateItem(item, Default.DEGRADE_VALUE_TWICE);
        }
    }
}
