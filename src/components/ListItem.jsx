import React, {useRef} from "react";
import styled from "styled-components";
import {DragPreviewImage, useDrag, useDrop} from "react-dnd";
import {ItemTypes} from "../Constants";
import photoFile from './../images/file.png'

const Elem = styled.div`
    width: 65%;
    border-radius: 15px;
    height: 20px;
    margin: 5px 0;
    background-color: white;
    padding: 5px;
    &:hover{
        background-color:  #6eff47;
        cursor: pointer;
    }
`;

const Item = ({name, title, id, index, moveUser}) => {

    const ref = useRef(null);
    const [, drop] = useDrop({
        accept: ItemTypes.ItemList,
        hover(item, monitor) {
            if(!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;

            if(dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) /2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if(dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            moveUser(dragIndex, hoverIndex, item.parent);

            item.index = hoverIndex;
        }
    });


    const [{isDragging}, drag] = useDrag({
        item: {type: ItemTypes.ItemList, parent: title, id, index},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0.3 : 1;
    drag(drop(ref));
    return  <Elem
        ref={ref}
        style={{
            opacity: opacity
        }}
    >{name}</Elem>
};

export default Item