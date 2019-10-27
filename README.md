### Thought Process

## Front-End

1.  I initially wrote the front end in Angular, however I was having so many issues deploying it that I re-wrote it in React (I am currently more familiar with Angular, but only have experience deploying React apps)
2.  This app is pretty basic, so I won't need history, router, or redux
3.  When building the Angular app, I decided to go with a table to display the repository data and votes since it is clean and sortable, so I will do the same here
4.  Building the app out of three components, repo data, submission form, and vote data will be the simplest. I won't even need to send props since each element will be handling its own data. The simpler the better
5.  Semantic UI has sortable tables and since I am familiar with semantic, I will go with that
6.  I know from my final project at Fullstack Academy that I can use octokit access the github API to grab the framework repo data
7.  Hm, semantic doesn't have built in form validation... I bet there is a module for that
8.  I was right, formsy-semantic-ui-react

## Back-End

* It was not explicitly stated if I should use a database or not to store votes. However, I like making databases, so I have included one.
* I was not entirely sure about the "single vote for a given framework per user email address and browser session" constraint. I assumed that it meant...
  * Given the same email and session, the user can only vote once
  * Given the same email and a different session, the user can change their vote
  * Given a different email and the same session, the new email can submit a new vote
* The app does support limiting one vote per email per session but doesn't seem to have an effect since a new session is created with every request.
