import React, {useState} from "react";
import styled from "styled-components";

const Input = styled.input`
    margin: 5px;
    height: 30px;
`;

const AddPersonForm = ({addPerson, description}) => {

    const [inputValue, setInputValue] = useState("");
    const onChangeInput = (e) => {
        setInputValue(e.currentTarget.value);
    };
    const onKeyPress = (e) =>{
        if(e.key==="Enter"){
            addPerson(e.currentTarget.value);
            setInputValue("");
        }
    }
    return  <div>{description} <Input value={inputValue} onChange={onChangeInput} onKeyPress={onKeyPress}/>
</div>};
export default AddPersonForm;