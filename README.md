# TrafficFlow
The backend for the problem has been implemented using nodejs. The database I have used is SQLite3. 
For the front end, I have used an ejs file, with support using another js file. Basic input validation is done on UI elements. Since the server side is not an API that has to be given for use, there is lesser validation on server side. The validation can be made more strict if needed. I have used CSS and Bootstrap for styling

The form can be accessed at port 3000. I have included an admin screen 3000/admin, where the user has the option to insert values into the database(can be used for testing). On the same page there is also an option to load some predefined data into the database. The user can also clear all the data from the database in this section. There is no validation done yet on the type of values inserted here, since this is mainly to help in testing, and not for use by end user.

The user can insert timestamp range using the date time picker. He needs to select atleast one attribute to place the query request. He can choose not to add any where conditions. The results are displayed in a tabular format, and new results will replace the old results. The user can clear all the where conditions.

Features that can be added in future are:
Having support to allow user to enter parametrize queries
Allow the user to remove individual condition elements
Adding test cases
Allowing additional visualization such as graph, allowing user to select the x and y axis.

I faced some challenges:
Limited time, as I had other assignment submissions and tests as part of course work during this time, so I focussed on ensuring that I submitted a working product.
It is my first time working with nodejs, so had to go through the basics before getting started.
