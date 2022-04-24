var validateUserDetails = () => {
    var udata = {};
    udata.userId = $("#userId").val();
    udata.userPwd = $("#userPwd").val();
    $(".loginError").hide();
    $.ajax({
        url:'http://localhost:8222/validate/loginDetails',
        method: 'POST',
        dataType: 'JSON',
        data: udata,
        success: (response) => {
             console.log(response.status);
            if (response.status == 'Valid') {
                loadPage('productDetails');
            }else{
                $(".loginError").show().html("<b>invalid credential plz renter</b>");
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
    loadPageTemplate(templateUrl,type);
}

var loadPageTemplate = (templateUrl,type) => {
    $.ajax({
        url: templateUrl,
        method: 'GET',
        success: (templateResponse) => {
            $("main").html(templateResponse);
            if (type == 'productDetails'){
                loadProductDetailsToPage();
            }
        }
    });
}

var productTemplate;

var loadProductDetailsToPage = () => {
    $.ajax({
        url: 'templates/productData_tmplt.htm',
        method: 'GET',
        success: (res) => {
            //console.log("response");
            //console.log(res);
            productTemplate = Handlebars.compile(res);
            getProductDetails();
        }
    })
}

var getProductDetails = () => {
    $.ajax({
        url: '/get/productDetails',
        method: 'GET',
        dataType: 'JSON',
        success: (response) => {
            //console.log(response);
            response.productDataList.forEach(product => {
                $('.productDetailscontainer').append(productTemplate(product));
            }) 
        }
    });
}

loadPage('login');