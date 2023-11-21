"use client";
import React from "react";
import axios from "axios";
import { Button, Dialog, DialogActions, Box, DialogContent, DialogTitle, IconButton, TextField } from '@mui/material';
import Swal from "sweetalert2";
import CloseIcon from '@mui/icons-material/Close';

interface CityFormProps {
    showCityForm: boolean;
    setShowCityForm: (show: boolean) => void;
    reloadData: () => void;
    selectedCity: any;
    setSelectedCity: (city: any) => void;
}



function CityForm({
    showCityForm,
    setShowCityForm,
    reloadData,
    selectedCity,
    setSelectedCity,
}: CityFormProps) {
    const [loading, setLoading] = React.useState(false);
    const [formData, setFormData] = React.useState({ name: '' });
    const [errorMessage, setErrorMessage] = React.useState('');
    const [successMessage, setSuccessMessage] = React.useState('');

    React.useEffect(() => {
        if (selectedCity) {
            setFormData({ name: selectedCity.name });
        } else {
            setFormData({ name: '' });
        }
    }, [selectedCity]);


    const handleClose = () => {
        setShowCityForm(false);
        setSelectedCity(null);

    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async () => {
        try {
            setLoading(true);
            if (selectedCity) {
                await axios.put(process.env.NEXT_PUBLIC_API_URL + `/api/admin/cities/` + selectedCity.cityId, formData);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'City updated successfully',
                })
            } else {
                await axios.post(process.env.NEXT_PUBLIC_API_URL + `/api/admin/cities`, formData);
                Swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'City Created successfully',
                })
            }
            setShowCityForm(false);
            setSelectedCity(null);
            reloadData();
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message || error.message,
            });
            setShowCityForm(false);

        } finally {
            setLoading(false);
        }
    };


    return (
        <Dialog open={showCityForm}
            sx={{
                '& .MuiDialog-paper': {
                    width: '80%',
                    maxHeight: 435,

                },
            }}   >
            <DialogTitle>
                <Box display="flex" justifyContent="space-between" alignItems="center">

                    {selectedCity ? 'Update City' : 'Add City'}
                    <IconButton sx={{
                        color: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'primary.light',

                        },
                    }}
                        edge="end" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    name="name"
                    label="Name"
                    type="text"
                    fullWidth
                    value={formData.name}
                    onChange={handleInputChange}
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {selectedCity ? 'Update' : 'Add'}
                </Button>
            </DialogActions>
        </Dialog>


    );


}

export default CityForm;

