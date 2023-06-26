using GildedRoseKata.Validators;
using System.ComponentModel.DataAnnotations;

namespace GildedRoseKata
{
    public class Item
    {
        [Required]
        public string Name { get; set; }
        public int SellIn { get; set; }
        [QualityValidation]
        public int Quality { get; set; }
    }
}
