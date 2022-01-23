async function getURL(){ // Return URL of current page
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.url;
}

function setUserID(NewUID){ //Sets the user ID to the value passed in. 
    chrome.storage.sync.set({["UID"] : NewUID.toString()}, function(){
       console.log("Saved")
   });
}

function getUserID(){ // Currently sets title to saved user ID. 
    var ret = "";
    chrome.storage.sync.get("UID", function(items) {
        console.log(items);
        //console.log('Value currently is ' + result.key);
        
        document.getElementById('UID').innerText = (items.UID);

      });
}

function newUser(){ //Function to get new uesr ID. 
    data = {};
    
    fetch("http://192.168.64.3:8000/api/new-user",{
        method : "GET",
        headers: {'Content-Type': 'application/json'}
        }).then(res => {
            data = JSON.parse(res);
            setUserID(data.id);
            console.log("User ID set to: "  + data.id);
            document.getElementById('UID').innerText = data.id;
        });
}

async function getSiteStats(domain, url){ // Gets specified domain and url site stats from backend and populates the page
    data = {domain : domain, url : url};
    fetch("http://192.168.64.3:8000/api/site-stats", {
        method : "GET",
        headers: {'Content-Type': 'application/json'},
        //body: JSON.stringify(data)
    }).then(res => {
        populatePage(res) //Populates page with results. 
        

    });
}

function sendRating(UID, rating, domain, url){ //Sends the user's rating to the backend based on the specific domain and url page.  
    data = {domain: domain, url: url, UID : UID, rating: rating};
    fetch("http://192.168.64.3:8000/api/rating", {
        method : "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(res => {
       data = JSON.parse(res);
       console.log("sendRatingStatus: " + res.status);
    });
}

function sendComment(UID, comment, domain, url){ //Sends the user's comment to the backend based on the specific domain and url. 
    data = {};
    fetch("http://192.168.64.3:8000/api/comment", {
        method : "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(res => {
        data = JSON.parse(res);
        console.log("sendRatingStatus: " + res.status);
    });
}


function populatePage(json) { //Populates page based on the JSON string passed to it. 
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

let testJSON = JSON.stringify({ // Test JSON String for populatePage
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



document.addEventListener('DOMContentLoaded', async function () {
    
    let url = await getURL();
    let domain = "temp" //Get domain name somehow
    getUserID();
    let uid =  document.getElementById('UID').innerText;
    
    if(uid == "Undefined"){
        newUser();
        uid =  document.getElementById('UID').innerText;
    }

    getSiteStats(domain,url); //Updates page 

    
    var upVote = document.getElementById('upvote');

    var downVote = document.getElementById('downvote');

    var commentSubmit = document.getElementById('submitComment');


    
    
    upVote.addEventListener('click', function () { // 
        sendRating(uid, 1,domain,url);
        getSiteStats();
        // setUserID(5);
    }, false);

    downVote.addEventListener('click', function (){
        sendRating(uid, 0,domain,url);
        getSiteStats();

    }, false);

    commentSubmit.addEventListener('click', function(){
        let commentText = document.getElementById("comment").innerText;
        sendComment(uid,commentText, domain, url);
        getSiteStats();
        
    }, false);


}, false);





