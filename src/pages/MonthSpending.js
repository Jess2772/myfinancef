import * as React from 'react';
import jwt_decode from "jwt-decode"
import client from "../apis/Client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Navigation from "../components/Navigation";
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';



const m_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const d = new Date();
const month = m_names[d.getMonth()]; 
const year = d.getFullYear();

const categories = ["Grocery", "Healthcare", "Dining", "Clothing", "Miscellaneous"] //#"Housing", "Utility", "Transportation", "Entertainment", 

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function MonthSpending() {
    const [openDining, setOpenDining] = useState(false);
    const handleDiningOpen = () => setOpenDining(true);
    const handleDiningClose = () =>setOpenDining(false);

    const [openMisc, setOpenMisc] = useState(false);
    const handleMiscOpen = () => setOpenMisc(true);
    const handleMiscClose = () => setOpenMisc(false);

    const [openGrocery, setOpenGrocery] = useState(false);
    const handleGroceryOpen = () => setOpenGrocery(true);
    const handleGroceryClose = () => setOpenGrocery(false);

    const [openHealthcare, setOpenHealthcare] = useState(false);
    const handleHealthcareOpen = () => setOpenHealthcare(true);
    const handleHealthcareClose = () => setOpenHealthcare(false);

    const [openClothing, setOpenClothing] = useState(false);
    const handleClothingOpen = () => setOpenClothing(true);
    const handleClothingClose = () => setOpenClothing(false);

    const [openHousing, setOpenHousing] = useState(false);
    const handleHousingOpen = () => setOpenHousing(true);
    const handleHousingClose = () => setOpenHousing(false);

    const [openUtility, setOpenUtility] = useState(false);
    const handleUtilityOpen = () => setOpenUtility(true);
    const handleUtilityClose = () => setOpenUtility(false);

    const [openTransportation, setOpenTransportation] = useState(false);
    const handleTransportationOpen = () => setOpenTransportation(true);
    const handleTransportationClose = () => setOpenTransportation(false);

    const [openEntertainment, setOpenEntertainment] = useState(false);
    const handleEntertainmentOpen = () => setOpenEntertainment(true);
    const handleEntertainmentClose = () => setOpenEntertainment(false);


    const [monthSpending, setMonthSpending] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {        
        if (localStorage.getItem('access_token') === null){
            navigate('/login')
        } else {
            (async () => { 
                const user_id = jwt_decode(localStorage.getItem('access_token')).user_id
                return await client.post(
                    'api/user/spending/month',
                    {
                        user_id: user_id
                    }, 
                    { headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    }}, { withCredentials: true, crossDomain: true }   
                ).then((res) => {    
                    setMonthSpending(res.data)
                    setLoading(false)
                }).catch((err)=> {
                    console.log(err)
                })
            })
        ()};     
    }, []);

    const renderCard = (category, open, handleOpen, handleClose) => {
        const spentThisMonth = monthSpending[category].spentThisMonth
        const transactions = monthSpending[category].transactions
        return (
            <Card sx={{ minWidth: 275 }}>
            <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Category Spending
            </Typography>
            <Typography variant="h5" component="div">
                {category}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Budget: $100
            </Typography>
            <Typography variant="">
                {month} {year}: ${spentThisMonth}
            </Typography>
            </CardContent>
            <CardActions>
                <div>
                    <Button size="small" onClick={handleOpen}>View Transactions</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                    <TableHead>
                                    <TableRow>
                                        <TableCell>Merchant</TableCell>
                                        <TableCell align="right">Amount&nbsp;($)</TableCell>
                                        <TableCell align="right">Date</TableCell>
                                        <TableCell align="right">Payment Method</TableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    {transactions.map((row) => (
                                        <TableRow
                                        key={row.transaction_id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                        <TableCell component="th" scope="row">
                                            {row.merchant}
                                        </TableCell>
                                        <TableCell align="right">{row.amount}</TableCell>
                                        <TableCell align="right">{row.transaction_date}</TableCell>
                                        <TableCell align="right">{row.pymt_method_full}</TableCell>
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Modal>
                </div>
            </CardActions>
        </Card>
        )

    }

    if (loading) {
        return (
            
            <div>
                <Navigation></Navigation>
                <h1>Loading</h1>
                <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                >
                open={loading}
                <CircularProgress color="inherit" />
                </Backdrop>
          </div>
        )
    }
    return (
        <div>
            <Navigation></Navigation>
            <h2 style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}}>Spending for this month (Aug. 2023). Pie chart like before?</h2>
            
            <Stack style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}} className="mt-3" direction="row" width="100%" spacing={4}>
                {renderCard("Grocery", openGrocery, handleGroceryOpen, handleGroceryClose)}
                {renderCard("Healthcare", openHealthcare, handleHealthcareOpen, handleHealthcareClose)}
                {renderCard("Dining", openDining, handleDiningOpen, handleDiningClose)}
            </Stack>
            <Stack style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}} className="mt-3" direction="row" width="100%" spacing={4}>
                {renderCard("Clothing", openClothing, handleClothingOpen, handleClothingClose)}
                {renderCard("Transportation", openTransportation, handleTransportationOpen, handleTransportationClose)}
                {renderCard("Entertainment", openEntertainment, handleEntertainmentOpen, handleEntertainmentClose)}
            </Stack>  
            <Stack style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}} className="mt-3" direction="row" width="100%" spacing={4}>
                {renderCard("Miscellaneous", openMisc, handleMiscOpen, handleMiscClose)}
                {renderCard("Housing", openHousing, handleHousingOpen, handleHousingClose)}
                {renderCard("Utility", openUtility, handleUtilityOpen, handleUtilityClose)}

            </Stack>  
        </div>
    )
}

export default MonthSpending;