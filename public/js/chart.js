var ctx = document.querySelector("#content #myChart");
Chart.defaults.global.defaultFontFamily = "'DroidArabicKufiRegular'"

var data = {
    labels : ["100", "150", "300", "450", "600"],
    datasets : [
        {
            label : "الطلبات",
            data : [100, 200, 50, 300, 400],
            backgroundColor : "#a6d6fc",
            borderColor : "#48beff",
            fill : true,
            lineTension : 0.4,
            pointRadius : 2.5
        },
        {
            label : "الميعات",
            data : [200, 350, 400, 600, 500],
            backgroundColor : "#60efb5",
            borderColor : "#29dfb5",
            borderWidth: 1,
            fill : true,
            lineTension : 0.4,
            pointRadius : 2.5
        }
    ]
};

var options = {
    title : {
        display : false,
        position : "top",
        text : "Line Graph",
        fontSize : 18,
        fontColor : "#111"
    },
    legend : {
        display : true,
        position : "bottom",
        
    }
};

var chart = new Chart( ctx, {
    type : "line",
    data : data,
    options : options
} );
