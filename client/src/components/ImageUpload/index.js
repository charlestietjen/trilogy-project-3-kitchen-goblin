import {
    Box,
    IconButton,
    Button,
    Image
} from '@chakra-ui/react';
import { FiImage } from 'react-icons/fi';
import { useRef, useState } from 'react';
import { UPLOAD_IMAGE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

export const ImageUpload = ({ state, setNewState, fileState, setFileState, onClose, uploadedBy, category }) => {
    const [imageURL, setImageURL] = useState(require('../../assets/img/avatar/placeholder.png'))
    const [formState, setFormState] = useState({});
    const [uploadImage, { error } ] = useMutation(UPLOAD_IMAGE);
    const imgInput = useRef(null);
    const selectButton = useRef(null);
    const handleClick = () => {
        imgInput.current.click();
    }
    const handleSubmit = async e => {
        e.preventDefault();
        setNewState(URL.createObjectURL(imgInput.current.files[0]));
        setFileState(imgInput.current.files[0]);
        const image = e.target.image.files[0];
        const mutationResponse = await uploadImage({
            variables: {
                image: image,
                uploadedBy: uploadedBy,
                category: category
            }
        })
    }
    const handleChange = e => {
        if (!imgInput.current.files[0]){
            return;
        }
        setImageURL(URL.createObjectURL(imgInput.current.files[0]));
        setFormState({
            image: e.target.files[0]
        })
    }
    return (
        <Box>
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <Button ref={selectButton} onClick={handleClick} size='50vw'><Image src={imageURL} /></Button>
                <input name='image' ref={imgInput} id='imgInput' type='file' accept='image/*' hidden/>
                <Button type='submit' margin='1.5vmax'>Submit</Button>
            </form>
        </Box>
    )
};