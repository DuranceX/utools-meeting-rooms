window.onload = function(){
    window.utools.onPluginEnter((({
        code: e,
        type: t,
        payload: n
    }) => {
    if ("meeting_list" === e){
        parent = document.getElementById("holder");
    }
    else if("meeting_number" === e){
        go_meeting(n);
    }
    else {
        if ("meeting_enter" === e){
            data = utools.dbStorage.getItem("data")==null?[]:utools.dbStorage.getItem("data");
            var flag = false;
            for(var i=0;i<data.length;i++){
                if(data[i].name == n){
                    go_meeting(data[i].code);
                    flag = true;
                    break;
                }
            }
            if(!flag){
                utools.showNotification("没有找到该会议");
                parent = document.getElementById("holder");
            }
        }
    }
    }))
}

function go_meeting(meeting_code) {
    if (meeting_code != null) {
        let code = meeting_code.replace(/[\s,\-]/g, "");
        console.log("wemeet://page/inmeeting?meeting_code=" + code);
        utools.shellOpenExternal("wemeet://page/inmeeting?meeting_code=" + code)
        window.utools.hideMainWindow();
        window.utools.outPlugin();
    }
}