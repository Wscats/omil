document.onmousedown = function (event) {
    var event = event || window.event
    if (event.button == "2") {
        //这里做处理
        console.log("点解鼠标右键",event)
        event.returnValue = false;
    };
} 