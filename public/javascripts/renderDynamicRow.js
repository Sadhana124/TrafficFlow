/**
 * Created by SadhanaRamachandran on 4/12/16.
 */

var rowNum = 0;
function addRow(frm) {
    rowNum ++;
    var row =
        '<div class="form-group row"> ' +
            '<div class = "col-xs-3"> ' +

        '<select id="row' + rowNum + '">' +
        '<% for(i=0 ; i<availableAttributes.length; i++) { %>' +
        '<option value=<%= availableAttributes[i]%>><%= availableAttributes[i]%></option>' +
        '<% } %>  </select>' +
'</div> ' +
        '<div class = "col-xs-3"> ' +
        '<select name="op-1" class = "form-control"> ' +
        '<% for(var i=0; i<conditions.length; i++) { %>' +

 '<option value=<%= conditions[i]%>><%= conditions[i]%></option>' +
            '<% } %>' +
'</select> ' +
        '</div> ' +
        '<div class = "col-xs-3"> ' +
        '<input type="text" class="form-control" name="condValue-1"> ' +
        '</div> ' +
        '<div class = "col-xs-3"> ' +
        '<select name="combiner-1" class = "form-control">' +
        '<option value="AND">AND</option> ' +
        '<option value="OR">OR</option> ' +
        '</select> ' +
        '</div>' +
'</div>';


    var row2 = '<div class="form-group row"><div class = "col-xs-3"><select name=“condAttr-1" class = "form-control"><% for(var i=0; i<availableAttributes.length; i++) { %><option value=<%= availableAttributes[i]%>><%= availableAttributes[i]%></option><% } %></select></div><div class = "col-xs-3"><select name="op-1" class = "form-control"><% for(var i=0; i<conditions.length; i++) { %><option value=<%= conditions[i]%>><%= conditions[i]%></option><% } %></select></div><div class = "col-xs-3"><input type="text" class="form-control" name="condValue-1" data-bind="value: toTime"></div><div class = "col-xs-3"><select name="combiner-1" class = "form-control"><option value="AND">AND</option><option value=“OR">OR</option></select></div></div>';



    jQuery('#formContainer').append(row2);
    //frm.add_qty.value = '';
    //frm.add_name.value = '';
}

/*$( '#target' ).submit(function( event ) {
    alert( "Handler for .submit() called." );
    event.preventDefault();
    return false;
});*/

/*$('#form_id').on('submit', function(e){
    e.preventDefault();
    $.ajax({
        type: 'POST',
        url: "/test",
        data: $(this).serialize(),
        success: function() {
            alert('success');
        }
    });
    return false;
});*/



function sendFormData(data) {

    var query = {}
    //document.write("reached js handler");
    //document.write(data);
    //alert("hi");
    var x = document.getElementById("formContainer");

    var availableAttributes = ['Destination_ip', 'Destination_vn', 'Direction_ingress',
        'Destination_port', 'Protocol', 'Source_ip', 'Source_vn', 'Source_port', 'Sum_of_bytes', 'Sum_of_packets'];

    var from = document.getElementsByName("from")[0];
    query["from"] = from.value;
    var to = document.getElementsByName("to")[0];
    query["to"] = to.value;
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

//jsonpCallback: 'callback' - removed
        success: function (data) {
            var ret = jQuery.parseJSON(data);
            alert(ret);
            //$('#lblResponse').html(ret.msg);

            //table creation starts here
            /*var json = [Your JSON here],
                table = document.createElement('table');

            for(var i = 0, il = json.length; i < il; ++i) {
                //create row
                var row = document.createElement('tr'),
                    td;

                //create the id column
                td = document.createElement('td');
                td.appendChild(document.createTextNode(value.id));
                row.appendChild(td);

                //create name column
                td = document.createElement('td');
                td.appendChild(document.createTextNode(value.name));
                row.appendChild(td);

                //create last_name column
                td = document.createElement('td');
                td.appendChild(document.createTextNode(value.last_name));
                row.appendChild(td);

                table.appendChild(row);
            }

            document.body.appendChild(table);*/
        },
        error: function (xhr, status, error) {
            alert("error");
            //console.log('Error: ' + error.message);
            //$('#lblResponse').html('Error connecting to the server.');
        }
    });
}

/*var displayResult = function() {
    var self = this;
    this.result =

}

$(document).ready(function () {

    //ko.applyBindings(viewmodel);
    //ko.applyBindings(new ViewModel("Planet", "Earth"));
    ko.applyBindings(new displayResult());




});*/



