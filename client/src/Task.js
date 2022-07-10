import { List, ListItem , ListItemAvatar,  ListItemText } from '@mui/material';
import './Task.css';
import DeleteIcon from "@mui/icons-material/Delete";

const Task =({taskText,onClick}) => {

    return(
        <List className="todo_list">
            
            <ListItem>
            
            <ListItemText primary ={taskText}/>

            </ListItem>

            <DeleteIcon fontSize ="large" style={{opacity:0.7}} onClick={onClick}/>


        </List>
    )

}

export default Task;