var axios = require('axios');
const RouteService = {};

RouteService.getRouteStatus = route => {
    // console.log('Route Service: ', route?.apiUrl);
    // return Promise.resolve({
    //     "routeLiveInfo": {
    //         "-Nv1pluAwARLpzs0wmUa": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.865204,\"eta\":189,\"vNo\":\"417\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.045313,\"tS\":1712667434000,\"sId\":\"lrLRBtaE\"}",
    //         "-Nv1ih_6oDvDIHAO7F0c": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.881615,\"eta\":48,\"vNo\":\"421\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.053019,\"tS\":1712667434000,\"sId\":\"BKMzmRvo\"}",
    //         "-Nv0LmQ1zvG03Wp-nUkk": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.963173,\"eta\":61,\"vNo\":\"6608\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.153763,\"tS\":1712641691000,\"sId\":\"YldYGAGJ\"}"
    //     },
    //     "stopsEta": {
    //         "lrLRBtaE": {
    //             "-Nv1pluAwARLpzs0wmUa": "{\"lSId\":\"eQewrnTx\",\"eta\":189,\"isHalted\":false,\"vNo\":\"417\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712667434000}",
    //             "-Nv1ih_6oDvDIHAO7F0c": "{\"lSId\":\"eQewrnTx\",\"eta\":318,\"isHalted\":false,\"vNo\":\"421\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712667434000}",
    //             "-Nv0LmQ1zvG03Wp-nUkk": "{\"lSId\":\"eQewrnTx\",\"eta\":3100,\"isHalted\":false,\"vNo\":\"6608\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712641691000}"
    //         }
    //     }
    // })
    return axios.get(route.apiUrl, {params: {stopIds: route.defaultStopId}}).then(response => {
        // console.log('axios success: ', response.data );
        // sample response from chalo console : at 6:26pm 9 April 2024
        // {
        //     "routeLiveInfo": {
        //         "-Nv1pluAwARLpzs0wmUa": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.866631,\"eta\":170,\"vNo\":\"417\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.047113,\"tS\":1712667383000,\"sId\":\"lrLRBtaE\"}",
        //         "-Nv1ih_6oDvDIHAO7F0c": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.884773,\"eta\":26,\"vNo\":\"421\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.054621,\"tS\":1712667384000,\"sId\":\"rRsnwcJL\"}",
        //         "-Nv0LmQ1zvG03Wp-nUkk": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.963173,\"eta\":61,\"vNo\":\"6608\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.153763,\"tS\":1712641691000,\"sId\":\"YldYGAGJ\"}"
        //     },
        //     "stopsEta": {
        //         "pVQKfTnd": {
        //             "-Nv1pluAwARLpzs0wmUa": "{\"lSId\":\"eQewrnTx\",\"eta\":-1,\"isHalted\":false,\"vNo\":\"417\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712667383000}",
        //             "-Nv1ih_6oDvDIHAO7F0c": "{\"lSId\":\"eQewrnTx\",\"eta\":-1,\"isHalted\":false,\"vNo\":\"421\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712667384000}",
        //             "-Nv0LmQ1zvG03Wp-nUkk": "{\"lSId\":\"eQewrnTx\",\"eta\":-1,\"isHalted\":false,\"vNo\":\"6608\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712641691000}"
        //         },
        //         "lrLRBtaE": {
        //             "-Nv1pluAwARLpzs0wmUa": "{\"lSId\":\"eQewrnTx\",\"eta\":170,\"isHalted\":false,\"vNo\":\"417\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712667383000}",
        //             "-Nv1ih_6oDvDIHAO7F0c": "{\"lSId\":\"eQewrnTx\",\"eta\":417,\"isHalted\":false,\"vNo\":\"421\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712667384000}",
        //             "-Nv0LmQ1zvG03Wp-nUkk": "{\"lSId\":\"eQewrnTx\",\"eta\":3100,\"isHalted\":false,\"vNo\":\"6608\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712641691000}"
        //         }
        //     }
        // }


        // Sample Response from Axios at 6:26pm 9 April 2024
        // {
        //     "routeLiveInfo": {
        //         "-Nv1pluAwARLpzs0wmUa": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.865204,\"eta\":189,\"vNo\":\"417\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.045313,\"tS\":1712667434000,\"sId\":\"lrLRBtaE\"}",
        //         "-Nv1ih_6oDvDIHAO7F0c": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.881615,\"eta\":48,\"vNo\":\"421\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.053019,\"tS\":1712667434000,\"sId\":\"BKMzmRvo\"}",
        //         "-Nv0LmQ1zvG03Wp-nUkk": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.963173,\"eta\":61,\"vNo\":\"6608\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.153763,\"tS\":1712641691000,\"sId\":\"YldYGAGJ\"}"
        //     },
        //     "stopsEta": {
        //         "lrLRBtaE": {
        //             "-Nv1pluAwARLpzs0wmUa": "{\"lSId\":\"eQewrnTx\",\"eta\":189,\"isHalted\":false,\"vNo\":\"417\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712667434000}",
        //             "-Nv1ih_6oDvDIHAO7F0c": "{\"lSId\":\"eQewrnTx\",\"eta\":318,\"isHalted\":false,\"vNo\":\"421\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712667434000}",
        //             "-Nv0LmQ1zvG03Wp-nUkk": "{\"lSId\":\"eQewrnTx\",\"eta\":3100,\"isHalted\":false,\"vNo\":\"6608\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712641691000}"
        //         }
        //     }
        // }
        return response.data
    }).catch(err => {
        console.log('axios err', err)
        throw err;
    });
}

