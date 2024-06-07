# The Sport Project #themPlayers

    This Sport Application is design to give informations of Soccer players to users. Users are able to search teams, Or look up teams by Countries.

## Project Details

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

    The first commit took care is declaring the fetch class, however it was unimplemented.

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

    The first commit helped format the entire Program, the only includes the base setup of the Navigation, and the Routhing.

    The work done including installing fetching the graphing bootstrap libary-- or the CSS bootstrap libarys. The Librarys included CSS for the container and the navigation.

#### The resources used

- The React Navbar [Site](https://react-bootstrap.netlify.app/docs/components/navbar/)
- Other than that, the Rouths were set up using examples given from the web-- basic code examples.

### The Second Commit

## TSC involved
