import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import AddTaskIcon from "@mui/icons-material/AddTask";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { useLocation } from "react-router-dom";

import { todoAdd, todoModify } from "../../stores/todoSlice";
import Button from "../../components/UI/Button";
import useInput from "../../utils/hooks/useInput";
import "./TodoForm.css";

const isEmpty = (value) => value.trim() !== "";

const TodoForm = ({ action }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [status, setStatus] = useState(
        location.state ? location.state.status : "Pending"
    );
    console.log("form data ", location.state);
    const nameModifyValue = location.state?.name;
    const descModifyValue = location.state?.description;

    const {
        value: nameValue,
        isValid: isNameValid,
        isTouched: isNameTouched,
        onBlurHandler: nameBlurHandler,
        onClear: nameClear,
        onInputChangehandler: nameChangeHandler,
    } = useInput(isEmpty, nameModifyValue);
    const {
        value: descValue,
        isValid: isDescValid,
        isTouched: isDescTouched,
        onBlurHandler: descBlurHandler,
        onClear: descClear,
        onInputChangehandler: descChangeHandler,
    } = useInput(isEmpty, descModifyValue);

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log("submitted task !!", action);

        if (action === "add") {
            dispatch(
                todoAdd({
                    uuid: uuid(),
                    name: nameValue,
                    description: descValue,
                    status: status,
                    actions: null,
                })
            );
        } else {
            dispatch(
                todoModify({
                    uuid: location.state?.uuid,
                    name: nameValue,
                    description: descValue,
                    status: status,
                })
            );
        }

        history.push("/");
    };

    const onBackHandler = () => {
        history.push("/");
    };

    const onClearHandler = () => {
        nameClear();
        descClear();
        setStatus("Pending");
    };

    const statusHandler = (event) => {
        setStatus(event.target.value);
    };

    const isValid =
        isNameTouched && isNameValid && isDescTouched && isDescValid;

    const isModifyValid = isNameValid && isDescValid;

    return (
        <div
            className='TodoModifyContainer'
            data-bg-text={`Todo ${action.toUpperCase()}`}>
            <form className='TodoForm' onSubmit={onSubmitHandler}>
                <TextField
                    sx={{ width: 1 / 2 }}
                    id='standard-basic'
                    label='Task Name'
                    variant='standard'
                    error={!isNameValid}
                    value={nameValue}
                    onBlur={nameBlurHandler}
                    onChange={nameChangeHandler}
                />
                <TextField
                    sx={{ width: 1 / 2 }}
                    id='standard-multiline-static'
                    label='Task Description'
                    multiline
                    rows={2}
                    variant='standard'
                    error={!isDescValid}
                    value={descValue}
                    onBlur={descBlurHandler}
                    onChange={descChangeHandler}
                />
                <RadioGroup
                    row
                    aria-label='status'
                    name='controlled-radio-buttons-group'
                    onChange={statusHandler}
                    value={status}
                    defaultValue={status}>
                    <FormControlLabel
                        value='Pending'
                        control={<Radio />}
                        label='Pending'
                        labelPlacement='start'
                    />
                    <FormControlLabel
                        value='Progress'
                        control={<Radio />}
                        label='Progess'
                        labelPlacement='start'
                    />
                    <FormControlLabel
                        value='Completed'
                        control={<Radio />}
                        label='Completed'
                        labelPlacement='start'
                    />
                </RadioGroup>
                <div className='TodoSubmitActions'>
                    <Button
                        component={<ArrowBackIosNewIcon />}
                        onClick={onBackHandler}
                        label='Go Back'></Button>
                    <Button
                        component={<AddTaskIcon />}
                        type='submit'
                        disabled={location.state ? !isModifyValid : !isValid}
                        label={`${action} Task`}></Button>
                    <Button
                        component={<CancelIcon />}
                        onClick={onClearHandler}
                        disabled={location.state ? true : false}
                        label='Clear'></Button>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;
