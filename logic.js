let xd = "dupa";

let initLogic = function ()
{
    Window.loadLevel = loadLevel; //put function to global scope
};

let loadLevel = function(levelNo)
{
    // alert('huj w dupe');

    if (levelNo.toString().length === 1) {
        levelNo = '0' + levelNo;
    }

    let fileName = 'level' + levelNo + '.txt';

    console.log("loadig from string: " + fileName);

    let data = [];
    jQuery.get(fileName, function(data) {

    });

    console.log(data);

    // let client = new XMLHttpRequest();
    // client.open('GET', '/level01.txt');
    // client.onreadystatechange = function() {
    //     alert(client.responseText);
    // }
    // client.send();
};
