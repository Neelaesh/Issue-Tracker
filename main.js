function fetchIssues(){
    var issues = JSON.parse(localStorage.getItem('issues'));
    console.log("issues ",issues);
    if(issues){
        var issueList = document.getElementById('issueList');
        issueList.innerHTML = '';

        for(var i = 0; i < issues.length; i++){
            var id = issues[i].id;
            var desc = issues[i].description;
            var severity = issues[i].severity;
            var assignedTo = issues[i].assignedTo;
            var status = issues[i].status;

            if(issues[i].status == "closed"){
                //document.getElementById("setClose").disabled = true;
                disableClose(issues[i].id);
            }

            issueList.innerHTML +=  '<div class="issues">' +
                                        '<h3>Issue ID: ' + id + '<h3>' +
                                        '<p><span class="label label-info"> ' + status + '</span></p>' +
                                        '<h3>' + desc + '</h3>' +
                                        '<p><span class="glyphicon glyphicon-time"></span> ' + severity + 
                                        ' <span class="glyphicon glyphicon-user"></span> ' + assignedTo +
                                        '</p>' +
                                        '<button class="btn btn-warning setClose" id="\'' + id + '\'" onclick="setStatusClosed(\'' + id +'\')">Close</button> ' +
                                        '<a href="#" class="btn btn-danger" onclick="deleteIssue(\'' + id + '\')">Delete<a>' +
                                        '<hr>' +
                                    '</div>'
        }
    }
}

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e){
    var issueId = chance.guid();
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    var issueStatus = "open";

    var issue = {
        id : issueId,
        description : issueDesc,
        severity : issueSeverity,
        assignedTo : issueAssignedTo,
        status : issueStatus
    }

    if(JSON.parse(localStorage.getItem('issues')) === null){
        var issues = [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    else{
        var issues = JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }

    reset();
    e.preventDefault();
}

function setStatusClosed(id){
    console.log("ID ",id);
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(var i = 0; i < issues.length; i++){
        if(issues[i].status == "closed"){
            alert("The Issue has been closed already");
            return;
        }
        if(issues[i].id == id){
            issues[i].status = "closed"
        }
    }
    localStorage.setItem('issues',JSON.stringify(issues));
    fetchIssues();
}

function deleteIssue(id){
    console.log("ID ",id);
    var issues = JSON.parse(localStorage.getItem('issues'));
    for(var i = 0; i < issues.length; i++){
        if(issues[i].id == id){
            issues.splice(i, 1);
        }
    }
    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function reset(){
    document.getElementById('issueInputForm').reset();
    fetchIssues();
}

function disableClose(id){
    console.log("ID ",id);
    /* var button = document.getElementsByClassName("setClose");
    button[0].disabled = true; */
}