// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.9;

contract TaskContract{



    event AddTask(address receiver, uint taskID);
    event RemoveTask(uint taskID , bool isRemoved);
    
    struct Task{

        uint id;
        string taskName;
        bool isRemoved;


    }

    Task[]private tasks;

    mapping (uint256 => address) taskOwner;


    function addTask(string memory taskName, bool  isRemoved) external {
        uint taskID = tasks.length;
        tasks.push(Task(taskID,taskName, isRemoved));
        taskOwner[taskID]  = msg.sender;
        emit AddTask(msg.sender, taskID);
        
        
    }
        function getTask() external view returns (Task[] memory){
            Task[] memory temporary = new Task[] (tasks.length);

            uint counter = 0;
            for(uint i =0; i<tasks.length; i++){
                if(taskOwner[i]== msg.sender && tasks[i].isRemoved==false){
                    temporary[counter]= tasks[i];
                    counter++;
                }   
            }

            Task[] memory results = new Task[](counter);

            for(uint i=0; i<counter; i++) {
                results[i]=temporary[i];
            }   
            return results;

        }

        function removeTask(uint taskID , bool isRemoved) external{
            if(taskOwner[taskID] == msg.sender){
                tasks[taskID].isRemoved = isRemoved;
                emit RemoveTask(taskID, isRemoved);
            }
        }

}