async function getURL(){ // Return URL of current page
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.url;
}

function setUserID(NewUID){
   chrome.storage.sync.set({["UID"] : NewUID.toString()}, function(){
       console.log("Saved")
   });
}

function getUserID(){
    var ret = "";
    chrome.storage.sync.get("UID", function(items) {
        console.log(items);
        //console.log('Value currently is ' + result.key);
        
        document.getElementById('title').innerText = (items.UID);

      });
}

async function newUser(){
    data = {};
    
    fetch("./api/new-user",{
        method : "GET",
        headers: {'Content-Type': 'application/json'}
        }).then(res => {
            data = JSON.parse(res);
            setUserID(data.id);
            console.log("User ID set to: "  + data.id);
        });
}

async function getSiteStats(domain, url){
    data = {domain : domain, url : url};
    fetch("./api/site-stats", {
        method : "GET",
        headers: {'Content-Type': 'application/json'},
        body = JSON.stringify(data)
    }).then(res => {
        populatePage(res) //Populates page with results. 
        

    });
}

function sendRating(UID, rating, domain, url){
    data = {domain: domain, url: url, UID : UID, rating: rating};
    fetch("./api/rating", {
        method : "POST",
        headers: {'Content-Type': 'application/json'},
        body = JSON.stringify(data)
    }).then(res => {
       data = JSON.parse(res);
       console.log("sendRatingStatus: " + res.status);
    });
}

function sendComment(UID, comment, domain, url){
    data = {};
    fetch("./api/comment", {
        method : "POST",
        headers: {'Content-Type': 'application/json'},
        body = JSON.stringify(data)
    }).then(res => {
        data = JSON.parse(res);
        console.log("sendRatingStatus: " + res.status);
    });
}

/*
function callbackClosure(callback){
    return function(){
        return callback();
    }
}
*/






document.addEventListener('DOMContentLoaded', async function () {
    
    
    let url = await getURL();
    
    
    var upVote = document.getElementById('upvote');
    //chrome.storage.sync.clear(); //Delete when done testing.


    upVote.addEventListener('click', function () {
        document.getElementById('title').innerText = ("URL is: " + url);
        populatePage(testJSON);
        setUserID(5);


    }, false);

    var downVote = document.getElementById('downvote');
    downVote.addEventListener('click', function (){
        ID = getUserID();
        document.getElementById('title').innerText = (ID);

    }, false);
}, false);



let testJSON = JSON.stringify({
    siteRating: 54,
    pageRating: 45,
    comments: [
        {
            UUID: 'ID1',
            comment: 'some text here'
        },
        {
            UUID: 'ID2',
            comment: 'some more text'
        },
        {
            UUID: 'ID3',
            comment: 'this site sucks'
        }
    ]
});

//testJSON = JSON.stringify({siteRating : 54, pageRating : 45});

function populatePage(json) {
    let parsed = JSON.parse(json);
    
    document.getElementById("siteRating").innerText = parsed.siteRating;
    document.getElementById("siteRating").value = parsed.siteRating;

    document.getElementById("pageRating").innerText =  parsed.pageRating;
    document.getElementById("pageRating").value = parsed.pageRating;
    
    
    commentArr = parsed.comments;
    

    for(let i = 0; i < commentArr.length; i++){
        let table = document.getElementById("comments")
        let row = document.createElement('tr'); 
        let column1 = document.createElement('td');
        let column2 =document.createElement('td');

        column1.appendChild(document.createTextNode(commentArr[i].UUID));
        column2.appendChild(document.createTextNode(commentArr[i].comment));

        row.appendChild(column1);
        row.appendChild(column2);
        
        //row.appendChild(document.createTextNode(commentArr[i].comment));

        table.appendChild(row);

    }

    









}