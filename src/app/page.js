"use client"; // Add this at the top of your file

import { Box, Stack, Typography, Button, Modal, TextField } from "@mui/material";
import { firestore } from '../../firebase';
import { collection, query, getDocs, setDoc, doc, deleteDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  gap: 3,
};

export default function Home() {
  const [pantry, setPantry] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [itemName, setItemName] = useState('');

  const updatePantry = async () => {
    const snapshot = query(collection(firestore, 'pantry'));
    const docs = await getDocs(snapshot);
    const pantryList = [];
    docs.forEach((doc) => {
      console.log(doc.id);
      pantryList.push(doc.id);
    });
    console.log(pantryList);
    setPantry(pantryList);
  };

  useEffect(() => {
    updatePantry();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'pantry'), item);
    await setDoc(docRef, {});
    updatePantry();
  };

  const removeItem = async (item) => {  
    const docRef = doc(collection(firestore, 'pantry'), item);
    await deleteDoc(docRef);
    updatePantry();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      addItem(itemName);
      setItemName('');
      handleClose(); // Close the modal after adding the item
    }
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bgcolor="white"
      gap={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" color={'black'}>
            Add item
          </Typography>
          <Typography id="modal-modal-description" color={"black"} sx={{ mt: 2 }}>
            <Stack direction={'row'} spacing={2}>
              <TextField
                id="outlined-basic"
                label="Item"
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                onKeyDown={handleKeyDown} // Add this line
              />
              <Button
                variant="outlined"
                onClick={() => {
                  addItem(itemName);
                  setItemName('');
                  handleClose();
                }}
              >
                Add
              </Button>
            </Stack>
          </Typography>
        </Box>
      </Modal>
      <Button
        variant="contained"
        onClick={handleOpen}
      >
        Add
      </Button>
      <Box border="1px solid black" borderRadius={"5px"} overflow={'hidden'}>
        <Box 
          width="800px" 
          height="100px" 
          bgcolor="aliceblue" 
          color="black" 
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h4"
            fontSize="50px"
            fontFamily={'Verdana'}
            fontWeight={'bold'}
          >
            Pantry Items
          </Typography>
        </Box>
        <Stack width="800px" height="350px" spacing={2} overflow={"auto"}> 
          {pantry.map((item) => (
            <Stack key={item} direction={'row'} spacing={2} justifyContent={'center'} alignItems={'space-between'}>
              <Box
                key={item}
                color="black"
                width="100%"
                minHeight="80px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                bgcolor="lightgray"
                padding={1}
                borderRadius={"5px"}
              >
                <Typography variant="h3">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Typography>
              </Box>
              <Button 
                variant="contained" 
                onClick={() => removeItem(item)}
                sx={{width: '150px'}} 
              >
                Remove
              </Button>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
