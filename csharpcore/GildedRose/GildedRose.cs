using GildedRoseKata.Constants;
using GildedRoseKata.Strategies;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace GildedRoseKata
{
    public class GildedRose
    {
        public readonly IList<Item> _items;
        public Dictionary<string, ItemStrategyBase> _itemStrategies;

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
        }

        public void UpdateQuality()
        {
            foreach(var item in _items)
            {
                var results = new List<ValidationResult>();
                var context = new ValidationContext(item);
                var isValid = Validator.TryValidateObject(item, context, results, true);

                if (!isValid)
                    throw new Exception(results.First().ErrorMessage);

                var strategy = _itemStrategies.GetValueOrDefault(item.Name, new NormalItemStrategy());
                if (strategy != null)
                    strategy.UpdateItem(item);
            }
        }
    }
}
