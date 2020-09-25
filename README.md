# TravelTek - Coding Test [FS-B1]

### Files:
- flighdata_B.csv - supplied
- flighdata_B_segments.csv - supplied
- airlineImg.csv - csv file containing the carrier names and mapped logo names stored inside assets/img in the angular app
- iataCodes.csv - csv file containing airport IATA codes with mapped airport name
- getData.py - a python script used to load read the csv files above and send the data to MongoDB

### Application  
The TravelTek folder contains an angular app with node.js server script to get data from MongoDB.
To run the application:
- clone this repository using git command "git clone https://github.com/plafferty64830/TravelTek_CodingTest.git"
Assuming angular/cli and node are installed on your system, open git bash or the windows command prompt and locate the TravelTekApp folder inside the cloned repository
- Firstly, run "npm install" to install all required packages.
- Secondally, run "node server.js" from the src folder - this will start the node server.
- Finally, open a second terminal and run "ng serve" from the root TravelTekApp folder to start the application. Providing you don't have another angular app running and port 4200 is free, the app should be hosted at http://localhost:4200/. 

### Future developent - if I'd more time, I wouldn't done the following
- implement advanced search functionality
- download offical airline logos and refine the image sizing algorithm I had started
- display more data from the file in a more aestically pleasing way

