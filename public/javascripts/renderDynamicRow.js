/**
 * Created by SadhanaRamachandran on 4/12/16.
 */

var availableAttributes = ['Destination_ip', 'Destination_vn', 'Direction_ingress',
    'Destination_port', 'Protocol', 'Source_ip', 'Source_vn', 'Source_port', 'Sum_of_bytes', 'Sum_of_packets'];


$(document).ready(function () {
    (document.getElementById("errorMsgDiv")).style.visibility = 'hidden';
});

function clearAllWhereConditions() {
    var myNode = document.getElementById("whereConds");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function validate() {

    $("#resultTable").remove();
    var ele = document.getElementById("errorLabel");

    var from = document.getElementsByName("from")[0];
    if (from.value == "") {
        (document.getElementById("errorMsgDiv")).style.visibility = 'visible';
        ele.innerHTML = "Please enter from timestamp and try again";
        return false;

    }

    var to = document.getElementsByName("to")[0];
    if (to.value == "") {
        (document.getElementById("errorMsgDiv")).style.visibility = 'visible';
        ele.innerHTML = "Please enter to timestamp and try again";
        return false;

    }

    var flag = false;
    for (var i = 0; i < availableAttributes.length; i++) {
        if (document.getElementById(availableAttributes[i]).checked == true) {
            flag = true;
            break;
        }
    }
    if (flag == false) {
        (document.getElementById("errorMsgDiv")).style.visibility = 'visible';
        ele.innerHTML = "Please select atleast one attribute to be dispalyed and try again";
        return false;
    }

    var i = 1;
    while (1) {
        var condValue = document.getElementById("condValue-" + i);
        if (condValue == null) {
            break;
        }
        if (condValue.value == "") {
            (document.getElementById("errorMsgDiv")).style.visibility = 'visible';
            ele.innerHTML = "Please input values for all conditions and try again";
            return false;
        }
        i++;
    }
    return true;
}



function sendFormData(data) {

    (document.getElementById("errorMsgDiv")).style.visibility = 'hidden';

    if (validate()) {
        var query = {}
        var x = document.getElementById("formContainer");

        var from = document.getElementsByName("from")[0];
        var datestring = from.value;
        var parts = datestring.match(/(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2})/);
        var dateEpo = Date.UTC(+parts[1], parts[2]-1, +parts[3], +parts[4], +parts[5]);
        query["from"] = dateEpo;
        var to = document.getElementsByName("to")[0];
        datestring = to.value;
        parts = datestring.match(/(\d{4})\/(\d{2})\/(\d{2}) (\d{2}):(\d{2})/);
        dateEpo = Date.UTC(+parts[1], parts[2]-1, +parts[3], +parts[4], +parts[5]);
        query["to"] = dateEpo;
        var selectedAttrs = [];
        for (var i=0; i<availableAttributes.length; i++) {
            if (document.getElementById(availableAttributes[i]).checked == true) {
                selectedAttrs.push(document.getElementById(availableAttributes[i]).id);
            }
        }
        query["selectedAttr"] = selectedAttrs;

        var whereClauses = []
        var i=1;
        while (1) {
            var whereClause = {}
            var condAttr = document.getElementById("condAttr-"+i);
            if (condAttr == null) {
                break;
            }
            whereClause["condAttr"] = condAttr.value;
            var op = document.getElementById("op-"+i);
            whereClause["op"] = op.value;
            var condValue = document.getElementById("condValue-"+i);
            whereClause["condValue"] = condValue.value;
            var combiner = document.getElementById("combiner-"+i);
            whereClause["combiner"] = combiner.value;

            whereClauses.push(whereClause);
            i++;
        }

        query["whereConditions"] = whereClauses;


        $.ajax({
            type: 'POST', // added,
            url: '/query',
            data: query,
            success: function (data) {



                var ret = jQuery.parseJSON(data);
                if (data == "[]") {
                    $("#resultTable").remove();
                    var ele = document.getElementById("errorLabel");
                    (document.getElementById("errorMsgDiv")).style.visibility = 'visible';
                    ele.innerHTML = "The query you constructed returned no rows.";
                }

                $("#resultTable").remove();


                //table creation starts here

                var json = ret,
                    table = document.createElement('table');
                table.id = "resultTable";
                table.className = "table table-bordered";

                /*var thead = document.createElement('thead');
                 var theadE = document.createElement('/thead');
                 var tbody = document.createElement(body>");
                 var tbodyE = document.createElement("</body>");*/

                //table.appendChild(thead);

                var headerRow = document.createElement('tr');
                var th;
                for (var key in json[0]) {
                    th = document.createElement('th');
                    th.appendChild(document.createTextNode(key));
                    headerRow.appendChild(th);
                }

                table.appendChild(headerRow);
                //table.appendChild(theadE);
                //table.appendChild(tbody);

                for(var i = 0, il = json.length; i < il; ++i) {
                    //create row
                    var row = document.createElement('tr'),
                        td;

                    for (var key in json[i]) {
                        td = document.createElement('td');
                        td.appendChild(document.createTextNode(json[i][key]));
                        row.appendChild(td);
                    }

                    table.appendChild(row);
                }
                //table.appendChild(tbodyE);

                document.body.appendChild(table);

            },
            error: function (xhr, status, error) {
                $("#resultTable").remove();
                var ele = document.getElementById("errorLabel");
                (document.getElementById("errorMsgDiv")).style.visibility = 'visible';
                ele.innerHTML = "The query you constructed is invalid. Please try again";
            }
        });
    }
}

