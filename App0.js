// (function () {
//     // Your web app's Firebase configuration
//     var firebaseConfig = {
//         apiKey: "AIzaSyCfg_ucSDJS-Q5Ji8WUm1pgLfvAPawP4NY",
//         authDomain: "ty-wm-294a1.firebaseapp.com",
//         databaseURL: "https://ty-wm-294a1.firebaseio.com",
//         projectId: "ty-wm-294a1",
//         storageBucket: "ty-wm-294a1.appspot.com",
//         messagingSenderId: "53111768824",
//         appId: "1:53111768824:web:d9c2329405728f92ad9d0d",
//         measurementId: "G-M2L4K121G4"
//     };
//     // Initialize Firebase
//     firebase.initializeApp(firebaseConfig);
//     // firebase.analytics();
//     // Get Element
//     const preObject = document.getElementById('object');
//     // create referances
//     const dbRefObject = firebase.database().ref().child('object');

//     // Sync Object changes
//     dbRefObject.on('value', snap => console.log(sanp.val()));

// }());

(function () {
    // Your web app's Firebase configuration

    var firebaseConfig = {
        apiKey: "AIzaSyCfg_ucSDJS-Q5Ji8WUm1pgLfvAPawP4NY",
        authDomain: "ty-wm-294a1.firebaseapp.com",
        databaseURL: "https://ty-wm-294a1.firebaseio.com",
        projectId: "ty-wm-294a1",
        storageBucket: "ty-wm-294a1.appspot.com",
        messagingSenderId: "53111768824",
        appId: "1:53111768824:web:d9c2329405728f92ad9d0d",
        measurementId: "G-M2L4K121G4"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics(); //  google - a
    // Get Element
    var preObject = document.getElementById('object');
    // create referances
    var dbRefObject = firebase.database().ref(); // refferance <- DB
    var ReD = []; // array-list * Dynamic 
    var PeD = []; // For Power 
    var SqD = []; // For scurity
    var color = [];
    var col;

    // Sync Object changes
    // dbRefObject.on('value', snap => console.log(sanp.val()));
    // firebase > Project > Wifi-Status // Data Flow 
    dbRefObject.child("Wifi-Status").on('value', function (snap) {
        // Snap -> 
        console.log("MMMMMMMMMM", snap.val()) // pointing > obj
        console.log("MMMMMMMMMM", snap.key)
        snap.forEach(function (child) {

            if (child.key == "Name of Network") {

                child.forEach(function (value) {
                    console.log(value.val())

                    ReD.push(value.val())
                })

            }


            if (child.key == "Power of Network") {

                child.forEach(function (value) {

                    PeD.push(value.val())
                    if (ReD.length > 0) {

                        while (color.length < ReD.length) {
                            col = getRandomColor()
                            color.push(col)
                            // Mapping all color with update and Data
                        }

                        if (color.length == PeD.length) {

                            Test1(ReD, PeD, color)

                        }

                    }
                })
            }


            if (child.key == "S_Status of Network") {


                child.forEach(function (value) {
                    console.log(value.val())
                    SqD.push(value.val())
                    if (ReD.length > 0) {

                        while (color.length < ReD.length) {
                            col = getRandomColor()
                            color.push(col)
                        }
                        console.log("#####", color.length)

                        if (color.length == SqD.length) {

                            Test2(ReD, SqD, color)

                        }

                    }
                })
            }

        })

    });

}());


// Data @ 1 Power Chart 1
function Test1(ReD, PeD, color) {
    const ctx = document.getElementById('myChart');

    Chart.defaults.scale.ticks.beginAtZero = true;

    const chart = new Chart(ctx, {

        type: 'doughnut', // Type of Chart
        data: {
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: ReD,
            datasets: [{
                label: 'Power',

                backgroundColor: color,
                data: PeD,

            }]
        },
        options: {
            maintainAspectRatio: false,
            animation: {
                animateScale: true
            }
        }


    });
}

// Data @ 2 Scurity Chart 2
function Test2(ReD, SqD, color) {
    const ctx = document.getElementById('myChart10');

    Chart.defaults.scale.ticks.beginAtZero = true;
    const chart = new Chart(ctx, {

        type: 'polarArea', // Type of Chart
        data: {
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: ReD,
            datasets: [{
                label: 'Signal',

                backgroundColor: color,
                data: SqD,

            }]
        },
        options: {
            maintainAspectRatio: false,
            animation: {
                animateScale: true
            }
        }


    });
}


// Color Gen 
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(">>>>>>>", color) // Checkin Color hex code
    return color;

}