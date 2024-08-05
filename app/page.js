"use client";
import {
  Box,
  Button,
  Modal,
  Stack,
  TextField,
  Typography,
  Container,
  Divider,
  IconButton,
  Grid,
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
import theme from "./theme.js";
import { ThemeProvider } from "@mui/material/styles";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ItemCard from "./cardComponent.js";

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const [search, setSearch] = useState("");
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
    <ThemeProvider theme={theme}>
      <Box width="100vw" height="100vh" sx={{ bgcolor: "background.default" }}>
        <Container>
          <Box
            pt={2}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h2">Inventory</Typography>
            <Stack
              direction={"row"}
              spacing={2}
              width={"50%"}
              justifyContent="flex-end"
            >
              <TextField
                id="search-items"
                label="Search..."
                type="search"
                variant="filled"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <IconButton
                sx={{
                  borderRadius: "15%",
                  padding: 2,
                }}
                size="small"
                onClick={() => {
                  handleOpen();
                }}
              >
                <PostAddIcon />
              </IconButton>
            </Stack>
          </Box>
          <Divider
            sx={{
              borderBottomWidth: 3,
              my: 2,
              borderColor: "black",
            }}
          />
          <Box
            width="100%"
            height="100%"
            display={"flex"}
            justifyContent={"center"}
            flexDirection={"column"}
            alignItems={"center"}
            gap={2}
          >
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
            <Grid container spacing={2} p={2}>
              {!search &&
                inventory.map(({ name, count }) => (
                  <Grid item xs={4}>
                    <ItemCard name={name} count={count} />
                  </Grid>
                ))}
              {search &&
                inventory
                  .filter((item) =>
                    item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map(({ name, count }) => (
                    <Grid item xs={3}>
                      <ItemCard name={name} count={count} />
                    </Grid>
                  ))}
            </Grid>
            {/* </Stack>
            </Box> */}
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
