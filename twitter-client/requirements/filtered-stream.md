# Filtered Stream

## Success:
1. ⛔️ Receive a **POST** request on **/api/tweets/stream**
2. ⛔️ Calls the **Twitter API** on the stream endpoint
3. ⛔️ Put all the incoming tweets in a **Queue** to be consumed by the **tweet-paser microservice**

## Exceptions:
1. ⛔️ Returns 404 if the api doesn't exists
4. ⛔️ Returns 500 if the request to the Twitter API fails