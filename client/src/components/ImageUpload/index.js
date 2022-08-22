import { Box, Button, Image, Spinner, FormControl, FormErrorMessage } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import { UPLOAD_IMAGE } from '../../utils/mutations';
import { useMutation } from '@apollo/client';
import Compressor from 'compressorjs';


export const ImageUpload = ({ callback, properties, options = {} }) => {
    const [formState, setFormState] = useState({image: {...properties}, previewUrl: require('../../assets/img/avatar/placeholder.png')});
    const [uploadImage, { loading, data }] = useMutation(UPLOAD_IMAGE);
    const [isInvalid, setIsInvalid] = useState(false)
    const [uploadDisabled, setUploadDisabled] = useState(true)
    const hiddenInput = useRef(null);
    const size = options.size || 'm';
    const maxSize = options.max || 1000000;
    const maxWidth = options.maxWidth || 600;
    const maxHeight = options.maxHeight || 600;

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
        new Compressor(e.target.files[0], {
            quality: 0.8,
            maxWidth: maxWidth,
            maxHeight: maxHeight,
            convertTypes: ['image/bmp'],
            success(result){
                setFormState({...formState, image: {...properties, image: result}, previewUrl: URL.createObjectURL(result)})
                setUploadDisabled(false)
            },
            error(err){
                console.log(err)
                setIsInvalid(true)
            }
        })
    }
    return (
        <Box>
            <FormControl isInvalid={isInvalid}>
                <Image onClick={handleClick} boxSize={size} src={formState.previewUrl} />
                <input ref={hiddenInput} onChange={handleChange} type='file' accept='image/*' hidden />
                <Button boxShadow={'dark-lg'} isDisabled={uploadDisabled} onClick={handleSubmit} type='submit' margin={2}>Upload</Button>{loading?(<Spinner />):('')}{data?(<CheckIcon />):('')}
                <FormErrorMessage>Image must be under {`${maxSize/1000}kb`}</FormErrorMessage>
            </FormControl>
        </Box>
    )
};
