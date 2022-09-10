//var strData = localStorage.getItem("data");
//var strData = "";
var data = [];
var parent = null;
//var rev = utools.db.get("data")==null?null:utools.db.get("data")._rev;

window.onload = function(){
    window.utools.onPluginEnter((({
        code: e,
        type: t,
        payload: n
      }) => {
      if ("meeting_list" === e){
        parent = document.getElementById("holder");
        render();
      }
      else {
        if ("meeting_enter" === e){
            // data = JSON.parse(strData);
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
                render();
            }
        }
      }
    }))
}

function render(){
    clear();
    //strData = utools.db.get("data")==null?null:utools.db.get("data").data;
    // strData = utools.dbStorage.getItem("data")==null?null:utools.dbStorage.getItem("data");
    //strData = localStorage.getItem("data");
    data = utools.dbStorage.getItem("data")==null?[]:utools.dbStorage.getItem("data");
    if(data != null){
        //data = JSON.parse(strData);

        for(var i=0;i<data.length;i++){
            var temp = document.createElement("div");
            var tempInfo = document.createElement("p");
            var tempPsw = document.createElement("p");
            var otherButton = document.createElement("div");
            var tempButton = document.createElement("button");
            temp.className = "MeetingCard";
            tempInfo.className = "MeetingInfo";
            tempPsw.className = "MeetingPsw";
            tempButton.className = "MeetingButton";
            otherButton.className = "otherButton";
            otherButton.innerHTML = '<svg t="1662526568736" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1570" width="20" height="20"><path d="M800 256h-576a30.08 30.08 0 0 0-32 32 30.08 30.08 0 0 0 32 32H256v576a64 64 0 0 0 64 64h384a64 64 0 0 0 64-64V320h32a30.08 30.08 0 0 0 32-32 30.08 30.08 0 0 0-32-32zM448 799.36a33.28 33.28 0 0 1-64 0v-384a33.28 33.28 0 0 1 64 0z m192 0a33.28 33.28 0 0 1-64 0v-384a33.28 33.28 0 0 1 64 0zM800 128H640v-32a32.64 32.64 0 0 0-32-32h-192a32 32 0 0 0-32 32V128H224a30.08 30.08 0 0 0-32 32 30.08 30.08 0 0 0 32 32h576a30.08 30.08 0 0 0 32-32 30.08 30.08 0 0 0-32-32z" p-id="1571" fill="#bfbfbf"></path></svg>';
            
            var name = data[i].name;
            var code = data[i].code;
            var psw = data[i].password;
            var tempInfoCard = document.createElement("div");
            tempInfoCard.style = "display: inline-block;width: 50%;"
            tempInfo.innerHTML = name + "&nbsp;&nbsp;&nbsp;" + code;
            tempPsw.innerText = "会议密码：" + psw;
            tempButton.innerText = "进入会议";
            tempButton.setAttribute("onclick","go_meeting('"+code+"')");
            otherButton.setAttribute("onclick","delete_meeting('"+code+"')");
            tempInfoCard.append(tempInfo,tempPsw);
            temp.append(tempInfoCard,tempButton,otherButton);
            parent.append(temp);
        }
    }
    // }else{
    //     var x = utools.db.put({_id:"data",data:""});
    //     rev = x.rev;
    // }
}

function go_meeting(meeting_code) {
    if (meeting_code != null) {
        code = meeting_code.replace(/[\s,\-]/g, "");
        console.log("wemeet://page/inmeeting?meeting_code=" + code);
        utools.shellOpenExternal("wemeet://page/inmeeting?meeting_code=" + code)
        window.utools.hideMainWindow();
        window.utools.outPlugin();
    }
}

function delete_meeting(meeting_code){
    for(var i=0;i<data.length;i++){
        if(data[i].code == meeting_code){
            data.splice(i,1);
            //var strData = JSON.stringify(data);
            utools.dbStorage.setItem("data",data);
            // utools.db.put({_id:"data",data:strData,_rev:rev});
            //localStorage.setItem("data",strData);
        }
    }
    render();
}

function addMeeting(){
    document.getElementById("addButton").style.display = "none";
    document.getElementById("addMeetForm").style.display = "block";
}

function confirmAddMeeting(){
    document.getElementById("addButton").style.display = "block";
    document.getElementById("addMeetForm").style.display = "none";
    var tempData = {
        "name":'',
        "code":'',
        "password":'',
    }
    var temp = document.getElementById("addMeetForm").children;
    tempData.name = temp[1].value;
    tempData.code = temp[4].value;
    tempData.password = temp[7].value;
    data.push(tempData);
    //var strData = JSON.stringify(data);
    console.log("data",data);
    console.log("tempData",tempData);
    utools.dbStorage.setItem("data",data);
    //utools.db.put({_id:"data",data:strData,_rev:rev});
    //localStorage.setItem("data",strData);
    temp[1].value = "";
    temp[4].value = "";
    temp[7].value = "";
    render();
}

function cancelAddMeeting(){
    document.getElementById("addButton").style.display = "block";
    document.getElementById("addMeetForm").style.display = "none";
}

function clear(){
    parent.innerHTML = "";
    console.log("调用clear");
}