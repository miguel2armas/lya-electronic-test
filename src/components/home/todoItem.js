import React, {useState} from "react";
import {Alert, Button, Card, Col, Form} from "react-bootstrap";
import moment from "moment";
import {deleteToDoAPI, editToDoAPI} from "../../redux/apiFuntions";
import {useDispatch} from "react-redux";
import {AiOutlineCheckCircle, IoMdSave, MdDeleteForever, MdRadioButtonUnchecked, RiEdit2Fill} from "react-icons/all";

const TodoItem = (props) => {
    const dispatch = useDispatch();
    const [editTodo, setEditTodo] = useState(false);
    const [editDescriptionTodo, setEditDescriptionTodo] = useState("");
    const changeComplete = async (data) => {
        await editToDoAPI(dispatch, {...data, complete: !data.complete});
        props.todoListDataChage();
    };
    const deleteToDo = async (data) => {
        await deleteToDoAPI(dispatch, data);
        props.todoListDataChage();
    };
    const editDescription = ()=>{
        setEditDescriptionTodo(props.todoL.description);
        setEditTodo(true);
    }
    const saveEditDescription = async () =>{
        await editToDoAPI(dispatch, {...props.todoL, description: editDescriptionTodo});
        props.todoListDataChage();
        setEditTodo(false);
    }

  return <Alert variant={props.todoL.complete?("success"):("secondary")}>
            <div className="d-flex">
                <div className="align-self-center pe-3">
                    {props.todoL.complete?(
                        <Card className="p-1 bg-success text-white" onClick={()=>changeComplete(props.todoL)}>
                            <AiOutlineCheckCircle size="2em"/>
                        </Card>
                    ):(
                        <Card className="p-1 bg-secondary text-white" onClick={()=>changeComplete(props.todoL)}>
                            <MdRadioButtonUnchecked size="2em"/>
                        </Card>
                    )}
                </div>
                <Col>
                    <div className="d-flex justify-content-between">
                        <span>Expire: {moment(props.todoL.dateMax).format("YYYY/MM/DD")}</span>
                        <span>Create: {moment(props.todoL.createAt).format("YYYY/MM/DD HH:mm")}</span>
                        <div>
                            {editTodo?(
                                <Button variant={"success"} onClick={()=>saveEditDescription()}>
                                    <IoMdSave size="1.5em"/>
                                </Button>
                            ):(
                                <Button variant={"primary"} onClick={()=>editDescription()}>
                                    <RiEdit2Fill size="1.5em"/>
                                </Button>
                            )}
                            <Button variant={"danger"} className="mx-2" onClick={()=>deleteToDo(props.todoL)}>
                                <MdDeleteForever size="1.5em"/>
                            </Button>
                        </div>
                    </div>
                    <hr className="my-1"/>
                    {editTodo?(
                        <Form.Control onChange={(e)=> setEditDescriptionTodo(e.target.value)}
                                      as="textarea" rows={2} value={editDescriptionTodo}/>
                    ):(
                        <span>{props.todoL.description}</span>
                    )}
                </Col>
            </div>
          </Alert>
}
export default TodoItem