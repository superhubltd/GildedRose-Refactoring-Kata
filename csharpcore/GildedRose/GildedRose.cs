using GildedRoseKata.Constants;
using GildedRoseKata.Strategies;
using System;
using System.Collections.Generic;

namespace GildedRoseKata
{
    public class GildedRose
    {
        public readonly IList<Item> _items;
        public Dictionary<string, ItemStrategyBase> _itemStrategies;
        public Dictionary<string, ValidationStrategyBase> _valStrategies;

        public GildedRose(IList<Item> items)
        {
            _items = items;
            _itemStrategies = new Dictionary<string, ItemStrategyBase>
            {
                { SpecialItemNames.BACKSTAGE, new BackStageItemStrategy() },
                { SpecialItemNames.AGED, new AgedItemStrategy() },
                { SpecialItemNames.CONJURED, new ConjuredItemStrategy() },
                { SpecialItemNames.SULFURAS, null },
            };
            _valStrategies = new Dictionary<string, ValidationStrategyBase>
            {
                { SpecialItemNames.SULFURAS, new SulfurasValidationStrategy() }
            };
        }

        public void UpdateQuality()
        {
            foreach(var item in _items)
            {
                var validation = _valStrategies.GetValueOrDefault(item.Name, new DefaultValidationStrategy());
                if (!validation.IsValid(item))
                    throw new Exception(validation.Error);

                var strategy = _itemStrategies.GetValueOrDefault(item.Name, new NormalItemStrategy());
                if (strategy != null)
                    strategy.UpdateItem(item);
            }
        }
    }
}
