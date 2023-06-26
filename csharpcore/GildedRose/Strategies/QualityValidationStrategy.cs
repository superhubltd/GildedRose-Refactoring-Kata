using GildedRoseKata.Constants;
using System.ComponentModel.DataAnnotations;

namespace GildedRoseKata.Strategies
{
    public interface IQualityValidationStrategy
    {
        public ValidationResult Validate(int quality);
    }

    public class DefaultQualityValidationStrategy : IQualityValidationStrategy
    {
        public ValidationResult Validate(int quality)
        {
            if (quality >= QualityLimit.DEFAULT_MIN_LIMIT && quality <= QualityLimit.DEFAULT_MAX_LIMIT)
                return ValidationResult.Success;

            return new ValidationResult(Message.ERROR_EXCEED_NORMAL_QUALITY_LIMIT);
        }
    }

    public class SulfurasQualityValidationStrategy : IQualityValidationStrategy
    {
        public ValidationResult Validate(int quality)
        {
            if (quality == QualityLimit.SULFURAS_DEFAULT)
                return ValidationResult.Success;

            return new ValidationResult(Message.ERROR_EXCEED_SULFURAS_STANDARD_LIMIT);
        }
    }
}
