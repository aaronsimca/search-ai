Installation

> > npm install exa-js
> > npm install openai

# Cursor Prompts

1. <EXA.AI FUNCTION from API Documentation>

Create an action folder and in an exa-actions.ts file please add this function so that we can use it in a server action.

2.  <OPENAI CHAT COMPLETION FUNCTION from API Documentation>

Create an openai-actions.ts file in action folder please add this function so that we can use it in a server action.

3. In the page, I want you to create a user input with the search button. When that search is triggered, it should log out so that I can make sure that that's all working.

4. Hey, please don't be lazy. I'm trying to work really fast here. Can you do the handle search function that integrates with the exa action?

5. <DATA STRUCTURE UNDER CONSOLE LOG RESULT NO 1>

This is the DATA STRUCTURE UNDER CONSOLE LOG:
<...>
What I need you to do is in the array of results, each object has a text property. I need you to combine the 5 most relevant sources and pass those in to the OpenAl API, asking for a summary of the information back

6. DEBUGGING WITH LOG

Can we get some more logs? I want to see the search results logging and the Al-generated response logging just to verify that everything's working before we do
UI.

7. Final UI

Center the search bar and button to the screen. Show the results horizontally right below the search bar. Whenever you have those kinds of create a nice little Ul for that, that we can horizontally scroll across all the sources there. It would be great if when you clicked on them, it actually went to their link. I would love that. Below that, we need to show the actual Al-generated answer and make sure to make the Ul look nice for that.
