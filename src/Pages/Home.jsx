import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import {
  Button,
  Heading,
  Input,
  Textarea,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Style from "../Styles/home.module.css";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Components/Pagination";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function Home() {
  const [Page, SetPage] = useState(1);
  const [formdata, setFormData] = useState({ title: "", body: "" });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const Posts = useSelector((store) => store.posts);
  const Users = useSelector((store) => store.users);
  const Dispatch = useDispatch();

  async function FetchAllPosts() {
    let req = axios.get(
      `https://jsonplaceholder.typicode.com/posts?_start=${Page - 1}&_limit=12`
    );
    let res = await req;
    Dispatch({ type: "AddPost", payload: res.data });
  }

  function handleTotals(message, status) {
    toast({
      title: message,
      status: status || "success",
      duration: 9000,
      isClosable: true,
    });
  }

  function addPost() {
    onClose();
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(formdata),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => handleTotals('post Created'))
      .catch((error) => handleTotals(error.message));
  }

  function handleselsctChange(e) {
    let value= e.target.value;
    if(value=="Liked"){
      Dispatch({ type: "AddPost", payload: JSON.parse(localStorage.getItem('likedData'))||[] });
    }
    else if(value=="Favourite"){
      Dispatch({ type: "AddPost", payload: JSON.parse(localStorage.getItem('FavouriteData'))||[] });
    }else{
      FetchAllPosts()
    }
  }

  useEffect(() => {
    FetchAllPosts();
  }, [Page]);

  return (
    <>
      <nav className={Style.navbar}>
        <Heading as="h2">Posts</Heading>
        <div className={Style.navbarSelectDIv}>
          <label htmlFor="filter">Filter : </label>
          <select name="filter" id="filter" onChange={handleselsctChange}>
            <option value="all">All</option>
            <option value="Favourite">Favourite</option>
            <option value="Liked">Liked</option>
          </select>
          <Button colorScheme="messenger" onClick={onOpen}>
            Add New Post
          </Button>
        </div>
      </nav>

      <div>
        {Posts.length == 0 ? (
          <Heading as="h3">Loding.... or no data</Heading>
        ) : (
          Posts.map((data, ind) => <Card key={ind} {...data} />)
        )}
      </div>

      <Pagination page={Page} setPage={SetPage} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>ADD POST</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <label htmlFor="title">
              <b>Title :</b>
            </label>
            <Input
              type="text"
              id="title"
              border={"1px solid black"}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <label htmlFor="desc">
              <b>Body :</b>
            </label>
            <Textarea
              name="desc"
              id="desc"
              cols="30"
              rows="10"
              border={"1px solid black"}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, body: e.target.value }))
              }
            ></Textarea>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={addPost}>
              ADD
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Home;
