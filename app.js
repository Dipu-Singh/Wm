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
            console.log("llll", child.key)
            if (child.key == "Name of Network") {

                child.forEach(function (value) {
                    console.log(value.val())

                    ReD.push(value.val())
                })

            }
            if (child.key == "Power of Network") {

                child.forEach(function (value) {
                    console.log(value.val())
                    PeD.push(value.val())
                    if (ReD.length > 0) {

                        while (color.length < ReD.length) {
                            col = getRandomColor()
                            color.push(col)
                        }
                        console.log("#####", color.length)

                        if (color.length == PeD.length) {
                            console.log("???????????", color)
                            john(ReD, PeD, color)

                        }

                    }
                })
            }
        })

    });

}());



// var ctx = document.getElementById('myChart');
// var chart = new Chart(ctx, {
//     // The type of chart we want to create
//     type: 'line',

//     // The data for our dataset
//     data: {
//         labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//         datasets: [{
//             label: 'My First dataset',
//             backgroundColor: 'rgb(255, 99, 132)',
//             borderColor: 'rgb(255, 99, 132)',
//             data: [0, 10, 5, 2, 20, 30, 45]
//         }]
//     },

//     // Configuration options go here
//     options: {}
// });


function john(ReD, PeD, color) {
    const ctx = document.getElementById('myChart');

    Chart.defaults.scale.ticks.beginAtZero = true;
    console.log("______________", ReD);
    console.log("______________", PeD);
    const chart = new Chart(ctx, {

        type: 'doughnut',
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


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    console.log(">>>>>>>", color)
    return color;

}