module.exports = RouteService;
//
//
// {
//     "action": "success",
//     "data": {
//     "routeLiveInfo": {
//         "-Nv2MVWd_egsQWI5eB2Y": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.831909,\"eta\":96,\"vNo\":\"6602\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.014889,\"tS\":1712675130000,\"sId\":\"vNKKCWiK\"}",
//             "-Nv2GyEFYKvTvM5WGQZq": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.931786,\"eta\":38,\"vNo\":\"6593\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.106913,\"tS\":1712675123000,\"sId\":\"ekYlFCTA\"}",
//             "-Nv25Hci5kdsf-BPeBXS": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.84227,\"eta\":0,\"vNo\":\"6609\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.023054,\"tS\":1712675127000,\"sId\":\"nclVShQJ\"}",
//             "-Nv275lT6NXdxmITwjVH": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.845535,\"eta\":212,\"vNo\":\"6597\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.05283,\"tS\":1712675128000,\"sId\":\"WYJQpcxT\"}",
//             "-Nv1z6avxnYB1j7pOlCu": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.840881,\"eta\":0,\"vNo\":\"6610\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.020061,\"tS\":1712675117000,\"sId\":\"hHDRIRNv\"}",
//             "-Nv0LmQ1zvG03Wp-nUkk": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.963173,\"eta\":61,\"vNo\":\"6608\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.153763,\"tS\":1712641691000,\"sId\":\"YldYGAGJ\"}"
//     },
//     "stopsEta": {
//         "lrLRBtaE": {
//             "-Nv2MVWd_egsQWI5eB2Y": "{\"lSId\":\"eQewrnTx\",\"eta\":-1,\"isHalted\":false,\"vNo\":\"6602\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712675130000}",
//                 "-Nv2GyEFYKvTvM5WGQZq": "{\"lSId\":\"eQewrnTx\",\"eta\":2020,\"isHalted\":false,\"vNo\":\"6593\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712675123000}",
//                 "-Nv25Hci5kdsf-BPeBXS": "{\"lSId\":\"eQewrnTx\",\"eta\":-1,\"isHalted\":false,\"vNo\":\"6609\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712675127000}",
//                 "-Nv275lT6NXdxmITwjVH": "{\"lSId\":\"eQewrnTx\",\"eta\":-1,\"isHalted\":false,\"vNo\":\"6597\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712675128000}",
//                 "-Nv1z6avxnYB1j7pOlCu": "{\"lSId\":\"eQewrnTx\",\"eta\":-1,\"isHalted\":false,\"vNo\":\"6610\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712675117000}",
//                 "-Nv0LmQ1zvG03Wp-nUkk": "{\"lSId\":\"eQewrnTx\",\"eta\":3100,\"isHalted\":false,\"vNo\":\"6608\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712641691000}"
//         }
//     }
// }
// }

