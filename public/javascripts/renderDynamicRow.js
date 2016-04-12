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

$('#form_id').on('submit', function(e){
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
});



function sendFormData(data) {
    //document.write("reached js handler");
    //document.write(data);
    alert("hi");
    /*var x = document.getElementById("formContainer");

    var availableAttributes = ['Destination ip', 'Destination vn', 'Direction ingress',
        'Destination port', 'Protocol', 'Source ip', 'Source vn', 'Source port', 'Sum of bytes', 'Sum of packets'];

    var from = document.getElementsByName("from");
    var to = document.getElementsByName("to");
    var selectedAttrs = [];
    for (var i=0; i<availableAttributes.length; i++) {
        selectedAttrs.push(document.getElementsByName(availableAttributes[i]));
    }*/

    $('#form_id').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/test",
            data: $(this).serialize(),
            success: function() {
                alert('success');
            }
        });
    });

    /*$.ajax({
        type: 'POST', // added,
        url: '/test',
        data: '{"data": "TEST"}',
//dataType: 'jsonp' - removed
//jsonpCallback: 'callback' - removed
        success: function (data) {
            var ret = jQuery.parseJSON(data);
            alert(ret);
            //$('#lblResponse').html(ret.msg);
        },
        error: function (xhr, status, error) {
            alert("error");
            //console.log('Error: ' + error.message);
            //$('#lblResponse').html('Error connecting to the server.');
        }
    });*/
}



