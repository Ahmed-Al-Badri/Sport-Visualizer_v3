# The Sport Project #themPlayers

This Sport Application is design to give informations of Soccer players to users. Users are able to search teams, Or look up teams by Countries.

## Site delployment

The site was delployed using vite, in which require npm. When downloading the Repository install the packets with

[Repository link GitHub](https://github.com/Ahmed-Al-Badri/Sport-Visualizer_v3)

```JavaScript
npm install
npm run dev
```

In which a link will be provided.

## Project Details

Below is the setup and Commits details

### The Base setup

In order to provide access to data all around the application and other sports from the same API, a fetch class was required to take care of that; with that, classes that use the Main fetch class, used the class as an Abstract class so that when the fetching occures the base class works for any sports that follow a similar pattern-- in other words, class abstraction, or a dynamic binding approch.

```JavaScript
    class fetch_cmd {}
    class Soccer extends fetch_cmd{
        set():{
            //Their data and urls
        }
    }
    class BasketBall extends fetch_cmd{}
```

The first commit took care of declaring the fetch class, however it was unimplemented.

### The Second Set-Up

It needed that a class took care of the fetched data, since the fetch data format is differnt than many others, a class was needed.

```JavaScript
    Graphs extends React.Component{
        constructor(FetchClass)
        this.fetchclass = new FetchClass();
        //The fetch class belongs to Soccer
        //and or another/others classes
        //that extend the Fetch class.
    }
```

The First commit Also took care of the protopye declaration.

### The Sport formatter

In order to take care of the fetched data and the formatted data from the API and the Graph class. A class was created to handle all changes and request from the users. That includes displaying all teams by Countries, displaying only search Countries/Teams.

Other forms of handeling the data were creating data to statify the user requests to viewing the teams and their players.

```JavaScript
    class Sport extends React.Component {
        constructor(Graphs_classes){
            this.Graphs = new Graphs_classes[0];(Graphs_classes[1]);
            //The arguments passed into the
            //Sport constructor belong to
            //the Graphs class type,
            //and the Fetching class type.
            //In the Format of an array
            //ex.*
                new Sport([Graphs, Soccer]);
            //*.ex
        }
    }
```

## The Project Commits

### First Commit

The first commit helped format the entire Program, the only includes the base setup of the Navigation, and the Routing.

The work done including installing fetching the graphing bootstrap libary-- or the CSS bootstrap libarys. The Librarys included CSS for the container and the navigation.

#### The resources used

- The React Navbar [Site](https://react-bootstrap.netlify.app/docs/components/navbar/)
- Other than that, the Routes were set up using examples given from the web-- basic code examples.

### The Second Commit

Name: "Information is set up, except graphs".
This Commit helped develope the Navigation, new class styles were added to format the Routes and Navigation.

### The Third Commit

Name: "All data is done excepts statics".
Statics stands for statictics, This commit helped develope home functions of the three classes, however, because of most recent changes to that date, functional prototypes were build in order to use the time given in a correct and productive way.

Their isn't an exuse for using or devloping the three classes together becasue, since each one depended on the other, a fast connected was need to string and tie the data together in which made it possible to make each class productive without running into the issue of missused function and unthere wanted class home functions. In other words, it is possible to share the work, however the work is a water fall pattern with leak at the bottom, what this means is that the main class Sport requires the graphs function, and the graphs function are not limited so they can increase and increase more on the request of the Sport class, moreover, what the bottoms leaks stand for is that the fetch class does not really depend on the upper system but needs to do the basic it work with the api, it stills need to communicate with the other classes, but not as much as Graphs, moreover, the some of the Graphs home function do not depend on what the Main Sport class wantes as it can build any home function that will make it easier for it to do the work needed.

### The Forth Commit

Name: "Added Styles so that it takes casre of screen size change"
This commit makes it so that when the screen size is differnt than the average large screen, it formats some elements to take a form to make it more readibly to the users, readibly, visuable, and comfortable on the element placements.

It also made it so that player are display from a stored varible in the soccer Sport visulizer function

### The Fifth Commit

Name: "All work regarding the Structure of the page has been done, the only..."
This commit changes the formating style of the grid into a grid area, this way the data get formatted well and or in a way that is changable in later implementations.

### The Sixth Commit-Merge pull request

Name: Brance merge: "Graphs"
This commit added the players statictics page; which allowed the player information to be displayed in a pattern that is easy on the displacment.
It also added a section into the Sport Vis function to allow the data to be displayed correctly.

#### The Reviews

Since their was nobody to review the work done, it was done by me, in which give me time to reflect on the changes that were done.

The reviews were mostly about - Adding styles will make the program more fun to navigate. - The removal of unused empty classes on elements - A review of the unused imports - A way to keep track of what was used to keep track of the naming given to varibles - The removal of wanted code - Placement of comments on unfinshed class home function so that when being worked on, it is clear what is wanted or missing. - Using CSS grid areas as an option instead of grid sort columns and rows.

### Seventh Commit

Name: "The data is formatted for the player card, with that the grid displa...", --display
This commit formatted the data in which allowed the users to view the player stats and their donuts graphs.

It also removed commented code and edited a CSS style grid from a row grid into a column grid. With the addition of Screen change of 1000px.

#### The Resources / Chart 2 react

- The main resource used was React Chart JS two/2
- [react-chartjs-2](https://react-chartjs-2.js.org/) provided the required resources and graphs elements to display data in a possible way that made it easier to use than most to little libaryies.

### The Eight Commit - Eleventh Commit-Merge

Names: From commit "Improved the layout by..."-more, to the merge request from CleanUp brance.
These commits took care of the usablity of the program, instead of calling events twice, With that, some elements do not refresh on buttons requests and users, in order to avoid that, meatures were took to handle that type of error.

#### Pull Request Comments before Merge

- Review of some code refresh-ability, in which hepled define what occured or seemed to be occuring.
- Review of deleted, in which helped the commiter review some of their work.
- An issue of why some comment out entire code was deleted.
  - The response was that it required another form of subscriptions or key was needed to access the current graphs and or charts.

### The Twelf Commit to the Thridteens Merge-Commit

Name: "Added test ..."--more, to the Pull/Merge request From TestsImplementation branch.
This request added tests to test out the correctness of the search pattern function, since it is not a home to any class functions; it was easier to test out without having to implemet class tests.

- Class tests are usefull however it requires a time use test, it is doable, but not required for this small simple setup.

#### The Comments regarding the merge

- Since two seperate tests were done, one has a true expected arguemnt and the other false.
  - Adding more test that fail and work was suggest to test the power/capiablity of the function.
    - Response was true, but following the algorthms of the creating function, it is likely to do the correct thing becasue their isn't any outside factors being involved.
  - Another was to handle inccorect data being passed.
    - Response was true, but basic JavaScript could be avoided and or the use of try-catch could to prevent errors-- this could prevent the user from knowing what happing if a response was not returned; however TypeScript provies details that enable data to be passed correctly.

### The last Commits from "Read me .." and Newer

This Readme file was improved and added.
A explantating of what happed in the program was written and docemented.

- A small improvement was added to the Sport Load function, which allowed the function to re-run when an error occured.

## Project main Issues

React was not responding to components change ignore everthing, in which a new way was required to make React take attention of the elements change in UseEffect, in which a soluation became possible, instead of just changing the data, A UseState was created that just refreshed to check the Useeffect arugments in which made it possible to do dynamic work with the class, without lossing a lot of data and etc.
