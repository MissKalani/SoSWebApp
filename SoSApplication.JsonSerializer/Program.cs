using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SoSApplication.JsonSerializer
{
    class Program
    {
        static void Main(string[] args)
        {
            Area area1 = new Area();
            area1.Id = 1;
            area1.Title = "Bedömningsinstrument";

            Subarea bedomningsinstrument_subarea1 = new Subarea();
            bedomningsinstrument_subarea1.Id = 1;
            bedomningsinstrument_subarea1.Title = "Identifiering av alkohol- och narkotika problem";
            bedomningsinstrument_subarea1.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea1.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea1.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            Subarea bedomningsinstrument_subarea2 = new Subarea();
            bedomningsinstrument_subarea2.Id = 2;
            bedomningsinstrument_subarea2.Title = "Diagnostik av skadligt bruk, missbruk eller beroende";
            bedomningsinstrument_subarea2.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea2.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea2.Values_andelklienter = new int[] { 0, 1, 2, 3 };


            Subarea bedomningsinstrument_subarea3 = new Subarea();
            bedomningsinstrument_subarea3.Id = 3;
            bedomningsinstrument_subarea3.Title = "Bedömning av hjälpbehov";
            bedomningsinstrument_subarea3.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea3.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea3.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            List<Subarea> subareaList1 = new List<Subarea>();
            subareaList1.Add(bedomningsinstrument_subarea1);
            subareaList1.Add(bedomningsinstrument_subarea2);
            subareaList1.Add(bedomningsinstrument_subarea3);

            area1.Subarea = subareaList1;

            Area area2 = new Area();
            area2.Id = 2;
            area2.Title = "Medicinska test";

            Subarea bedomningsinstrument_subarea1_2 = new Subarea();
            bedomningsinstrument_subarea1_2.Id = 1;
            bedomningsinstrument_subarea1_2.Title = "Nyligt intag av alokohol";
            bedomningsinstrument_subarea1_2.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea1_2.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea1_2.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            Subarea bedomningsinstrument_subarea2_2 = new Subarea();
            bedomningsinstrument_subarea2_2.Id = 2;
            bedomningsinstrument_subarea2_2.Title = "Långvarigt högt intag av alkohol";
            bedomningsinstrument_subarea2_2.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea2_2.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea2_2.Values_andelklienter = new int[] { 0, 1, 2, 3 };


            Subarea bedomningsinstrument_subarea3_2 = new Subarea();
            bedomningsinstrument_subarea3_2.Id = 3;
            bedomningsinstrument_subarea3_2.Title = "Pågående eller nyligt intag av narkotika";
            bedomningsinstrument_subarea3_2.Values_bedomning = new int[] { 0, 1, 2 };
            bedomningsinstrument_subarea3_2.Values_konsekvens = new int[] { 0, 1, 2, 3 };
            bedomningsinstrument_subarea3_2.Values_andelklienter = new int[] { 0, 1, 2, 3 };

            List<Subarea> subareaList2 = new List<Subarea>();
            subareaList2.Add(bedomningsinstrument_subarea1_2);
            subareaList2.Add(bedomningsinstrument_subarea2_2);
            subareaList2.Add(bedomningsinstrument_subarea3_2);

            area2.Subarea = subareaList2;

            List<Area> areaList = new List<Area>();
            areaList.Add(area1);
            areaList.Add(area2);

            var settings = new JsonSerializerSettings();
            settings.ContractResolver = new LowercaseContractResolver();
            var json = JsonConvert.SerializeObject(areaList, Formatting.Indented, settings);
 

            File.WriteAllText(@"C:\dev\SoSStandardApplication\SoSApplication.JsonSerializer\json\data2.json", json);

        }
    }
}
