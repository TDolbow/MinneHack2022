GET "/api/new-user"
    - no parameters passed
    - returns an id

GET "/api/site-stats"
    - parameters:
        - domain
        - path
    
{
    siteRating: 53,
    pageRating: 20,
    comments: [
        {
            UUID: 2,
            comment: 'some text here'
        },
        {
            UUID: 4,
            comment: 'this site sucks'
        }
    ]
}

POST "/api/rating"
    - parameters:
        - domain
        - path
        - rating - a 1 or 0 representing like or dislike respectively
        - UID
{
    status: 'success'
}

POST "/api/comment"
    - parameters:
        - domain
        - path
        - comment
        - UID

{
    status: 'success'
}
