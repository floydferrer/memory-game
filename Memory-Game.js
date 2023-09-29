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
    'url("https://i1.sndcdn.com/avatars-000190650504-jrmv6n-t500x500.jpg")',
    'url("https://pm1.aminoapps.com/6291/a17bc6bf0e310fb983dccc1331a5e8dfa45b69db_hq.jpg")',
    'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/047da9c0-900c-4b16-be2f-94973fb25197/d9m0xfh-1a152bf8-0b0d-4a95-87b4-748f8eb044cf.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvaS8wNDdkYTljMC05MDBjLTRiMTYtYmUyZi05NDk3M2ZiMjUxOTcvZDltMHhmaC0xYTE1MmJmOC0wYjBkLTRhOTUtODdiNC03NDhmOGViMDQ0Y2YucG5nIn1dXX0.KqpHbLIH9UXVNmKgWdLXiWWX1wjFjoZ8IhfjuIC3rhg")',
    'url("https://pm1.aminoapps.com/6263/32eadd7789ec76831e2bb01decb02051b9498006_hq.jpg")',
    'url("https://i1.sndcdn.com/avatars-000190650504-jrmv6n-t500x500.jpg")',
    'url("https://pm1.aminoapps.com/6291/a17bc6bf0e310fb983dccc1331a5e8dfa45b69db_hq.jpg")',
    'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/047da9c0-900c-4b16-be2f-94973fb25197/d9m0xfh-1a152bf8-0b0d-4a95-87b4-748f8eb044cf.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwic3ViIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsImF1ZCI6WyJ1cm46c2VydmljZTpmaWxlLmRvd25sb2FkIl0sIm9iaiI6W1t7InBhdGgiOiIvaS8wNDdkYTljMC05MDBjLTRiMTYtYmUyZi05NDk3M2ZiMjUxOTcvZDltMHhmaC0xYTE1MmJmOC0wYjBkLTRhOTUtODdiNC03NDhmOGViMDQ0Y2YucG5nIn1dXX0.KqpHbLIH9UXVNmKgWdLXiWWX1wjFjoZ8IhfjuIC3rhg")',
    'url("https://pm1.aminoapps.com/6263/32eadd7789ec76831e2bb01decb02051b9498006_hq.jpg")'];

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