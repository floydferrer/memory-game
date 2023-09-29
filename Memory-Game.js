function randomize(values) {
    let index = values.length,
        randomIndex;

    // While there remain elements to shuffle.
    while (index != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * index);
        index--;

        // And swap it with the current element.
        [values[index], values[randomIndex]] = [values[randomIndex], values[index]];
    }

    return values;
}

let imgArray = [
    'url("https://i.pinimg.com/564x/ef/2f/9f/ef2f9ff96b0f0601826e830167ce40ea.jpg")',
    'url("https://i.pinimg.com/564x/48/14/5a/48145aa835e52fe621d42e24920edc57.jpg")',
    'url("https://i.pinimg.com/564x/56/5c/67/565c673cc99c53b7f0e2aea040161ab9.jpg")',
    'url("https://i.pinimg.com/564x/dc/bc/73/dcbc736eb60d6e98feeec9897f958afb.jpg")',
    'url("https://i.pinimg.com/564x/ef/2f/9f/ef2f9ff96b0f0601826e830167ce40ea.jpg")',
    'url("https://i.pinimg.com/564x/48/14/5a/48145aa835e52fe621d42e24920edc57.jpg")',
    'url("https://i.pinimg.com/564x/56/5c/67/565c673cc99c53b7f0e2aea040161ab9.jpg")',
    'url("https://i.pinimg.com/564x/dc/bc/73/dcbc736eb60d6e98feeec9897f958afb.jpg")'];

let newAttempts = 0;
//Sets best score (defaults to N/A if 1st attempt or Reset Score is pressed)
const savedAttempts = JSON.parse(localStorage.getItem("attempts")) || "N/A";
let bestScore = document.querySelector('h2');
bestScore.innerText = `Best Score: ${savedAttempts}`;

function restart() {
    location.reload();
}
function reset() {
    localStorage.clear();
    location.reload();
}

let cardPicks;
let pick1;
let pick2;
let matches = 0;
const randomizeImages = randomize(imgArray);

