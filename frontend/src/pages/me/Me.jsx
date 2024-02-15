import React, {useState, useEffect, useCallback} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import { Input,
  Select,
  Stack, 
  Center, 
  Button, 
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  useDisclosure } from '@chakra-ui/react'

const Me = () => {
  const [todos, setTodos] = useState([])
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [todoStatus, setTodoStatus] = useState('');
  const [todoId, setTodoId] = useState(null);
  const [update, setUpdate] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast();

  const token = JSON.parse(localStorage.getItem('access_token'));

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todo/mytodo', {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token.access_token}`
        }
      });
      setTodos(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('access_token');
        navigate('/login');
      }
    }
  } 
  const fetchData = useCallback(fetchTodos, []); 
  useEffect(() => {
    fetchData();
    if (!localStorage.getItem('access_token')) {
      navigate('/login')
    }
  }, [fetchData])
  console.log(todos)

  const handleCreateAndUpdateTodo = async(e) => {
    if (!update) {
      if (title === '' || description === '' || todoStatus === '' || startDate === ''|| endDate === ''){
        toast({ title: "Please fill the blanks", status: 'warning' });
        return;
      }
      const data = { title, description, startDate, endDate, todoStatus };
      await axios.post("http://localhost:5000/todo/create", data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token.access_token}`
        }
      }).then(res => setTodos([...todos, res.data])).catch(error => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('access_token');
          navigate('/login');
          return;
        }
      })
    }
    else {
      if (title === '' || description === '' || todoStatus === '' || startDate === ''|| endDate === ''){
        toast({ title: "Please fill the blanks", status: 'warning' });
        return;
      }
      const data = { title, description, startDate, endDate, todoStatus };
      await axios.patch(`http://localhost:5000/todo/update/${todoId}`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token.access_token}`
        }
      }).then(res => toast({ title: "Updated", status: 'success' })).catch(error => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('access_token');
          navigate('/login');
          return;
        }
      })
      
    }
    onClose();
  }
  return (
    <Center height="100%" width="100%">
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack width="100%" height="100%">
              <Input type='text' placeholder='Title' id='title' onChange={(e) => setTitle(e.target.value)} value={title} />
              <Input type='text' placeholder='Description' id='description' onChange={(e) => setDescription(e.target.value)} value={description} />
              <Select placeholder='Select Status' onChange={(e) => setTodoStatus(e.target.value)} value={todoStatus}>
                <option value='active'>Active</option>
                <option value='inprogress'>In Progress</option>
                <option value='intesting'>In Testing</option>
                <option value='meet'>Meet</option>
                <option value='done'>Done</option>
                <option value='other'>Other</option>
              </Select>
              <Input type='datetime-local' placeholder='Start Date' id='startDate' onChange={(e) => setStartDate(e.target.value)} />
              <Input type='datetime-local' placeholder='End Date' id='endDate' onChange={(e) => setEndDate(e.target.value)} />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' id='createTodo' mr={3} onClick={handleCreateAndUpdateTodo}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Stack>
        <Flex justifyContent='space-between' alignItems='center'>
          <Button colorScheme='blue' onClick={onOpen} type=''>Add Todo</Button>
          <Button colorScheme='blue' onClick={(e) => {
            localStorage.removeItem('access_token');
            navigate('/login')
          }} type=''>Logout</Button>
        </Flex>
        <Accordion defaultIndex={[0]} allowMultiple width="500px">
          {todos.map(todo => (
              <AccordionItem key={todo.id}>
                <h2>
                  <AccordionButton>
                    <Box as="span" flex='1' textAlign='left'>
                      {todo.title}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Box bg='tomato' w='100%' p={4} color='white'>
                    <h1>Description</h1>
                    <h3>{todo.description}</h3>
                  </Box>
                  <br />
                  <Box bg='tomato' w='100%' p={4} color='white'>
                    <h1>Todo Status</h1>
                    <h3>{todo.todoStatus}</h3>
                  </Box>
                  <br />
                  <Box bg='tomato' w='100%' p={4} color='white'>
                    <h1>Todo Start Date</h1>
                    <h3>{todo.startDate}</h3>
                  </Box>
                  <br />
                  <Box bg='tomato' w='100%' p={4} color='white'>
                    <h1>Todo end Date</h1>
                    <h3>{todo.endDate}</h3>
                  </Box>
                  <br />
                  <Flex>
                    <Button colorScheme='blue' id='updateTodo' mr={3} onClick={(e) => {
                      onOpen();
                      setUpdate(true);
                      setTitle(todo.title);
                      setDescription(todo.description);
                      setTodoStatus(todo.todoStatus);
                      setStartDate(todo.startDate);
                      setEndDate(todo.endDate);
                      setTodoId(todo.id)
                    }}>
                      Update
                    </Button>
                    <Button colorScheme='blue' onClick={() => {
                      axios.delete(`http://localhost:5000/todo/delete/${todo.id}`, {
                        headers: {
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('access_token')).access_token}`
                        }
                      }).then(res => toast({ title: "Todo deleted", status: 'success' }))
                        .catch(err => toast({ title: err.message, status: 'error' }))
                    }}>Remove</Button>  
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
          ))}
        </Accordion>
      </Stack>
    </Center>
  );
}

export default Me;
