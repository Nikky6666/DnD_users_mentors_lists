import React, {useCallback, useReducer} from 'react';
import styled from 'styled-components'
import Table from "./components/Table";
import {DndProvider} from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper'


const WrapperApp = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #0334ff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

//Math.floor(Math.random()*500)
function App() {

    const initialState = {
        users: [
            {id: 45, name: "Jey"},
            {id: 41, name: "Nikky"}
            ],
        mentors: [
            {id: 35, name: "Kris"},
            {id: 51, name: "Lem"}
            ]
    };
    const reducer = (state, action)=> {
        switch (action.type) {
            case 'ADD_PERSON':
              return   {
                ...state, [action.category]: [...state[action.category], {id:  Math.floor(Math.random()*500), name: action.name}]
            };
            case 'REPLACE_PERSON':
                const lastElementCategory = action.parentColumn === "Users" ? "users" : "mentors";
                const newElementCategory = action.parentColumn === "Users" ? "mentors" : "users";
                const replacedPerson = state.users.find(u => u.id===action.userId) || state.mentors.find(m=>m.id===action.userId);
                return {
                    ...state, [lastElementCategory]: state[lastElementCategory].filter(p => p.id !== action.userId),
                    [newElementCategory]: [...state[newElementCategory], replacedPerson]
                };
            case 'MOVE_USER':
            {
                const dragUser = state[action.category][action.dragUserIndex];
                return update(state, {[action.category]: {
                        $splice: [
                            [action.dragUserIndex, 1],
                            [action.hoverUserIndex, 0, dragUser]
                        ]
                    }
                })

            }

            default: return state;
        }
    };
    const [state, dispatch] = useReducer(reducer, initialState);


    const addUser = (name) => {
        dispatch({type: 'ADD_PERSON', category: "users", name})
    };
    const addMentor = (name) => {
        dispatch({type:'ADD_PERSON', category: "mentors", name})
    };
    const moveUser = (dragUserIndex, hoverUserIndex, parentColumn) => {
      dispatch({type: 'MOVE_USER', dragUserIndex, hoverUserIndex, category: parentColumn.toLowerCase()})
    };
    const replacePerson = (userId, parentColumn) => {
        dispatch({type: 'REPLACE_PERSON', userId, parentColumn})
    };
    return (
        <DndProvider backend={Backend}>
            <WrapperApp>
                <Table
                    users={state.users}
                    mentors={state.mentors}
                    addUser={addUser}
                    addMentor = {addMentor}
                    moveUser={moveUser}
                    replacePerson={replacePerson}
                />
            </WrapperApp>
        </DndProvider>
    );
}

export default App;
