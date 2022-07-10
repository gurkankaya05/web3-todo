import React ,{useState, useEffect} from "react";
import {TextField , Button} from "@mui/material";
import  Task from "./Task";
import './App.css';
import {TaskContractAddress} from './config.js';
import { ethers  } from 'ethers';
import TaskAbi from './utils/TaskContract.json';

function App(){

  const[tasks,setTasks] = useState([]);

  const [input,setInput] = useState('');

  const [currentAccount,setCurrentAccount]= useState('');

  const [correctNetwork,setCorrectNetwork] = useState(false);


  const ethers = require('ethers');
  const connectWallet = async () => {

    try {
      const{ethereum} = window;

      if(!ethereum){
        console.log("Metamask not detected");
        return;
      }
      let chainID = await ethers.request({method :'eth_chainId'});
      const rinkebyChainID = '0x4';

      if(chainID !== rinkebyChainID){
        return;
      }
      else{
        setCorrectNetwork(true);
      }
    
      const accounts = await ethereum.request({method:'eth_requestAccounts'});
      setCurrentAccount(accounts[0]);

    } catch (error) {
      
    }
    
  }




  const addTask = async () => {
  }

    const deleteTask = async () => {
    }


    useEffect(() => {
      connectWallet();

    },[]);






  return (
    <div>
    {currentAccount === '' ? (
      <button
      className='text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out'
      onClick={connectWallet}
      >
      Connect Wallet
      </button>
      ) : correctNetwork ? (
        <div className="App">
          <h2> Task Management App</h2>
          <form>
             <TextField id="outlined-basic" label="Make Todo" variant="outlined" style={{margin:"0px 5px"}} size="small" value={input}
             onChange={e=>setInput(e.target.value)} />
            <Button variant="contained" color="primary" onClick={addTask}  >Add Task</Button>
          </form>
          <ul>
              {tasks.map(item=> 
                <Task 
                  key={item.id} 
                  taskText={item.taskText} 
                  onClick={deleteTask(item.id)}
                />)
              }
          </ul>
        </div>
      ) : (
      <div className='flex flex-col justify-center items-center mb-20 font-bold text-2xl gap-y-3'>
      <div>----------------------------------------</div>
      <div>Please connect to the Rinkeby Testnet</div>
      <div>and reload the page</div>
      <div>----------------------------------------</div>
      </div>
    )}
    </div>
  )



}
export default App;
