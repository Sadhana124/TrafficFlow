# TrafficFlow

####Additional details to run the code:

#####Instructions for MAC

1. git clone https://github.com/Sadhana124/TrafficFlow.git
2. cd TrafficFlow node bin/www
3. The backend server will be up, open your favorite browser and go to url localhost:3000
4. The database is already populated with some data (one valid timestamp range: July 1, 1967 to April 1 1970)
5. Click on the button “Add where condition” to add a condition (one valid condition: Destination_ip = 10.2.1.3)
6. To add more rows, click the “Add where condition” button(one valid condition: Destination_ip = “10.2.1.3” AND Sum_of_packets > 5). The condition that will be applied two where clauses is the “OR” or “AND” selected from the dropdown(the last row’s “OR” or “AND” will be ignored)
7. To clear all the where condition use the “Clear where conditions” button.
8. To enter additional values into the database you can use localhost:3000/admin (caution: there is no validation on the data being entered since this was created only to aid in testing). This page also provides an option to clear all the database data using “Clear Data” button.

#####Instructions for Linux

1. Make changes to package.json to add "sqlite3": “~2.2.3" to the dependencies. I have already added this but this check in was made 4/13/16 after 12pm(which was the deadline)
2. cd into TrafficFlow and do npm install 
3. Proceed with step 1-8 as given for MAC


####Implementation details

The backend for the problem has been implemented using nodejs. The database I have used is SQLite3. 
For the front end, I have used an ejs file, with support using another js file. Basic input validation is done on UI elements. Since the server side is not an API that has to be given for use, there is lesser validation on server side. The validation can be made more strict if needed. I have used CSS and Bootstrap for styling

The form can be accessed at port 3000. I have included an admin screen 3000/admin, where the user has the option to insert values into the database(can be used for testing). On the same page there is also an option to load some predefined data into the database. The user can also clear all the data from the database in this section. There is no validation done yet on the type of values inserted here, since this is mainly to help in testing, and not for use by end user.

The user can insert timestamp range using the date time picker. He needs to select atleast one attribute to place the query request. He can choose not to add any where conditions. The results are displayed in a tabular format, and new results will replace the old results. The user can clear all the where conditions.


####Features that can be added in future are:

1. Having support to allow user to enter parametrize queries
2. Allow the user to remove individual condition elements
3. Adding test cases
4. Allowing additional visualization such as graph, allowing user to select the x and y axis.


####Challenges faced:

1. Limited time, as I had other assignment submissions and tests as part of course work during this time, so I focussed on ensuring that I submitted a working product.
2. It is my first time working with nodejs, so had to go through the basics before getting started.

####Screenshots

![Alt text](/screenshots/withoutWhere.png?raw=true "Without any conditions")


![Alt text](/screenshots/oneCond.png?raw=true "With one condition")


![Alt text](/screenshots/dateTimePicker.png?raw=true "Date Time Picker")


![Alt text](/screenshots/errorMsg1.png?raw=true "Error scenario")


![Alt text](/screenshots/errorMsg2.png?raw=true "Error scenario")


![Alt text](/screenshots/errorMsg3.png?raw=true "Error scenario")
