# Delete Rules

## Success:
1. ⛔️ Receive a **DELETE** request on **/api/tweets/rules/:id**
2. ⛔️ Call the **Twitter API** on the delete rules endpoint
3. ⛔️ Delete the **rule** locally
4. ⛔️ Returns 200 with the confirmation

## Exceptions:
1. ⛔️ Returns 404 if the api doesn't exists
3. ⛔️ Returns 404 if no **rules** are founded
4. ⛔️ Returns 500 if call to Twitter API fails
5. ⛔️ Returns 500 if delete rules fails