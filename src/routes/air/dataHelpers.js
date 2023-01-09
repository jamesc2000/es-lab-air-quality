import moment from "moment";

export function transformData(data) {
    let out = {
        x: data.readAt * 1000,
        y: data.ppm
    };

    return out;
}