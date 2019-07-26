
var levels = [
"",
"\
################################\
#                              #\
#                              #\
#                              #\
#                              #\
#                              #\
#                              #\
#                              #\
#                              #\
#                              #\
#                              #\
#                              #\
#                              #\
#                              #\
#                              #\
#                              #\
#                              #\
################################\
"
];

let loadLevel = function(levelNo)
{
    let textData = levels[levelNo];
    let levelData = new Array(18);

    let idx = 0;
    for (let y = 0; y < 18; ++y) {
        levelData[y] = new Array(32);
        for (let x = 0; x < 32; ++x) {
            levelData[y][x] = textData.charAt(idx++);
        }
    }

    return levelData;
};

var map = 1234;