## Mongo
NoSQL
Unstructured Document
JSON

## PG
SQL
Structured
Tables

The most important different is unstructured versus the table database.

With Mongo we can embed different objects within a document Jamie gave the example of Post being the main document and then comments will be in an array of objects. Instead of doing user.posts we can do findUser(userId).

Jamie went through an example of a side project that he is working on about creating a relational type database with the submissions. He was going to embed it but it became easier to create another model and user the ObjectId of the user and the submissions in the same model.

## Use process.env.variable in json

https://stackoverflow.com/questions/36962601/node-js-how-to-use-environment-variables-in-json-file


mongodb://johncodeinaire:freethecows@ds157621.mlab.com:57621/nomeatmay
