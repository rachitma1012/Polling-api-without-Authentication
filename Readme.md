
# Polling Sytem Api without Authentication

An API where anyone can create questions with options and also add votes to it

 Features
 Create a question (you can add as many questions as you want)
- Add options to a question
- Add a vote to an option of question
- Delete a question → ( A question can’t be deleted if one of it’s options has votes)
- Delete an option → (An option can’t be deleted if it has even one vote given to it)
- View a question with it’s options and all the votes given to it
 Required Routes
- /questions/create (To create a question)
- /questions/:id/options/create (To add options to a specific question)
- /questions/:id/delete (To delete a question)
- /options/:id/delete (To delete an option)
- /options/:id/add_vote (To increment the count of votes)
- /questions/:id (To view a question and it’s options)


## Authors

- Rachit Malik

