"use client";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { firestore } from "@/firebase";
import {
  collection,
  query,
  getDocs,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const updateInventory = async () => {
    const col = query(collection(firestore, "inventory"));
    const docs = await getDocs(col);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      });
    });
    // console.log(inventoryList);
    setInventory(inventoryList);
  };
  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { count } = docSnap.data();
      await setDoc(docRef, { count: count + 1 });
    } else {
      await setDoc(docRef, { count: 1 });
    }
    await updateInventory();
  };
  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { count } = docSnap.data();
      if (count === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { count: count - 1 });
      }
    }
    await updateInventory();
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    updateInventory();
  }, []);
  return (
    <Box
      width="100vw"
      height="100vh"
      display={"flex"}
      justifyContent={"center"}
      flexDirection={"column"}
      alignItems={"center"}
      gap={2}
    >
      <Typography variant="h1">Inventory</Typography>
      <Modal open={open} onClose={handleClose}>
        <Box
          position={"absolute"}
          top={"50%"}
          left={"50%"}
          sx={{
            transform: "translate(-50%,-50%)",
          }}
          width={400}
          bgcolor={"white"}
          border={"2px solid #0000"}
          boxShadow={24}
          p={4}
          display={"flex"}
          flexDirection={"column"}
          gap={3}
        >
          <Typography variant="h3">Add Item</Typography>
          <Stack width={"100%"} direction={"row"} spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => {
                setItemName(e.target.value);
              }}
            />
            <Button
              variant="outlined"
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button
        variant="contained"
        onClick={() => {
          handleOpen();
        }}
      >
        Add new Item
      </Button>
      <Box border={"1px solid black"}>
        <Box
          width={"800px"}
          height={"100px"}
          bgcolor={"honeydew"}
          justifyContent={"center"}
          display={"flex"}
          alignItems={"center"}
        >
          <Typography variant="h2" color={"black"}>
            Inventory Items
          </Typography>
        </Box>
        <Stack width={"800px"} height={"300px"} spacing={2} overflow={"auto"}>
          {inventory.map(({ name, count }) => (
            <Box
              key={name}
              width={"100%"}
              minHeight={"150px"}
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              padding={5}
            >
              <Typography
                variant="h3"
                color={"black"}
                textAlign={"center"}
                textTransform={"capitalize"}
              >
                {name}
              </Typography>
              <Typography variant="h3" color={"black"} textAlign={"center"}>
                {count}
              </Typography>
              <Stack direction={"row"} spacing={2}>
                <Button
                  variant="contained"
                  onClick={() => {
                    addItem(name);
                  }}
                >
                  Add
                </Button>
                <Button variant="contained" onClick={() => removeItem(name)}>
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
