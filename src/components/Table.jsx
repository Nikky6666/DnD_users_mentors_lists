import React from "react";
import styled from "styled-components";
import Column from "./Column";

const WrapperTable = styled.div`
     display: flex;
     border: 3px solid black;
     width: 60%;
     height: 80%;
     overflow: auto;
     
     &>div:first-child{
     border-right: 3px solid black
     }
`;

const Table = ({moveUser, users, mentors, addUser, addMentor, replacePerson}) => {
    return <WrapperTable>
        <Column moveUser={moveUser} addPerson={addUser} replacePerson={replacePerson} people={users} title="Users"/>
        <Column moveUser={moveUser} addPerson={addMentor} replacePerson={replacePerson} people={mentors} title="Mentors"/>
    </WrapperTable>
};

export default Table;