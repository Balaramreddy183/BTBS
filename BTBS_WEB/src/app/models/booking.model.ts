export interface Booking {
    id: string;
    travelDate: Date;
    mobileNumber: string;
    seats: string[];
    boarded: boolean;
    createdAt: Date;
    totalAmount?: number;
    passengerName?: string;
}

export interface BookingFormData {
    travelDate: Date;
    mobileNumber: string;
    passengerName?: string;
}

export interface JourneyDetails {
    from: string;
    to: string;
    departureTime: string;
    arrivalTime: string;
    duration: string;
    busType: string;
    busNumber: string;
}