//
// CHALO: 8:36 9 Apr
// {
//     "routeLiveInfo": {
//     "-Nv2MVWd_egsQWI5eB2Y": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.831284,\"eta\":70,\"vNo\":\"6602\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.01446,\"tS\":1712675170000,\"sId\":\"vNKKCWiK\"}",
//         "-Nv2GyEFYKvTvM5WGQZq": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.92971,\"eta\":11,\"vNo\":\"6593\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.102068,\"tS\":1712675173000,\"sId\":\"KEKOXUlJ\"}",
//         "-Nv25Hci5kdsf-BPeBXS": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.84227,\"eta\":0,\"vNo\":\"6609\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.023052,\"tS\":1712675168000,\"sId\":\"nclVShQJ\"}",
//         "-Nv275lT6NXdxmITwjVH": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.84343,\"eta\":165,\"vNo\":\"6597\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.051914,\"tS\":1712675162000,\"sId\":\"WYJQpcxT\"}",
//         "-Nv1z6avxnYB1j7pOlCu": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.840881,\"eta\":0,\"vNo\":\"6610\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.020061,\"tS\":1712675117000,\"sId\":\"hHDRIRNv\"}",
//         "-Nv0LmQ1zvG03Wp-nUkk": "{\"lSId\":\"eQewrnTx\",\"_longitude\":72.963173,\"eta\":61,\"vNo\":\"6608\",\"opId\":\"1909\",\"_isHalted\":false,\"_latitude\":19.153763,\"tS\":1712641691000,\"sId\":\"YldYGAGJ\"}"
// },
//     "stopsEta": {
//     "pVQKfTnd": {
//         "-Nv2MVWd_egsQWI5eB2Y": "{\"lSId\":\"eQewrnTx\",\"eta\":-1,\"isHalted\":false,\"vNo\":\"6602\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712675170000}",
//             "-Nv2GyEFYKvTvM5WGQZq": "{\"lSId\":\"eQewrnTx\",\"eta\":-1,\"isHalted\":false,\"vNo\":\"6593\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712675173000}",
//             "-Nv25Hci5kdsf-BPeBXS": "{\"lSId\":\"eQewrnTx\",\"eta\":-1,\"isHalted\":false,\"vNo\":\"6609\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712675168000}",
//             "-Nv275lT6NXdxmITwjVH": "{\"lSId\":\"eQewrnTx\",\"eta\":-1,\"isHalted\":false,\"vNo\":\"6597\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712675162000}",
//             "-Nv1z6avxnYB1j7pOlCu": "{\"lSId\":\"eQewrnTx\",\"eta\":-1,\"isHalted\":false,\"vNo\":\"6610\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712675117000}",
//             "-Nv0LmQ1zvG03Wp-nUkk": "{\"lSId\":\"eQewrnTx\",\"eta\":-1,\"isHalted\":false,\"vNo\":\"6608\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712641691000}"
//     },
//     "lrLRBtaE": {
//         "-Nv2MVWd_egsQWI5eB2Y": "{\"lSId\":\"eQewrnTx\",\"eta\":-1,\"isHalted\":false,\"vNo\":\"6602\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712675170000}",
//             "-Nv2GyEFYKvTvM5WGQZq": "{\"lSId\":\"eQewrnTx\",\"eta\":1954,\"isHalted\":false,\"vNo\":\"6593\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712675173000}",
//             "-Nv25Hci5kdsf-BPeBXS": "{\"lSId\":\"eQewrnTx\",\"eta\":-1,\"isHalted\":false,\"vNo\":\"6609\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712675168000}",
//             "-Nv275lT6NXdxmITwjVH": "{\"lSId\":\"eQewrnTx\",\"eta\":-1,\"isHalted\":false,\"vNo\":\"6597\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712675162000}",
//             "-Nv1z6avxnYB1j7pOlCu": "{\"lSId\":\"eQewrnTx\",\"eta\":-1,\"isHalted\":false,\"vNo\":\"6610\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712675117000}",
//             "-Nv0LmQ1zvG03Wp-nUkk": "{\"lSId\":\"eQewrnTx\",\"eta\":3100,\"isHalted\":false,\"vNo\":\"6608\",\"ag\":\"BEST\",\"dest\":\"Worli Depot\",\"rN\":\"C-54\",\"tS\":1712641691000}"
//     }
// }
// }
