export interface Seat {
    id: string;
    row: number;
    column: 'A' | 'B' | 'C' | 'D';
    isBooked: boolean;
    bookingId?: string;
    price?: number;
    type?: 'window' | 'aisle' | 'middle';
}

export type SeatStatus = 'available' | 'selected' | 'booked';

export interface SeatPrice {
    base: number;
    windowSurcharge: number;
    total: number;
}
