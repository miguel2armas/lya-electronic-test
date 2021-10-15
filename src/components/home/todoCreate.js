import React, {useEffect, useState} from "react";
import {Button, Card, Col, Form, Row, Spinner} from "react-bootstrap";
import {HiOutlineSave} from "react-icons/all";
import DatePicker from "react-datepicker";
import {createToDoAPI, getGatFact} from "../../redux/apiFuntions";
import {useDispatch} from "react-redux";
import {NotificationManager} from 'react-notifications';
const TodoCreate = (props) => {
    const dispatch = useDispatch();
    const initData = {
        dateMax: new Date(),
        title: "0",
        description: "",
    };
    useEffect(()=>{
        getDataCat();
    }, []);
    const [todoDataCreate, setTodoDataCreate] = useState(initData);
    const [btnCreateTodo, setBtnCreateTodo] = useState(false);
    const [btnFactCat, setBtnFactCat] = useState(false);
    const [dataCatSelect, setDataCatSelect] = useState("1");
    const [dataCat, setDataCat] = useState([]);
    const getDataCat = async () =>{
        const data = await getGatFact();
        setDataCat(data);
    }
    const setFactsCatsMsg = async (e)=>{
        setBtnFactCat(true);
        e.preventDefault();
        let data = "";
        for (let i= 0; i <parseInt(dataCatSelect); i++){
            data= data + dataCat.data[i].fact + ' ';
        }
        setTodoDataCreate({...todoDataCreate, description: `${todoDataCreate.description} ${data}`});
        await getDataCat();
        setBtnFactCat(false);
    }
    const createTodo = async (e)=>{
        setBtnCreateTodo(true);
        e.preventDefault();
        if(todoDataCreate.description!==""){
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
            props.todoListDataChage();
        }else{
            NotificationManager.warning('please write a description', 'Error');
        }

        setBtnCreateTodo(false);
    }
  return <Card className="my-2">
      <Card.Body>
          <div className="d-flex justify-content-between align-content-center">
              <span className="fs-2">Create To Do</span>
              <Form onSubmit={(e)=>setFactsCatsMsg(e)}>
                  <Row>
                      <Col className="align-self-center" xs="auto">
                          Add Cat Facts
                      </Col>
                      <Col xs="auto" className="pe-1">
                          <Form.Group as={Col} controlId="formGridState">
                              <Form.Select value={dataCatSelect} onChange={(e) => setDataCatSelect(e.target.value)}>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                  <option value="7">7</option>
                                  <option value="8">8</option>
                                  <option value="9">9</option>
                                  <option value="10">10</option>
                              </Form.Select>
                          </Form.Group>
                      </Col>
                      <Col xs="auto" className="ps-0">
                          {btnFactCat?(
                              <Button type={"submit"} variant={"primary"} className="py-2 px-3" disabled={true}>
                                  <Spinner animation="border" variant="light" size={"sm"}/>
                              </Button>
                          ):(
                              <Button variant="primary" type="submit">
                                  <HiOutlineSave size="1.5em"/>
                              </Button>
                          )}

                      </Col>
                  </Row>
              </Form>
          </div>
          <Form onSubmit={(e)=>createTodo(e)}>
              <Form.Group className="mb-3">
                  <Form.Label>type</Form.Label>
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
              <div className="d-flex justify-content-between">
                  <span className="mx-2">Expire:</span>
                  <DatePicker
                      dateFormat="yyyy/MM/dd"
                      selected={todoDataCreate.dateMax}
                      onChange={(date) => setTodoDataCreate({...todoDataCreate, dateMax: date})}
                  />
                  <Col xs={6} className="text-end">
                      {btnCreateTodo?(
                          <Button type={"submit"} variant={"success"} disabled={true}>
                              <span className="mx-2"><Spinner animation="border" variant="light" size={"sm"}/>loading...</span>
                          </Button>
                      ):(
                          <Button type={"submit"} variant={"success"}>
                              Create To-Do
                          </Button>
                      )}
                  </Col>
              </div>
          </Form>
      </Card.Body>
  </Card>
}
export default TodoCreate