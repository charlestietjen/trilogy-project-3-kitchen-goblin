import { Box, Button, Image } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { UPLOAD_IMAGE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

export const ImageUpload = ({ callback, properties }) => {
    const [formState, setFormState] = useState({image: {...properties}, previewUrl: require('../../assets/img/avatar/placeholder.png')});
    const [uploadImage] = useMutation(UPLOAD_IMAGE);
    const hiddenInput = useRef(null);

    const handleClick = () => {
        hiddenInput.current.click();
    }
    const handleSubmit = async e => {
        e.preventDefault();
        const mutationResponse = await uploadImage({
            variables: formState.image
        })
        callback(mutationResponse.data.imageUpload);
    }
    const handleChange = e => {
        if (!e.target.files[0]){
            return;
        }
        setFormState({...formState, image: {...properties, image: e.target.files[0]}, previewUrl: URL.createObjectURL(e.target.files[0])});
    }
    return (
        <Box>
            <form onSubmit={handleSubmit} onChange={handleChange}>
                <Button onClick={handleClick} size={'m'}><Image src={formState.previewUrl} /></Button>
                <input ref={hiddenInput} type='file' accept='image/*' hidden />
                <Button type='submit' margin={2}>Upload</Button>
            </form>
        </Box>
    )
};