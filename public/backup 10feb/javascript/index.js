

var validateUserDetails = () => {
    var udata = {};
    udata.userId = $("#userId").val();
    udata.userPwd = $("#userPwd").val();
    console.log(udata);
    $.ajax({
        url:'http://localhost:422/validate/loginDetails',
        method: 'GET',
        dataType: 'JSON',
        data: udata,
        success: (response) => {
            console.log(response);
        },
        error: (error) => {

        } 
    });
}