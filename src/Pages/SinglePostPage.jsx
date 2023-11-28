import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Style from "../Styles/singlePostPage.module.css";
import axios from "axios";
import { Button, Heading, Input, Textarea, useDisclosure, useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function SinglePostPage() {
  const [Post, setPost] = useState();
  const [formdata, setFormData] = useState({ title: "", body: "" });
  const [Comment, setComment] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const params = useParams();
  const Navigate= useNavigate()
  const toast = useToast()
  const [liked,setliked]=useState(JSON.parse(localStorage.getItem("liked"))||[])
  const [favorite,setfavorite]=useState(JSON.parse(localStorage.getItem("favorite"))||[])

  function handleTotals(message,status) {
    toast({
      title: message,
      status: status||'success',
      duration: 9000,
      isClosable: true,
    })
  }

  function toggleliked() {
    if(liked.includes(params.id)){
      let likedData=JSON.parse(localStorage.getItem('likedData')||[])
      localStorage.setItem('likedData',JSON.stringify(likedData.filter((data)=>data.id!=params.id)))
      localStorage.setItem('liked',JSON.stringify(liked.filter(id=>id!=params.id)))
      setliked((prev)=>prev.filter((ID)=>ID!=params.id))

    }
    else{
      let likedData=JSON.parse(localStorage.getItem('likedData'))||[]
      localStorage.setItem('likedData',JSON.stringify([...likedData,Post]))
      localStorage.setItem('liked',JSON.stringify([...liked,params.id]))
      setliked((prev)=>[...prev,params.id])
    }
    
  }
  function togglefavorite() {
    if(favorite.includes(params.id)){
      let FavouriteData=JSON.parse(localStorage.getItem('FavouriteData'))||[]
      localStorage.setItem('FavouriteData',JSON.stringify(FavouriteData.filter((data)=>data.id!=params.id)))
      localStorage.setItem('favorite',JSON.stringify(favorite.filter(id=>id!=params.id)))
      setfavorite((prev)=>prev.filter((ID)=>ID!=params.id))
    }
    else{
      let FavouriteData=JSON.parse(localStorage.getItem('FavouriteData'))||[]
      localStorage.setItem('FavouriteData',JSON.stringify([...FavouriteData,Post]))
      localStorage.setItem('favorite',JSON.stringify([...favorite,params.id]))
      setfavorite((prev)=>[...prev,params.id])}
    
  }

  function addPost() {
    onClose();
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "PATCH",
      body: JSON.stringify(formdata),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        handleTotals('post updated')
        setPost(formdata)
    })
      .catch((error) => handleTotals(error.message));
  }

  async function FetchPost() {
    // fetching post data
    let req = axios.get(
      `https://jsonplaceholder.typicode.com/posts/${params.id}`
    );
    let res = await req;
    setPost(res.data);

    // fetching comments of post
    req = axios.get(
      `https://jsonplaceholder.typicode.com/posts/${params.id}/comments`
    );
    res = await req;
    setComment(res.data);
  }

  function handleDElete() {
    fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`, {
      method: "DELETE",
    })
    .then(()=>{
      handleTotals('post Deleted')
      Navigate('/')
    })
    .catch((err)=>{
      handleTotals(err.message,"error")
    })
  }

  useEffect(() => {
    FetchPost();
  }, []);

  return (
    <div className={Style.postDiv}>
      <Heading as="h1" textAlign={"center"} mb={"20px"}>
        Post
      </Heading>
      <Heading as="h4" size={"md"}>
        {Post?.title}
      </Heading>
      <p>{Post?.body}</p>
      <div className={Style.buttonDiv}>
      <Button onClick={toggleliked}>{!liked.includes(params.id)?"like":"unlike"}</Button>
        <Button onClick={togglefavorite}>{!favorite.includes(params.id)?"Add to favorite":"remove from favorite"}</Button>
        <Button onClick={onOpen}>Edit</Button>
        <Button onClick={handleDElete}>Delete</Button>
      </div>
      <div className={Style.commentDiv}>
        <p>
          <b>Comments:</b>
        </p>
        {Comment.length == 0 ? (
          <Heading as="h4" size={"sm"}>
            Loading...
          </Heading>
        ) : (
          Comment.map((comm) => (
            <div className={Style.comment}>
              <img
                src="https://imgs.search.brave.com/kVIP0IGYxpAxFyYgHvFaJF_kOi7lALHlAVXQ37CLmYw/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9jZG4u/dmVjdG9yc3RvY2su/Y29tL2kvcHJldmll/dy0xeC82Ny8wMS9w/cm9maWxlLXBsYWNl/aG9sZGVyLWltYWdl/LWdyYXktc2lsaG91/ZXR0ZS12ZWN0b3It/MzAyMTY3MDEuanBn"
                alt=""
              />
              <div>
                <p>
                  <b>{comm.email}</b>
                </p>
                <p>{comm.body}</p>
              </div>
            </div>
          ))
        )}
      </div>
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
    </div>
  );
}

export default SinglePostPage;
