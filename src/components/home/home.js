import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {dataToDoAPI} from "../../redux/apiFuntions";
import TodoItem from "./todoItem";
import logoImg from "../../assets/images/logo512.png"
import TodoCreate from "./todoCreate";
import {ImSortAmountDesc} from "react-icons/all";
const Home = () => {
    const dispatch = useDispatch();
    let todoListData = useSelector((state)=>state.todoList);
    const [selectOrder, setSelectOrder] = useState("description");
    const [todoListDataState, setTodoListDataState] = useState([]);
    const [todoListload, settodoListload] = useState(false);
    const todoListDataChage = () => settodoListload(true);
    useEffect(()=>{
        if(todoListDataState.length===0){
            todoListDataChage();
        }
        if(todoListload){
            setTodoListDataState(todoListData);
            settodoListload(false);
        }
        dataToDoAPI(dispatch);
    }, [todoListData])
    const changeOrder = (e) =>{
        e.preventDefault();
        todoListDataState.sort(function (a, b) {
            switch (selectOrder){
                case "description":
                    if (a.description > b.description) return 1;
                    if (a.description < b.description) return -1;
                    return 0;
                case "title":
                    if (a.title > b.title) return 1;
                    if (a.title < b.title) return -1;
                    return 0;
                case "dateMax":
                    if (a.dateMax > b.dateMax) return 1;
                    if (a.dateMax < b.dateMax) return -1;
                    return 0;
                case "createAt":
                    if (a.createAt > b.createAt) return 1;
                    if (a.createAt < b.createAt) return -1;
                    return 0;

                default:
                    return 0;
            }


        });
        setTodoListDataState(todoListDataState);
    }

  return <div className="py-4">
        <Container>
            <Row className="justify-content-center">
                <Col xs={12} md={8}>
                    <TodoCreate todoListDataChage={todoListDataChage}/>
                </Col>
                <Col xs={12} md={12}>

                    {todoListDataState.length===0?(
                        <></>
                    ):(
                        <div className="py-3">
                            <Form onSubmit={(e)=>changeOrder(e)}>
                                <Row>
                                    <Col className="align-self-center" xs="auto">
                                        Change order
                                    </Col>
                                    <Col xs="auto" className="pe-1">
                                        <Form.Group as={Col} controlId="formGridState">
                                            <Form.Select value={selectOrder} onChange={(e) => setSelectOrder(e.target.value)}>
                                                <option value="title">title</option>
                                                <option value="description">description</option>
                                                <option value="dateMax">date of expire</option>
                                                <option value="createAt">date create</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Col>
                                    <Col xs="auto" className="mx-3">
                                        <Button variant="primary" type="submit">
                                            <ImSortAmountDesc size="1.5em"/>
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    )}
                    {todoListDataState.length===0?(
                        <div className="text-center"><img src={logoImg} className="img-fluid"/></div>
                    ):(
                        todoListDataState.map((todoL, key)=>{
                            return <TodoItem key={key} todoL={todoL} todoListDataChage={todoListDataChage}/>
                        })
                    )}
                </Col>
            </Row>
        </Container>
        </div>
}
export default Home