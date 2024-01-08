import { React, useState, useEffect} from "react";
import "./admin.css";
import { useAuthContext } from '../hooks/useAuthContext';
import jwt_decode from 'jwt-decode';
import Card from "./CardAdmin";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AdminPage = () => {

    const { user } = useAuthContext();
    const token = user.token; // Get the token from the user object
    const decodedToken = jwt_decode(token);
    // console.log(decodedToken);
    const userId = decodedToken.id
    const [updatedDescription, setUpdatedDescription] = useState([]);
    const [updatedImage, setUpdatedImage] = useState([]);
    const [updatedTitle, setUpdatedTitle] = useState([]);
    const [updatedCategory, setUpdatedCatgeory] = useState([]);
    // console.log(userId);
    const [product, setMeme] = useState([]);
    const [show, setShow] = useState(false);
    const handleDelete = (deletedMemeId) => {
        setMeme(prevMeme => prevMeme.filter(product => product.id !== deletedMemeId));
    };

    const handleDescriptionCreate = (event) => {
        setUpdatedDescription(event.target.value);
    };

    const handleTitleCreate = (event) => {
        setUpdatedTitle(event.target.value);
    };
      
    const handleCategroyCreate = (event) => {
        setUpdatedCatgeory(event.target.value);
    };

    const handleImageCreate = (event) => {
        setUpdatedImage(event.target.files[0]);
    };

    // const handleUpdate = async () => {}

    const handleUpdate = async (updatedMemeId) => {
        const fetchMemes = async () => {
            try {
            const response = await axios.get(`http://localhost:5000/products/${userId}`,{
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              });
            // console.log(userId)
            const data = response.data;
            setMeme(data);
            } catch (error) {
            console.log(error);
            setMeme(null);
            }
        };
        fetchMemes();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('description', updatedDescription);
        formData.append('image', updatedImage);
        formData.append('title', updatedTitle);
        formData.append('category', updatedCategory);
        try {
            const response = await axios.post(
              `http://localhost:5000/products/${decodedToken.id}`,
              formData,
              {
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              }
            );
            console.log(response);
            setShow(false);
        } catch (error) {
            console.log(error);
            setShow(true);
        }

        const fetchMemes = async () => {
            try {
            const response = await axios.get(`http://localhost:5000/products/${userId}`,{
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              });
            // console.log(userId)
            const data = response.data;
            setMeme(data);
            } catch (error) {
            console.log(error);
            setMeme(null);
            }
        };
        fetchMemes();
    };

    useEffect(() => {
        const fetchMemes = async () => {
            try {
            const response = await axios.get(`http://localhost:5000/products/${userId}`,{
                headers: {
                  Authorization: `Bearer ${user.token}`,
                },
              });
            // console.log(userId)
            const data = response.data;
            setMeme(data);
            } catch (error) {
            console.log(error);
            setMeme(null);
            }
        };
        fetchMemes();
    }, [userId]);

    return(
        <>
            <div className="admin-Main">
                <div className="Dashboard-outside d-flex flex-column align-items-center justify-content-center">
                    <div className="DisplayAll-Title">Your Products</div>
                    <button className="admin-Main-Create" onClick={() => setShow(true)}>Create</button>
                    <div className="DisplayAllAdmin-Cards-Container">
                    {product && product.length > 0 ? (
                        product.map((product) => (
                        <Card
                            key={product.id}
                            image={`http://localhost:5000/uploads/${product.image}`}
                            description={product.title}
                            title={product.title}
                            category={product.category}
                            memeId={product.id}
                            user = {user}
                            onDelete={() => handleDelete(product.id)}
                            onUpdate={() => handleUpdate(product.id)}
                        />
                        ))
                    ) : (
                        <p className="DisplayAll-Title">No products available</p>
                    )}
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Create Meme</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit} >
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter description"
                    required = {true}
                    onChange={handleDescriptionCreate}
                    />
                </Form.Group>
                <Form.Group controlId="formtitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter Title"
                    onChange={handleTitleCreate}
                    />
                </Form.Group>
                <Form.Group controlId="formcategroy">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                    type="text"
                    placeholder="Enter Category"
                    onChange={handleCategroyCreate}
                    />
                </Form.Group>
                <Form.Group controlId="formImage">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                    type="file"
                    placeholder="Enter image"
                    required = {true}
                    onChange={handleImageCreate}
                    />
                </Form.Group>
                <Button variant="primary mt-3" className="SubmitButton" type="submit">
                    Submit
                </Button>
                </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default AdminPage