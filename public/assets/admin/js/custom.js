$(function () {
    
    $('#appointmentpost').on('click', function (e) {
        e.preventDefault()
    
        var patientId = $('#patientId').val();
        var doctorId = $('#doctorId').val()
        var advancedate = $('#advancedate').val()
        var pickedTime = $('#pickedTime').val()
        var obj = {
            patientId : patientId,
            doctorId : doctorId,
            advancedate: advancedate,
            pickedTime: pickedTime
        }
        $.ajax({
            type: "POST",
            url: "/appointmentcheck",
            data: obj,
            
            success: function (response) {
                if(response.status==200){
                    alert(response.message)
                }
            }
        });
        
    });
    
});


