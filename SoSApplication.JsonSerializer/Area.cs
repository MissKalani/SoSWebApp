using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoSApplication.JsonSerializer
{
    public class Area
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<Subarea> Subarea { get; set; }
    }

    public class Subarea
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int[] Values_bedomning { get; set; }
        public int[] Values_konsekvens { get; set; }
        public int[] Values_andelklienter { get; set; }

    }
}
