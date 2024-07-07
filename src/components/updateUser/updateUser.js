import { Button, TextField, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "./updateUser.css";

const UpdateUser = ()=>{

    const {id} = useParams();
    const [user, setUser] = useState({
        username: '',
        email: '',
        address: '',
        phoneno: ''

    });

    const navigate = useNavigate();

    

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/user/${id}`);
                const result = await response.json();
                setUser(result);
                //console.log(result);
            } catch (error) {
                console.error(error);
            }
        }
        fetchUser();
    }, [id]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUser({
            ...user,
            [name]: value
        })
    };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
        //console.log(formData);
        const response = await fetch(`http://localhost:8080/api/user/${id}`,{
            method:"PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        const result = await response.json;
        console.log(result);
        navigate("/");
    } catch (error) {
        console.log(error)
    }
  };

    return (
        <>
        <div className="center-form">
            <Typography variant="h4" gutterBottom> Update User </Typography>
            <form onSubmit={handleSubmit}>
                <TextField label="Username" type="text" name="username" variant="filled" fullWidth margin="normal" value={user.username} onChange={handleInputChange}/>
                <TextField label="Email" type="email" name="email" variant="filled" fullWidth margin="normal" value={user.email} onChange={handleInputChange}/>
                <TextField label="Phone No" type="text" name="phoneno" variant="filled" fullWidth margin="normal" value={user.phoneno} onChange={handleInputChange}/>
                <TextField label="Address" type="text" name="address" variant="filled" fullWidth margin="normal" value={user.address} onChange={handleInputChange}/>
                <Button className="btn" variant="contained" color="primary" type="submit" fullWidth>
                    Update User
                </Button>
            </form>
        </div>
        </>
    );
};

export default UpdateUser;