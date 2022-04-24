var validateUserDetails = () => {
    var udata = {};
    udata.userId = $("#userId").val();
    udata.userPwd = $("#userPwd").val();
    $(".loginError").hide();
    $.ajax({
        url:'http://localhost:422/validate/loginDetails',
        method: 'POST',
        dataType: 'JSON',
        data: udata,
        success: (response) => {
            console.log(response);
            if (response.status == 'valid') {
                loadPage('productDetails');
            }else{
                $(".loginError").show().html("<b>invalid credential plz renter</b>")
            }
        },
        error: (error) => {

        } 
    });
}

var loadPage = (type) => {
    var templateUrl = '';
    switch(type) {
        case 'login': 
        templateUrl = '/templates/login.htm';
        break;
        case 'fgpwd': 
        templateUrl = '/templates/forgotpwd.htm';
        break;
        case 'newsignup': 
        templateUrl = '/templates/newSignup.htm';
        break;
        case 'productDetails': 
        templateUrl = '/templates/productDetails.htm';
        break;
    }
    loadPageTemplate(templateUrl);
}

var loadPageTemplate = (templateUrl) => {
    $.ajax({
        url: templateUrl,
        method: 'GET',
        success: (templateResponse) => {
            $("main").html(templateResponse);
        }
    });
}

loadPage('login');