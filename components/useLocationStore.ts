import { create } from "zustand";
import * as SQLite from 'expo-sqlite';

type LocationObj = {
    id: number,
    title: string,
    latitude: number,
    longitude: number
}

type LocationState = {
    locations: LocationObj[];
    getLocations: () => void;
    addLocation: (title:string, latitude:number, longitude:number) => void;
    updateLocation: (id: number, title:string, latitude:number, longitude:number) => void;
    deleteLocation: (id: number) => void;
}

const db = SQLite.openDatabase('db.db');

const useLocationStore = create<LocationState>((set, get) => ({
    locations: [],
    getLocations: () => {
        db.transaction(t => {
            t.executeSql(
                "SELECT * FROM locations;",
                [], 
                (_, {rows: { _array}}) => {set({locations: _array})}, 
                (_, error) => {console.error('Failed to fetch locations', error); return false})})
    },

    addLocation: (title, latitude, longitude) => {
        db.transaction(t => {
            t.executeSql(
                "INSERT INTO locations (title, latitude, longitude) VALUES (?,?,?);", 
                [title,latitude,longitude],
                () => {get().getLocations()},
                (_, error) => {
                    console.error('Failed to add new location', error); 
                    return false;
                }
            );
        });
    },

    updateLocation: (id, title, latitude, longitude) => {
        db.transaction(t => {
            t.executeSql(
                "UPDATE locations SET title = ?, latitude = ?, longitude = ? WHERE id = ?;",
                [title,latitude,longitude, id],
                () => {get().getLocations();
                },
                (_, error) => {
                    console.error('Failed to update location', error); 
                    return false;
                }
            )
        })
    },

    deleteLocation: (id) => {
        db.transaction(t => {
            t.executeSql(
                "DELETE FROM locations WHERE id = ?;",
                [id],
                () => {get().getLocations();
                },
                (_, error) => {
                    console.error('Failed to delete location', error); 
                    return false;
                }
            )
        })
    }
}))

export default useLocationStore;