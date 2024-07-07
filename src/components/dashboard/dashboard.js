import { Button, Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const Dashboard = ()=>{

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/users");
            const result = await response.json();
            setUsers(result);
            //console.log(result);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUsers();
    })

    const handlePostUser = () => {
        navigate("/user");
    }

    const handleDelete = async (userId) => {
        try {
            //console.log(userId);
            const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
                method: "DELETE"
            })
            if(response.ok){
                fetchUsers();
            }
        } catch (error) {
            console.error(error);
        }
    }


    const handleUpdate = async (userId) => {
        navigate(`/user/${userId}`);

    }

    return (
        <>
        <Container className="mt-4">
            <Button
            variant="contained"
            color="primary"
            onClick={handlePostUser}
            style={{marginBottom: 5, marginLeft: 5, marginTop: 15}}
            >
                Post User
            </Button>
            <Typography variant="h4" align="center" gutterBottom>
                Users
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell> Username </TableCell>
                            <TableCell> Email </TableCell>
                            <TableCell> Address </TableCell>
                            <TableCell> Phone Number </TableCell>
                            <TableCell> Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>{users.map((user)=>(
                            <TableRow key={user.id}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.address}</TableCell>
                                <TableCell>{user.phoneno}</TableCell>
                                <TableCell>
                                <IconButton color="primary" onClick={()=>{handleUpdate(user.id)}}>
                                    <EditIcon></EditIcon>
                                    </IconButton>
                                    <IconButton color="secondary" onClick={()=>{handleDelete(user.id)}}>
                                    <DeleteIcon></DeleteIcon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
        </>
    );
};

export default Dashboard;