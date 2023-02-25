const donutData = require('../data/donuts.json');

const donutService = {
    // Returns all donuts
    getAllDonuts: () => {
        return donutData;
    },

    // Returns only donuts with a specific batter type
    getDonutsByBatter: (batterType) => {
        // TODO: Implement this
        return donutData.filter(donut => {

            // Batter is also an array so we need an inner filter
            
             const matchingBatters = donut.batters.batter.filter( batter => {
                return batter.type.toLowerCase() === batterType.toLowerCase();
             });

             return matchingBatters.length > 0;
             
        });

        ///?batter=chocolate

        // or const donutFound = donutData.filter
        // return donutFound
    }
};

// Specifying what to export 
module.exports = donutService;
