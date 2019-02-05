let result = [];
let showNextId = 0;
let beforeUnloadFunction = undefined;

function randomizeInput() {
    result = [];
    let inputs = document.getElementById("textAreaInput").value.split("\n");
    inputs = inputs.map(item => item.trim()).filter(item => item !== null && item !== undefined && item !== "" && item.length > 0);
    while (inputs.length > 0) {
        let nextIndex = getRandomNumber(inputs.length);
        let pickedItem = inputs[nextIndex];
        result.push(pickedItem)
        inputs = inputs.filter((_item, index) => index !== nextIndex);
    }
    if (result.length > 0) {
        beforeUnloadFunction = function() {
            return 'You have not displayed all elements yet. Are you sure you want to leave?';
        };
        $(window).bind('beforeunload', beforeUnloadFunction);

        $("#randomizeButton").hide('slow', function() {
            $("#textAreaInput").hide('slow', function() {
                $("#statusOutput").show('slow', function() {
                    $("#nextButton").show('fast');
                    $("#allButton").show('fast');
                });
            });
        });
    }
}

function showNext() {
    $("#statusOutput").hide('fast');
    if (showNextId < result.length) {
        document.getElementById("resultOutput").innerHTML = result.filter((_item, index) => index <= showNextId)
            .reduce((prev, current, index) => prev += '<div' + (index >= showNextId ? ' class=tracking-in-contract-bck-bottom' : '') + '>' + current + '</div>', '');
        showNextId += 1;
    }
    if (showNextId >= result.length) {
        allIsShown();
    }
}

function showAll() {
    $("#statusOutput").hide('fast');
    document.getElementById("resultOutput").innerHTML = result
    .reduce((prev, current, index) => prev += '<div' + (index >= showNextId ? ' class=tracking-in-contract-bck-bottom' : '') + '>' + current + '</div>', '');
    allIsShown();
}

function allIsShown() {
    $(window).unbind('beforeunload', beforeUnloadFunction);
    $("#nextButton").hide('fast');
    $("#allButton").hide('fast');
}

function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}