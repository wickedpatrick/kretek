
let initLogic = function ()
{
    Window.loadLevel = loadLevel; //put function to global scope
};

function readTextFile(file)
{
    let allText = "";
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if(rawFile.status === 200 || rawFile.status === 0) {
                 allText = rawFile.responseText;
            }
        }
    };
    rawFile.send(null);
    return allText;
}

let loadLevel = function(levelNo)
{
    if (levelNo.toString().length === 1) {
        levelNo = '0' + levelNo;
    }

    let fileName = 'level' + levelNo + '.txt';
    let textData = readTextFile(fileName);

    let lines = textData.replace("\r", "").split("\n");
    if (lines.length !== 18) {
        alert("ERROR:" + fileName + " - expecting 18 lines");
    }

    let levelData = new Array(18);

    for (let y = 0; y < 18; ++y) {
        levelData[y] = new Array(32);
        for (let x = 0; x < 32; ++x) {
            levelData[y][x] = lines[y].charAt(x);
        }
    }

    return levelData;
};
