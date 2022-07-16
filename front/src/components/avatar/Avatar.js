import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Modal, Radio } from '@mui/material';
import { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from 'axios';
import { PutWithAuth } from '../../services/HttpService';

const Avatar = ({ avatarId, userId,userName }) => {
    const [open, setOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState(avatarId)

    const handleChange = (e) => {
        setSelectedValue(e.target.value)
    }
    const saveAvatar = async () => {
        const response = await PutWithAuth(`/users/${localStorage.getItem("currentUser")}`, { avatar: selectedValue })
        console.log(response);
    }

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
        saveAvatar()
    }
    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    position: "absolute", left: "40%", top: 50, display: "flex", maxWidth: 250
                    , maxHeight: 600, justifyContent: "center"
                }}
            >
                <List dense sx={{ width: '100%', maxWidth: 400, bgcolor: 'background.paper' }}>
                    {[0, 1, 2, 3, 4, 5, 6].map((value) => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                            <ListItem
                                key={value}
                                secondaryAction={
                                    <Radio
                                        edge="end"
                                        checked={"" + selectedValue === "" + value}
                                        onChange={handleChange}
                                        value={value}
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': labelId }}
                                    />
                                }
                                disablePadding>
                                <CardMedia
                                    style={{ maxWidth: 80 }}
                                    component="img"
                                    alt={`Avatar ${value}`}
                                    image={`/avatars/avatar${value}.png`}
                                    title="User Avatar"
                                >
                                </CardMedia>
                            </ListItem>
                        );
                    })}
                </List>
            </Modal>
            <Card sx={{ maxWidth: 345, marginTop: 10, marginLeft: 10 }}>
                <CardMedia
                    component="img"
                    alt="User Avatar"
                    image={`/avatars/avatar${selectedValue}.png`}
                    title="User Avatar"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {userName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        User Info
                    </Typography>
                </CardContent>
                <CardActions style={{ justifyContent: "center" }} >
                    {localStorage.getItem("currentUser") === userId ?
                        <Button size="small" onClick={handleOpen} >Change Avatar</Button> : null}
                </CardActions>
            </Card>
        </>
    )
}

export default Avatar