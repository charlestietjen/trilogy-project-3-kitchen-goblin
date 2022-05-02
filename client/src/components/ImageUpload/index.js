import { Box, Button, Image, Spinner, Icon } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import { UPLOAD_IMAGE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

export const ImageUpload = ({ callback, properties, options = {} }) => {
    const [formState, setFormState] = useState({image: {...properties}, previewUrl: require('../../assets/img/avatar/placeholder.png')});
    const [uploadImage, { loading, data }] = useMutation(UPLOAD_IMAGE);
    const hiddenInput = useRef(null);
    const size = options.size || 'm';

    const handleClick = () => {
        hiddenInput.current.click();
    }
    const handleSubmit = async e => {
        e.preventDefault();
        const mutationResponse = await uploadImage({
            variables: formState.image
        });
        const { imageUpload } = mutationResponse.data;
        callback({...imageUpload, properties});
    }
    const handleChange = e => {
        if (!e.target.files[0]){
            return;
        }
        setFormState({...formState, image: {...properties, image: e.target.files[0]}, previewUrl: URL.createObjectURL(e.target.files[0])});
    }
    return (
        <Box>
            <Image onClick={handleClick} boxSize={size} src={formState.previewUrl} />
            <input ref={hiddenInput} onChange={handleChange} type='file' accept='image/*' hidden />
            <Button onClick={handleSubmit} type='submit' margin={2}>Upload</Button>{loading?(<Spinner />):('')}{data?(<CheckIcon />):('')}
        </Box>
    )
};
