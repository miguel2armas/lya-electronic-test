import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Card, Col, Container, Row, Form} from "react-bootstrap";
import DatePicker from "react-datepicker";
import {createToDoAPI, dataToDoAPI, deleteToDoAPI, editToDoAPI} from "../../redux/apiFuntions";
const moment = require('moment');
const Home = () => {
    const dispatch = useDispatch();
    const initData = {
        dateMax: new Date(),
        title: "0",
        description: "",
    };
    useEffect(()=>{
        dataToDoAPI(dispatch)
    }, [])
    let todoListData = useSelector((state)=>state.todoList);
    const [todoDataCreate, setTodoDataCreate] = useState(initData);
    const [editTodo, setEditTodo] = useState(false);
    const createTodo = async (e)=>{
        e.preventDefault();
        let date =  new Date();
        const setData = {
            dateMax: todoDataCreate.dateMax,
            title: todoDataCreate.title,
            description: todoDataCreate.description,
            complete: false,
            createAt: date
        };
       await createToDoAPI(dispatch, setData);
        setTodoDataCreate(initData);
    }
    const changeComplete = async (data) => await editToDoAPI(dispatch, data);
    const deleteToDo = async (data) => await deleteToDoAPI(dispatch, data);

  return <div className="py-4">
        <Container>
            <Row>
                <Col xs={12} md={6}>
                    <Card>
                        <Form onSubmit={(e)=>createTodo(e)}>
                        <Card.Body>
                                <Form.Group className="mb-3">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Select value={todoDataCreate.title} onChange={(e) => setTodoDataCreate({...todoDataCreate, title: e.target.value})}>
                                        <option value="0">Regular To-Do</option>
                                        <option value="1">Priority One</option>
                                        <option value="2">Priority Two</option>
                                        <option value="3">Priority Three</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control onChange={(e)=> setTodoDataCreate({...todoDataCreate, description: e.target.value})}
                                                  as="textarea" rows={3} value={todoDataCreate.description}/>
                                </Form.Group>
                                <DatePicker
                                    dateFormat="yyyy/MM/dd"
                                    selected={todoDataCreate.dateMax}
                                    onChange={(date) => setTodoDataCreate({...todoDataCreate, dateMax: date})}
                                />
                        </Card.Body>
                        <Card.Footer className="text-end">
                            <Button type={"submit"} variant={"success"}>
                                Create To-Do
                            </Button>
                        </Card.Footer>
                        </Form>
                    </Card>
                </Col>
                <Col xs={12} md={6}>
                    {todoListData.length===0?(
                        <div>noData</div>
                    ):(
                        todoListData.map((todoL, key)=>{
                            return <Card key={key} className={todoL.title==="1"?('border border-primary my-2'):
                                todoL.title==="2"?('border border-warning my-2'):
                                    todoL.title==="3"?('border border-danger my-2'):('my-2')}>
                                <Card.Header className={todoL.complete?('bg-complete text-white'):('')}>
                                    <div className="d-flex justify-content-between">
                                        <span>Create: {moment(todoL.createAt).format("YYYY/MM/DD HH:mm")}</span>
                                        <span>Expire: {moment(todoL.dateMax).format("YYYY/MM/DD")}</span>
                                    </div>
                                </Card.Header>
                                <Card.Body>
                                    {todoL.description}
                                </Card.Body>
                                <Card.Footer>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <Form.Check checked={todoL.complete} type="checkbox" label="Complete?" onChange={()=>changeComplete(todoL)} />
                                        <Button variant={"primary"}>
                                            Edit
                                        </Button>
                                        <Button variant={"danger"} onClick={()=>deleteToDo(todoL)}>
                                            Delete
                                        </Button>
                                    </div>
                                </Card.Footer>

                            </Card>
                        })
                    )
                    }
                </Col>
            </Row>
        </Container>
        </div>
}
export default Home