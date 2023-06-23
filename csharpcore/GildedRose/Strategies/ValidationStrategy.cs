using GildedRoseKata.Constants;

namespace GildedRoseKata.Strategies
{
    public abstract class ValidationStrategyBase
    {
        public string _error;

        public abstract bool IsValid(Item item);

        public string Error
        {
            get
            {
                return _error;
            }
        }
    }

    public class DefaultValidationStrategy : ValidationStrategyBase
    {
        public override bool IsValid(Item item)
        {
            if (item.Quality >= QualityLimit.MIN_LIMIT && item.Quality <= QualityLimit.MAX_LIMIT)
                return true;

            _error = ErrorMessage.EXCEED_NORMAL_QUALITY_LIMIT;
            return false;
        }
    }

    public class SulfurasValidationStrategy : ValidationStrategyBase
    {
        public override bool IsValid(Item item)
        {
            if (item.Quality >= QualityLimit.MIN_LIMIT && item.Quality <= QualityLimit.MAX_LIMIT)
                return true;

            _error = ErrorMessage.EXCEED_SULFURAS_STANDARD_LIMIT;
            return false;
        }
    }
}
