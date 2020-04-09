import { firestore } from "../../../../fb_config";
import { resetFlightsModal } from "./flights";
import { checkFlights } from "../../pages/booking/flightsChecker";

export const addNewFlight = (agency: string, flightDate: object): void => {
    const {
        date,
        month,
        year,
        hour,
        minute
    } = flightDate;
    const finalDate: string = `${date}.${month}.${year}.${hour}.${minute}`;

    firestore.collection(`seats`).doc(`${agency}`)
        .get()
        .then((resp: object) => {
            firestore.collection('seats').doc(`${agency}`)
                .set({
                    ...resp.data(),
                    [finalDate]: []
                })
                .then(() => {
                    const page = document.title;
                    checkFlights(page);
                    resetFlightsModal();
                })
        })
        .catch((error: object) => console.error(`Get seats: ${error}`))
}