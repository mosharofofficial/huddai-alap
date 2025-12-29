import {create} from "zustand";

export const useAuthStore = create((set) => ({
    authUser: {name: "Niloy", _id: 12345, age: 23},
    isLoggedIn: false,
    isLoading: false,

    login: ()=> {
        console.log("I just login");
        set({isLoggedIn:true, isLoading:true});
    },
}));