$(function () {
    'use strict'; 

    //read and load json-file
    var jsonData = $.getJSON('data/data1.json', function (data) {
        $.each(data, function (index, area) {
            $.each($(this), function (index, subarea) {
                var obj = area.subarea;
                //variable for incrementing the radio button's name
                var i = 0;
                //loop through every object and check whether the obj has specified prop
                for (var prop in obj) if (obj.hasOwnProperty(prop)) {
                    var value = obj[prop];
                    var valuesBedomning = value.values_bedomning;
                    //if variable i is the same value so increment by 1
                    if (i == i) {
                        i++;
                    }
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
    var prioriteringstable = document.getElementById("prioriteringsTable");

    $("#submit_btn").click(function (e) {
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

        $('tr.item').each(function () {

            var td = $(this).closest('tr').find('td:first');
            var obj = { text: "text", value: "0" };
            obj.text = td[0].innerText;
            obj.value = $(this).closest('tr').find($('input[type=radio]:checked')).val();
            if (obj.value == 1 || obj.value == 2) {
                chosenSubareas.push(obj);
                //console.log(obj);
            }
            //console.log(chosenSubareas);
        });
        //sort chosen object array by value
        var sortByValue = function (array) {
            return _.sortBy(array, 'value').reverse();
        }

        sortedChosenSubareas = sortByValue(chosenSubareas);
        //alert(sortedChosenSubareas);
        return sortedChosenSubareas;
        console.log(sortedChosenSubareas);
    }

    function createPrioriteringsTable() {
        for (var i = 0; i < sortedChosenSubareas.length; i++) {
            var tr = document.createElement("tr");
            tr.setAttribute("class", "prioriteringsTableTr");
            var td = document.createElement("td");
            td.setAttribute("class", "prioriteringsTableTr");
            var td2 = document.createElement("td");
            td2.setAttribute("class", "prioriteringsTableTr");
            var td3 = document.createElement("td");
            td3.setAttribute("class", "prioriteringsTableTr");
            var td4 = document.createElement("td");
            td4.setAttribute("class", "prioriteringsTableTr");

            var name = (i + 1);

            td2.innerHTML = '<input checked type="radio" name="konsekvensgrad' + name + '" value="0" /> Oklart <br/>'
                + '<input type="radio" name="konsekvensgrad' + name + '" value="1" /> Mindre allvarliga <br/>'
                + '<input type="radio" name="konsekvensgrad' + name + '"  value="2" /> Ganska allvarliga <br/>'
                + '<input type="radio" name="konsekvensgrad' + name + '" value="3" /> Allvarliga';
            td3.innerHTML = '<input checked type="radio" name="andelklientergrad' + name + '" value="0" /> Oklart <br/>'
               + '<input type="radio" name="andelklientergrad' + name + '"  value="1" /> Liten andel <br/>'
               + '<input type="radio" name="andelklientergrad' + name + '" value="2" /> Ganska stor andel <br/>'
               + '<input type="radio" name="andelklientergrad' + name + '" value="3" /> Stor andel';
            td4.innerHTML = '<textarea class="form-control animated" id="comment"/>'

            td.innerHTML += '<label> ' + sortedChosenSubareas[i].text + '</label>';
            console.log(sortedChosenSubareas[i].text);
            tr.appendChild(td);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            prioriteringstable.appendChild(tr);

        }
    }

});