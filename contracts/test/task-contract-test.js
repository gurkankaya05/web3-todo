const {expect} = require("chai");
const {ethers} = require("hardhat");   
describe("Task Contract", function(){

    let TaskContract;
    let taskContract;
    let owner;

        const NUM_TOTAL_TASKS = 5;

    let totalTasks;
    
    beforeEach(async function (){
        TaskContract = await ethers.getContractFactory("TaskContract");
        [owner] = await ethers.getSigners();
        taskContract = await TaskContract.deploy();

        totalTasks = [];


        for(let i = 0;  i < NUM_TOTAL_TASKS; i++){

            let tasks={
                'taskName': 'task Number: - ' + i,
                'isRemoved': false
            };

            await taskContract.addTask(tasks.taskName,tasks.isRemoved); 
            totalTasks.push(tasks); 
        }
    });

    describe("Add Task", function(){
        it("should  emit addTask event", function(){
            let task ={
                'taskName' : 'new Task',
                'isRemoved' : false
            };

            expect( taskContract.addTask(tasks.taskName,tasks.isRemoved)
            ).to.emit(taskContract,'addTask').withArgs(owner.address,NUM_TOTAL_TASKS);

        });

    });


    describe("Get All Tasks", function(){
        it("should return  the correct  number of total tasks",async function(){
            const tasksFromChain = await taskContract.getTask();
            expect( tasksFromChain.length ).to.equal(NUM_TOTAL_TASKS);
        })
    })  

    describe("Remove Task" ,function(){
        it("should emit remove task event", async function(){
            const TASK_ID = 0;
            const TASK_DELETED  = true;

            await expect(
                taskContract.removeTask(TASK_ID,TASK_DELETED),
            ).to.emit(
                taskContract,'RemoveTask'
            ).withArgs(
                TASK_ID,TASK_DELETED
            );


        })
    })
})