let memoryGame = document.addEventListener('DOMContentLoaded',
    function () {
        const card1 = document.getElementById("card1");
        card1.addEventListener('click', function (event) {
            //Prevents clicking on 3rd card when mismatch occurs on 1st 1 cards
            if (pick1 != undefined && pick2 != undefined) {
                if (pick1.style != undefined && pick2.style != undefined) {
                    return;
                }
            }
            //Prevents counting a matched card as a new pick, preventing matched card from reflipping to background color; prevents counting same card as both picks
            if ((card1.style.background != '' && card1.style.background === 'rgb(25, 100, 126))') || (card1.style.background === randomizeImages[0])) {
                return;
            }
            event.target.style.background = randomizeImages[0];
            //Sets 1st pick
            if (cardPicks === undefined || Object.keys(cardPicks).length === 0) {
                cardPicks = { pick1: card1 };
                pick1 = cardPicks.pick1;
            } else { //Sets 2nd pick
                cardPicks.pick2 = card1;
                pick2 = cardPicks.pick2;
                //Resets pick1 and pick2 when match is made
                if (pick1.style.background === pick2.style.background) {
                    let temp1 = pick1.style.background;
                    pick1.style.background = '#19647E';
                    pick2.style.background = '#19647E';
                    pick1 = '';
                    pick2 = '';
                    event.target.style.background = randomizeImages[0];
                    cardPicks.pick1.style.background = `${temp1}`;
                    //match counter
                    matches += 1;
                    //attempts counter (picking 2 unique card spots counts as 1 new attempt)
                    newAttempts +=1;
                    if (matches === 4) {
                        setTimeout(function () {
                            alert('Congrats! You win foo!!');
                        }, 100);
                        if (localStorage.attempts === undefined || newAttempts < localStorage.attempts) {
                            bestScore.innerText = `Best Score: ${newAttempts}`;
                            localStorage.setItem("attempts", JSON.stringify(newAttempts));
                        }
                    }
                    for (const key in cardPicks) {
                        delete cardPicks[key];
                    }
                } else { //Resets pick1 and pick2 when match is not made
                    setTimeout(function () {
                        pick1.style.background = '#19647E';
                        pick2.style.background = '#19647E';
                        pick1 = '';
                        pick2 = '';
                    }, 1000);
                    newAttempts +=1;
                    for (const key in cardPicks) {
                        delete cardPicks[key];
                    }
                }
            }
        })

        const card2 = document.getElementById("card2");
        card2.addEventListener('click', function (event) {
            if (pick1 != undefined && pick2 != undefined) {
                if (pick1.style != undefined && pick2.style != undefined) {
                    return;
                }
            }
            if (card2.style.background != '' && card2.style.background === 'rgb(25, 100, 126))' || (card2.style.background === randomizeImages[1])) {
                return;
            }
            event.target.style.background = randomizeImages[1];
            if (cardPicks === undefined || Object.keys(cardPicks).length === 0) {
                cardPicks = { pick1: card2 };
                pick1 = cardPicks.pick1;
            } else {
                cardPicks.pick2 = card2;
                pick2 = cardPicks.pick2;
                if (pick1.style.background === pick2.style.background) {
                    matches += 1;
                    let temp1 = pick1.style.background;
                    pick1.style.background = '#19647E';
                    pick2.style.background = '#19647E';
                    pick1 = '';
                    pick2 = '';
                    event.target.style.background = randomizeImages[1];
                    cardPicks.pick1.style.background = `${temp1}`;
                    newAttempts +=1;
                    if (matches === 4) {
                        setTimeout(function () {
                            alert('Congrats! You win foo!!');
                        }, 100);
                        if (localStorage.attempts === undefined || newAttempts < localStorage.attempts) {
                            bestScore.innerText = `Best Score: ${newAttempts}`;
                            localStorage.setItem("attempts", JSON.stringify(newAttempts));
                        }
                    }
                    for (const key in cardPicks) {
                        delete cardPicks[key];
                    }
                } else {
                    setTimeout(function () {
                        pick1.style.background = '#19647E';
                        pick2.style.background = '#19647E';
                        pick1 = '';
                        pick2 = '';
                    }, 1000);
                    for (const key in cardPicks) {
                        delete cardPicks[key];
                    }
                    newAttempts +=1;
                }
            }
        })

        const card3 = document.getElementById("card3");
        card3.addEventListener('click', function (event) {
            if (pick1 != undefined && pick2 != undefined) {
                if (pick1.style != undefined && pick2.style != undefined) {
                    return;
                }
            }
            if (card3.style.background != '' && card3.style.background === 'rgb(25, 100, 126))' || (card3.style.background === randomizeImages[2])) {
                return;
            }
            event.target.style.background = randomizeImages[2];
            if (cardPicks === undefined || Object.keys(cardPicks).length === 0) {
                cardPicks = { pick1: card3 };
                pick1 = cardPicks.pick1;
            } else {
                cardPicks.pick2 = card3;
                pick2 = cardPicks.pick2;
                if (pick1.style.background === pick2.style.background) {
                    matches += 1;
                    let temp1 = pick1.style.background;
                    pick1.style.background = '#19647E';
                    pick2.style.background = '#19647E';
                    pick1 = '';
                    pick2 = '';
                    event.target.style.background = randomizeImages[2];
                    cardPicks.pick1.style.background = `${temp1}`;
                    newAttempts +=1;
                    if (matches === 4) {
                        setTimeout(function () {
                            alert('Congrats! You win foo!!');
                        }, 100);
                        if (localStorage.attempts === undefined || newAttempts < localStorage.attempts) {
                            bestScore.innerText = `Best Score: ${newAttempts}`;
                            localStorage.setItem("attempts", JSON.stringify(newAttempts));
                        }
                    }
                    for (const key in cardPicks) {
                        delete cardPicks[key];
                    }
                } else {
                    setTimeout(function () {
                        pick1.style.background = '#19647E';
                        pick2.style.background = '#19647E';
                        pick1 = '';
                        pick2 = '';
                    }, 1000);
                    newAttempts +=1;
                    for (const key in cardPicks) {
                        delete cardPicks[key];
                    }
                }
            }
        })

        const card4 = document.getElementById("card4");
        card4.addEventListener('click', function (event) {
            if (pick1 != undefined && pick2 != undefined) {
                if (pick1.style != undefined && pick2.style != undefined) {
                    return;
                }
            }
            if (card4.style.background != '' && card4.style.background === 'rgb(25, 100, 126))' || (card4.style.background === randomizeImages[3])) {
                return;
            }
            event.target.style.background = randomizeImages[3];
            if (cardPicks === undefined || Object.keys(cardPicks).length === 0) {
                cardPicks = { pick1: card4 };
                pick1 = cardPicks.pick1;
            } else {
                cardPicks.pick2 = card4;
                pick2 = cardPicks.pick2;
                if (pick1.style.background === pick2.style.background) {
                    matches += 1;
                    let temp1 = pick1.style.background;
                    pick1.style.background = '#19647E';
                    pick2.style.background = '#19647E';
                    pick1 = '';
                    pick2 = '';
                    event.target.style.background = randomizeImages[3];
                    cardPicks.pick1.style.background = `${temp1}`;
                    newAttempts +=1;
                    if (matches === 4) {
                        setTimeout(function () {
                            alert('Congrats! You win foo!!');
                        }, 100);
                        if (localStorage.attempts === undefined || newAttempts < localStorage.attempts) {
                            bestScore.innerText = `Best Score: ${newAttempts}`;
                            localStorage.setItem("attempts", JSON.stringify(newAttempts));
                        }
                    }
                    for (const key in cardPicks) {
                        delete cardPicks[key];
                    }
                } else {
                    setTimeout(function () {
                        pick1.style.background = '#19647E';
                        pick2.style.background = '#19647E';
                        pick1 = '';
                        pick2 = '';
                    }, 1000);
                    newAttempts +=1;
                    for (const key in cardPicks) {
                        delete cardPicks[key];
                    }
                }
            }
        })

        const card5 = document.getElementById("card5");
        card5.addEventListener('click', function (event) {
            if (pick1 != undefined && pick2 != undefined) {
                if (pick1.style != undefined && pick2.style != undefined) {
                    return;
                }
            }
            if (card5.style.background != '' && card5.style.background === 'rgb(25, 100, 126))' || (card5.style.background === randomizeImages[4])) {
                return;
            }
            event.target.style.background = randomizeImages[4];
            if (cardPicks === undefined || Object.keys(cardPicks).length === 0) {
                cardPicks = { pick1: card5 };
                pick1 = cardPicks.pick1;
            } else {
                cardPicks.pick2 = card5;
                pick2 = cardPicks.pick2;
                if (pick1.style.background === pick2.style.background) {
                    let temp1 = pick1.style.background;
                    pick1.style.background = '#19647E';
                    pick2.style.background = '#19647E';
                    pick1 = '';
                    pick2 = '';
                    event.target.style.background = randomizeImages[4];
                    cardPicks.pick1.style.background = `${temp1}`;
                    matches += 1;
                    newAttempts +=1;
                    if (matches === 4) {
                        setTimeout(function () {
                            alert('Congrats! You win foo!!');
                        }, 100);
                        if (localStorage.attempts === undefined || newAttempts < localStorage.attempts) {
                            bestScore.innerText = `Best Score: ${newAttempts}`;
                            localStorage.setItem("attempts", JSON.stringify(newAttempts));
                        }
                    }
                    for (const key in cardPicks) {
                        delete cardPicks[key];
                    }
                } else {
                    setTimeout(function () {
                        pick1.style.background = '#19647E';
                        pick2.style.background = '#19647E';
                        pick1 = '';
                        pick2 = '';
                    }, 1000);
                    newAttempts +=1;
                    for (const key in cardPicks) {
                        delete cardPicks[key];
                    }
                }
            }
        })

        const card6 = document.getElementById("card6");
        card6.addEventListener('click', function (event) {
            if (pick1 != undefined && pick2 != undefined) {
                if (pick1.style != undefined && pick2.style != undefined) {
                    return;
                }
            }
            if (card6.style.background != '' && card6.style.background === 'rgb(25, 100, 126))' || (card6.style.background === randomizeImages[5])) {
                return;
            }
            event.target.style.background = randomizeImages[5];
            if (cardPicks === undefined || Object.keys(cardPicks).length === 0) {
                cardPicks = { pick1: card6 };
                pick1 = cardPicks.pick1;
            } else {
                cardPicks.pick2 = card6;
                pick2 = cardPicks.pick2;
                if (pick1.style.background === pick2.style.background) {
                    let temp1 = pick1.style.background;
                    pick1.style.background = '#19647E';
                    pick2.style.background = '#19647E';
                    pick1 = '';
                    pick2 = '';
                    event.target.style.background = randomizeImages[5];
                    cardPicks.pick1.style.background = `${temp1}`;
                    matches += 1;
                    newAttempts +=1;
                    if (matches === 4) {
                        setTimeout(function () {
                            alert('Congrats! You win foo!!');
                        }, 100);
                        if (localStorage.attempts === undefined || newAttempts < localStorage.attempts) {
                            bestScore.innerText = `Best Score: ${newAttempts}`;
                            localStorage.setItem("attempts", JSON.stringify(newAttempts));
                        }
                    }
                    for (const key in cardPicks) {
                        delete cardPicks[key];
                    }
                } else {
                    setTimeout(function () {
                        pick1.style.background = '#19647E';
                        pick2.style.background = '#19647E';
                        pick1 = '';
                        pick2 = '';
                    }, 1000);
                    newAttempts +=1;
                    for (const key in cardPicks) {
                        delete cardPicks[key];
                    }
                }
            }
        })

        const card7 = document.getElementById("card7");
        card7.addEventListener('click', function (event) {
            if (pick1 != undefined && pick2 != undefined) {
                if (pick1.style != undefined && pick2.style != undefined) {
                    return;
                }
            }
            if (card7.style.background != '' && card7.style.background === 'rgb(25, 100, 126))' || (card7.style.background === randomizeImages[6])) {
                return;
            }
            event.target.style.background = randomizeImages[6];
            if (cardPicks === undefined || Object.keys(cardPicks).length === 0) {
                cardPicks = { pick1: card7 };
                pick1 = cardPicks.pick1;
            } else {
                cardPicks.pick2 = card7;
                pick2 = cardPicks.pick2;
                if (pick1.style.background === pick2.style.background) {
                    matches += 1;
                    let temp1 = pick1.style.background;
                    pick1.style.background = '#19647E';
                    pick2.style.background = '#19647E';
                    pick1 = '';
                    pick2 = '';
                    event.target.style.background = randomizeImages[6];
                    cardPicks.pick1.style.background = `${temp1}`;
                    newAttempts +=1;
                    if (matches === 4) {
                        setTimeout(function () {
                            alert('Congrats! You win foo!!');
                        }, 100);
                        if (localStorage.attempts === undefined || newAttempts < localStorage.attempts) {
                            bestScore.innerText = `Best Score: ${newAttempts}`;
                            localStorage.setItem("attempts", JSON.stringify(newAttempts));
                        }
                    }
                    for (const key in cardPicks) {
                        delete cardPicks[key];
                    }
                } else {
                    setTimeout(function () {
                        pick1.style.background = '#19647E';
                        pick2.style.background = '#19647E';
                        pick1 = '';
                        pick2 = '';
                    }, 1000);
                    newAttempts +=1;
                    for (const key in cardPicks) {
                        delete cardPicks[key];
                    }
                }
            }
        })

        const card8 = document.getElementById("card8");
        card8.addEventListener('click', function (event) {
            if (pick1 != undefined && pick2 != undefined) {
                if (pick1.style != undefined && pick2.style != undefined) {
                    console.log('test2');
                    return;
                }
            }
            if (card8.style.background != '' && card8.style.background === 'rgb(25, 100, 126))' || (card8.style.background === randomizeImages[7])) {
                console.log('test3');
                return;
            }
            event.target.style.background = randomizeImages[7];
            if (cardPicks === undefined || Object.keys(cardPicks).length === 0) {
                cardPicks = { pick1: card8 };
                pick1 = cardPicks.pick1;
                console.log('test1');
            } else {
                cardPicks.pick2 = card8;
                pick2 = cardPicks.pick2;
                if (pick1.style.background === pick2.style.background) {
                    let temp1 = pick1.style.background;
                    pick1.style.background = '#19647E';
                    pick2.style.background = '#19647E';
                    pick1 = '';
                    pick2 = '';
                    event.target.style.background = randomizeImages[7];
                    cardPicks.pick1.style.background = `${temp1}`;
                    matches += 1;
                    newAttempts +=1;
                    if (matches === 4) {
                        setTimeout(function () {
                            alert('Congrats! You win foo!!');
                        }, 100);
                        if (localStorage.attempts === undefined || newAttempts < localStorage.attempts) {
                            bestScore.innerText = `Best Score: ${newAttempts}`;
                            localStorage.setItem("attempts", JSON.stringify(newAttempts));
                        }
                    }
                    for (const key in cardPicks) {
                        delete cardPicks[key];
                    }
                } else {
                    setTimeout(function () {
                        pick1.style.background = '#19647E';
                        pick2.style.background = '#19647E';
                        pick1 = '';
                        pick2 = '';
                    }, 1000);
                    newAttempts +=1;
                    for (const key in cardPicks) {
                        delete cardPicks[key];
                    }
                }
            }
        })    
    })
