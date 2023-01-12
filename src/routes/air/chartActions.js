import moment from "moment";

export function getHourlyData(rawData) {
    rawData = rawData.map((o) => {
        return {
            x: moment(o.readAt * 1000),
            y: o.ppm
        };
    });

    let out = [];
    // Initialize out with 8 hours, starting from 8 hours from the present to the present+1hour
    for (let i = 8; i >=-1; i--) {
        let hour = moment().second(0).minute(0).subtract(i, "h");
        out.push({
            x: hour,
            y: null
        });
    }

    for (let i = 0; i < out.length-1; ++i) {
        let ppmAccumulator = 0;
        let ppmCounter = 0;
        for (let j = 0; j < rawData.length; ++j) {
            // console.log("rawData", rawData[j]);
            // console.log("between:", out[i].x, out[i+1].x);
            // console.log("between:", rawData[j].x.isBetween(out[i].x, out[i].x.add(1, "h")));
            try {
                if (rawData[j].x.isBetween(out[i].x, out[i+1].x)) {
                    ppmAccumulator += rawData[j].y;
                    ppmCounter++;
                }
            } catch (error) {
                console.error(`Error on idx ${j} ${i}, ${error}`);
            }
        }

        out[i].y = ppmAccumulator / ppmCounter;
    }

    return out;
}

export function getDailyData(rawData) {
    rawData = rawData.map((o) => {
        return {
            x: moment(o.readAt * 1000),
            y: o.ppm
        };
    });

    let out = [];
    // Initialize out with 8 days, starting from 7 days from the present to the present+1 day
    for (let i = 7; i >=-1; i--) {
        let day = moment().second(0).minute(0).hour(0).subtract(i, "d");
        out.push({
            x: day,
            y: null
        });
    }

    for (let i = 0; i < out.length-1; ++i) {
        let ppmAccumulator = 0;
        let ppmCounter = 0;
        for (let j = 0; j < rawData.length; ++j) {
            // console.log("rawData", rawData[j]);
            // console.log("between:", out[i].x, out[i+1].x);
            // console.log("between:", rawData[j].x.isBetween(out[i].x, out[i].x.add(1, "h")));
            try {
                if (rawData[j].x.isBetween(out[i].x, out[i+1].x)) {
                    ppmAccumulator += rawData[j].y;
                    ppmCounter++;
                }
            } catch (error) {
                console.error(`Error on idx ${j} ${i}, ${error}`);
            }
        }

        out[i].y = ppmAccumulator / ppmCounter;
    }

    console.log(out)
    return out;
}