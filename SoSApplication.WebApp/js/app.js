$(function () {
    'use strict';
    //read and load json-file
    var jsonData = $.getJSON('data/data2.json', function (data) {
        //variable for incrementing the radio button's name
        var i = 0;
        $.each(data, function (index, area) {
            $.each($(this), function (index, subarea) {
                var obj = area.subarea;
                var objTitle = area.title;

                $('#behovsbedomningTable').find('tbody').append('<tr class="area"><td class="areaTd">' + objTitle + '</td></tr>');
                //if variable i is the same value so increment by 1
                if (i == i) {
                    i++;
                }
                //console.log(i);
                //loop through every object and check whether the obj has specified prop
                for (var prop in obj) if (obj.hasOwnProperty(prop)) {
                    var value = obj[prop];
                    var valuesBedomning = value.values_bedomning;
                    //if variable i is the same value so increment by 1 again
                    if (i == i) {
                        i++;
                    }
                    //console.log(i);
                    //attach subarea objects to the table
                    $('#behovsbedomningTable').find('tbody')
                        .append('<tr class="item"><td id="subarea_' + i + '">' + value.title + '</td>'
                            + '<td class="behovsbedomningTd">' + '<input checked type="radio" name="radio' + i + '" id="inget_' + valuesBedomning[0] + '" value="' + valuesBedomning[0] + '">' + '</td>'
                            + '<td class="behovsbedomningTd">' + '<input type="radio" name="radio' + i + '" id="litet_' + valuesBedomning[1] + '" value="' + valuesBedomning[1] + '">' + '</td>'
                            + '<td class="behovsbedomningTd">' + '<input type="radio" name="radio' + i + '" id="stort_' + valuesBedomning[2] + '" value="' + valuesBedomning[2] + '">' + '</td></tr>');
                };
            });
        });
    });

    var chosenSubareas = [];
    var sortedChosenSubareas = [];
    var finalChosenSubareas = [];
    var finalChosenSubAreas_And_totalValue = [];
    var sorted_finalChosenSubAreas_And_totalValue = [];

    $("#btn_submitChosenSubareas").click(function (e) {
        e.preventDefault();
        $('.nav-pills a[href="#2b"]').tab('show');
        deleteChosenSubareaRows();
        addChosenSubareas();
        createPrioriteringsTable();
    });

    function deleteChosenSubareaRows() {
        chosenSubareas.length = 0;
        $("#prioriteringsTable td").parent().remove();
    }

    function addChosenSubareas() {
        var area = $('tr.area');
        $('tr.item').each(function () {
            var td = $(this).closest('tr').find('td:first');
            var tdArea = $(this).prevAll('tr.area:first').find('td:first');
            var obj = { title: "text", value: "0", area: "area" };
            obj.area = tdArea[0].innerText;
            obj.title = td[0].innerText;
            obj.value = $(this).closest('tr').find($('input[type=radio]:checked')).val();
            if (obj.value == 1 || obj.value == 2) {
                chosenSubareas.push(obj);
            }
        });
        //function for sorting chosen object array by value
        var sortByValue = function (array) {
            return _.sortBy(array, 'value').reverse();
        }
        sortedChosenSubareas = sortByValue(chosenSubareas);
        //console.log(sortedChosenSubareas);
        return sortedChosenSubareas;
    }

    function createPrioriteringsTable() {
        for (var i = 0; i < sortedChosenSubareas.length; i++) {
            var tr = document.createElement("tr");
            tr.setAttribute("class", "prioriteringsTableTr");
            var td = document.createElement("td");
            td.setAttribute("class", "prioriteringsTableTdTitle");
            var td2 = document.createElement("td");
            td2.setAttribute("class", "prioriteringsTableTd");
            var td3 = document.createElement("td");
            td3.setAttribute("class", "prioriteringsTableTd");
            var td4 = document.createElement("td");
            td4.setAttribute("class", "prioriteringsTableTd");

            var name = (i);

            td2.innerHTML = '<input class="konsekvensgradValue" checked type="radio" name="konsekvensgrad' + name + '" value="0" /> Oklart <br/>'
                + '<input class="konsekvensgradValue" type="radio" name="konsekvensgrad' + name + '" value="1" /> Mindre allvarliga <br/>'
                + '<input class="konsekvensgradValue" type="radio" name="konsekvensgrad' + name + '"  value="2" /> Ganska allvarliga <br/>'
                + '<input class="konsekvensgradValue" type="radio" name="konsekvensgrad' + name + '" value="3" /> Allvarliga';
            td3.innerHTML = '<input class="andelklientergradValue" checked type="radio" name="andelklientergrad' + name + '" value="0" /> Oklart <br/>'
               + '<input class="andelklientergradValue" type="radio" name="andelklientergrad' + name + '"  value="1" /> Liten andel <br/>'
               + '<input class="andelklientergradValue" type="radio" name="andelklientergrad' + name + '" value="2" /> Ganska stor andel <br/>'
               + '<input class="andelklientergradValue" type="radio" name="andelklientergrad' + name + '" value="3" /> Stor andel';
            td4.innerHTML = '<textarea class="form-control animated" id="comment"/>'

            td.innerHTML += sortedChosenSubareas[i].title;

            $('#prioriteringsTable').find('tbody').append(tr);
            tr.appendChild(td);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);            
            $('#prioriteringsTable').find('tbody').append(tr);
        }
    }

    $('#btn_submitGradedSubareas').click(function (e) {
        //variable used as counter when looping over table values
        var i = 0;
        // clear the finalChosenSubareas array
        finalChosenSubareas.length = 0;
        //loop through the table rows in prioteringsTable
        $('.prioriteringsTableTr').each(function () {
            var subarea = {
                subarea: sortedChosenSubareas[i],
                konsekvensValue: "0",
                andelklienterValue: "0",
                kommentar: "text"
            };
            //assign the subarea values and add to the finalChosenSubareas array            
            subarea.subarea = sortedChosenSubareas[i];
            subarea.konsekvensValue = $(this).closest('tr').find($('input[class = konsekvensgradValue]:checked')).val();
            subarea.andelklienterValue = $(this).closest('tr').find($('input[class = andelklientergradValue]:checked')).val();
            subarea.kommentar = $(this).find($('textarea')).val();
            finalChosenSubareas.push(subarea);
            i++;
        });
        //get all the finaly chosen subareas together with their total values
        finalChosenSubAreas_And_totalValue = getFinalChosenSubareasWithTotalValues(finalChosenSubareas);
        alert("Prioritering av delområde submitted!")

        //function for sorting chosen object array by the total value gathered
        var sortByValue = function (array) {
            return _.sortBy(array, 'totalValue').reverse();
        }
        sorted_finalChosenSubAreas_And_totalValue = sortByValue(finalChosenSubAreas_And_totalValue);

        //var dataJSON = JSON.stringify(sorted_finalChosenSubAreas_And_totalValue, null, '\t');
        var json = sorted_finalChosenSubAreas_And_totalValue;
        var j = 1;

        p5.prototype.saveJSON(json, 'data.json');

        //show the finally chosen subareas and their total values
        var url = 'data:text/json;charset=utf8,' + encodeURIComponent(JSON.stringify(sorted_finalChosenSubAreas_And_totalValue, null, '\t'));
        //var url = 'localhost:text/54333/data/submittedData/data.json,' + encodeURIComponent(JSON.stringify(sorted_finalChosenSubAreas_And_totalValue, null, '\t'));
        window.open(url, '_blank');
        window.focus();
    });

    function getFinalChosenSubareasWithTotalValues(subareaArray) {
        //finalChosenSubareas = subareaArray;
        var value_bedomning = 0;
        var value_gradKonsekvens = 0;
        var value_gradAndelKlienter = 0;

        //clear finalChosenSubAreas_And_TotalValue array
        finalChosenSubAreas_And_totalValue.length = 0;

        //loop through the final chosen subareas and get the new values of the cheked:radios
        for (var i = 0; i < finalChosenSubareas.length; i++) {
            value_bedomning = finalChosenSubareas[i].subarea.value;
            value_gradKonsekvens = finalChosenSubareas[i].konsekvensValue;
            value_gradAndelKlienter = finalChosenSubareas[i].andelklienterValue;

            //add all gathered values
            var finalChosenSubarea_totalValue = 0;
            finalChosenSubarea_totalValue = parseInt(value_bedomning, 10)
                + parseInt(value_gradKonsekvens, 10)
                + parseInt(value_gradAndelKlienter, 10);
            //console.log("Subarea: " + finalChosenSubareas[i].obj.text + " Total value gathered: " + finalChosenSubarea_totalValue);

            //assign to object and push to the finalChosenSubArea_And_totalValue array
            var chosenSubarea_And_TotalValue = { subarea: finalChosenSubareas[i], totalValue: finalChosenSubarea_totalValue };
            chosenSubarea_And_TotalValue.subarea = finalChosenSubareas[i];
            chosenSubarea_And_TotalValue.totalValue = finalChosenSubarea_totalValue;
            finalChosenSubAreas_And_totalValue.push(chosenSubarea_And_TotalValue);
        }
        return finalChosenSubAreas_And_totalValue;
    }

    function setup() {
        //new json object
        var jsonData = sorted_finalChosenSubAreas_And_totalValue;
        saveJSONObject(json, 'data/submittedData/data.json');
    }
    
});