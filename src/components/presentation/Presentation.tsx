import React, {useState} from "react";
import {Box, IconButton, Stack, Typography} from "@mui/material";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const Presentation = (props: { urls: string[] }) => {
    const {urls} = props;

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < urls.length - 1) {
            setCurrentIndex(prevState => prevState + 1)
        } else {
            setCurrentIndex(0);
        }
    }

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prevState => prevState - 1)
        } else {
            setCurrentIndex(urls.length - 1)
        }
    }

    if (urls.length == 0) {
        return null;
    }

    return (
        <Box>
            <Box display={"flex"} justifyContent={"center"}>
                <img
                    src={urls[currentIndex]}
                    style={{
                        maxHeight: "100%",
                        maxWidth: "100%"
                    }}
                    alt={urls[currentIndex]}
                    onClick={handleNext}
                />
            </Box>
            <Stack direction={"row"} justifyContent={"center"} alignItems={"center"}>
                <IconButton onClick={handlePrevious}>
                    <ChevronLeftIcon/>
                </IconButton>
                <Typography px={1}>#{currentIndex + 1}/{urls.length}</Typography>
                <IconButton onClick={handleNext}>
                    <ChevronRightIcon/>
                </IconButton>
            </Stack>
        </Box>
    );
}

export default Presentation;