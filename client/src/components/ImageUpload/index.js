import { Box, Button, Image, Spinner, Icon } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import { SIGN_S3 } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

export const ImageUpload = ({ callback, properties, options = {} }) => {
    const [formState, setFormState] = useState({image: {...properties}, previewUrl: require('../../assets/img/avatar/placeholder.png')});
    const [signS3, { loading, data }] = useMutation(SIGN_S3);
    const hiddenInput = useRef(null);
    const size = options.size || 'm';

    const handleClick = () => {
        hiddenInput.current.click();
    }
    const handleSubmit = async e => {
        e.preventDefault();
        if (!formState.signS3) return;
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', formState.signS3.signedRequest);
        xhr.setRequestHeader('Content-Type', formState.image.image.type);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4){
                if(xhr.status === 200){
                    console.log('Image uploaded');
                } else if (xhr.status === 400) {
                    console.log(xhr.response);
                    return;
                }
            }
        }
        xhr.send(formState.image.image);
        callback({url: formState.signS3.url, properties});
    }
    const handleChange = async e => {
        if (!e.target.files[0]){
            return;
        }
        const { name, type } = e.target.files[0];
        const mutationResponse = await signS3({
            variables: {
                name: name,
                type: type,
                uploadedBy: properties.uploadedBy,
                category: properties.category
            }
        });
        setFormState({...formState, signS3: {...mutationResponse.data.signS3}, image: {...properties, image: e.target.files[0]}, previewUrl: URL.createObjectURL(e.target.files[0])});
    }
    return (
        <Box>
            <Image onClick={handleClick} boxSize={size} src={formState.previewUrl} />
            <input ref={hiddenInput} onChange={handleChange} type='file' accept='image/*' hidden />
            <Button onClick={handleSubmit} type='submit' margin={2}>Upload</Button>{loading?(<Spinner />):('')}{data?(<CheckIcon />):('')}
        </Box>
    )
};