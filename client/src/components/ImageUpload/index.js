import {
    Box,
    IconButton,
    Button,
    Image
} from '@chakra-ui/react';
import { FiImage } from 'react-icons/fi';
import { useRef, useState } from 'react';

export const ImageUpload = ({ state, setNewState, fileState, setFileState, onClose }) => {
    const [imageURL, setImageURL] = useState(require('../../assets/img/avatar/placeholder.png'))
    const imgInput = useRef(null);
    const selectButton = useRef(null);
    const handleClick = () => {
        imgInput.current.click();
    }
    const handleSubmit = (e) => {
        console.log(imgInput.current.files[0]);
        setNewState(URL.createObjectURL(imgInput.current.files[0]));
        setFileState(imgInput.current.files[0]);
        onClose()
    }
    const handleChange = (e) => {
        if (!imgInput.current.files[0]){
            return;
        }
        setImageURL(URL.createObjectURL(imgInput.current.files[0]));
    }
    return (
        <Box>
            <Button ref={selectButton} onClick={handleClick} size='50vw'><Image src={imageURL} /></Button>
            <input onChange={handleChange} ref={imgInput} id='imgInput' type='file' accept='image/' hidden/>
            <Button onClick={handleSubmit} margin='1.5vmax'>Submit</Button>
        </Box>
    )
};