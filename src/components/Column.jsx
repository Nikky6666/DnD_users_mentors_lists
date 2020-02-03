import React, {useState} from "react";
import styled from "styled-components";
import Item from "./ListItem";
import {useDrop} from "react-dnd";
import {ItemTypes} from "../Constants";
import AddPersonForm from "./AddPersonForm";

const WrapperColumn = styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    text-align: center;
    &>div:not(:last-child){
       border-bottom: 2px solid black;
    }
`;

const List = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-top: 20px;
`;


const Column = ({moveUser, people, title, addPerson, replacePerson}) => {


    const [, drop] = useDrop({
        accept: ItemTypes.ItemList,
        canDrop: (item) => title!==item.parent,
        drop: (item) => {replacePerson(item.id, item.parent)},
        collect: (mon, props) => ({
            isOver: !!mon.isOver(),
            canDrop: !!mon.canDrop(),
        })
    });

  return  <WrapperColumn>
       <div><h1>{title}</h1></div>
     <AddPersonForm description={"New " +title.slice(0, title.length-1).toLowerCase()} addPerson={addPerson}/>
      <List ref={drop}>
          {people.map((m, index) => <Item moveUser={moveUser} index={index} key={m.id} name={m.name} title={title} id={m.id}/>)}
      </List>
  </WrapperColumn>
};

export default Column;
