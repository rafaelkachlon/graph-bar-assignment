export interface Room {
    id: number;
    name: string;
    buildingName: string;
    labels: number[];
    capacity: number;
    hasProjector: boolean;
    hasTv: boolean;
}