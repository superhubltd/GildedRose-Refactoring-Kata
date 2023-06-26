using GildedRoseKata.Constants;
using GildedRoseKata.Strategies;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GildedRoseKata.Validators
{
    public class QualityValidation : ValidationAttribute
    {
        private readonly Dictionary<string, IQualityValidationStrategy> _strategies;
        public QualityValidation()
        {
            _strategies = new Dictionary<string, IQualityValidationStrategy>
            {
                { SpecialItemNames.SULFURAS, new SulfurasQualityValidationStrategy() }
            };
        }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            int quality = int.Parse(value.ToString());;
            var item = validationContext.ObjectInstance as Item;
            var strategies = _strategies.GetValueOrDefault(item.Name, new DefaultQualityValidationStrategy());
            return strategies.Validate(quality);
        }
    }
}
