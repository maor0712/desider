import { createContext, useReducer } from "react";

export const OptionsContext = createContext({
    options: [],
    addOption: ({option, chance}) => {},
   // setOptions: (options) => {}, 
    deleteOption: (id) => {},
    updateOption: (id,{option, chance}) => {},
});

function optionReducer(state, action){

    switch (action.type){
        case 'ADD':
            return [action.payload, ...state]
/*         case 'SET':
            const inverted = action.payload.reverse()
            return inverted; */
        case 'UPDATE':
            const updatebleOptionIndex = state.findIndex((option) => option.id === action.payload.id);
            const updatbleOption = state[updatebleOptionIndex];
            const updatbleItem = {...updatbleOption, ...action.payload.data};
            const updatedOptions = [...state]
            updatedOptions[updatebleOptionIndex] = updatbleItem;
            return updatedOptions
        case 'DELETE':
            return state.filter((option) => option.id !== action.payload)
        default:
            return state;
    }
}




export default function OptionsContexProvider({children}){

    const [optionState, dispatch] = useReducer(optionReducer, [])

    function addOption(optionData){
        dispatch({ type: 'ADD', payload: optionData})
    }

/*     function setOptions(options){
        dispatch({ type: 'SET', payload: options})
    } */

    function updateOption(id, optionData){
        dispatch({ type: 'UPDATE', payload: { id: id, data: optionData}})
    }

    function deleteOption(id){
        dispatch({ type: 'DELETE', payload: id})
    }

    const value = {
        options: optionState,
        // setOptions: setOptions,
        addOption: addOption,
        updateOption: updateOption,
        deleteOption: deleteOption
    }

    return <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>
}

