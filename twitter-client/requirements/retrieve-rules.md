# Retrieve Rules

## Success:
1. ⛔️ Receive a **GET** request on **/api/tweets/rules/**
2. ⛔️ Load the user rules using the token id
3. ⛔️ Returns 200 with the rules

## Exceptions:
1. ⛔️ Returns 404 if the api doesn't exists
2. ⛔️ Returns 404 if no **user** is founded
3. ⛔️ Returns 404 if no **rules** are founded
4. ⛔️ Returns 500 if load rules fails