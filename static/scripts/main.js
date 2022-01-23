async function getURL(){ // Return URL of current page
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.url;
}






document.addEventListener('DOMContentLoaded', async function () {
    
    
    let url = await getURL();
    
    
    var upVote = document.getElementById('upvote');
    upVote.addEventListener('click', function () {
        document.getElementById('title').innerText = ("URL is: " + url);
        populatePage(testJSON);


    }, false);

    var downVote = document.getElementById('downvote');
    downVote.addEventListener('click', function (){

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