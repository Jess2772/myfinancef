import * as React from 'react';
import jwt_decode from "jwt-decode"
import client from "../apis/Client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import CircularProgress from '@mui/material/CircularProgress';
const m_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const d = new Date();
const month = m_names[d.getMonth()]; 
const year = d.getFullYear();

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
    const [userBudget, setUserBudget] = useState('');

    useEffect(() => {        
        if (localStorage.getItem('access_token') === null){
            navigate('/login')
        } else {
    
            (async () => { 
                const user_id = jwt_decode(localStorage.getItem('access_token')).user_id
                const [spending, budget] = await Promise.all([
                    client.post(
                        'api/user/spending/month',
                        {
                            user_id: user_id
                        }, 
                        { headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        }}, { withCredentials: true, crossDomain: true }   
                    ),
                    client.post(
                        'api/user/budget',
                        {
                            user_id: user_id
                        }, 
                        { headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                        }}, { withCredentials: true, crossDomain: true }   
                    )
                ]);
                setMonthSpending(spending.data)
                setUserBudget(budget.data)
                setLoading(false)

                // return await client.post(
                //     'api/user/spending/month',
                //     {
                //         user_id: user_id
                //     }, 
                //     { headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                //     }}, { withCredentials: true, crossDomain: true }   
                // ).then((res) => {    
                //     setMonthSpending(res.data)
                //     setLoading(false)
                // }).catch((err)=> {
                //     console.log(err)
                // })

                // const {budget} = await client.post(
                //     'api/user/budget',
                //     {
                //         user_id: user_id
                //     },
                //     { headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                //     }}, { withCredentials: true, crossDomain: true }   
                // ).then((res) => {
                //     if (res.request.status === 404) {
                        
                //     } else {
                //         setUserBudget(res.data)
                //         setLoading(false)
                //     }
                // }).catch((err)=> {
                //     console.log(err)
                // })
            })
        ()};
    }, []);

    const renderCard = (category, categoryBudget, open, handleOpen, handleClose) => {
        const spentThisMonth = monthSpending[category].spentThisMonth
        const transactions = monthSpending[category].transactions
        var spendingStatus = "#008000"
        if (spentThisMonth >= categoryBudget) {
            spendingStatus = "#FF0000"
        } else if (spentThisMonth / categoryBudget >= 0.75) {
            spendingStatus = "#FF9966"
        }
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
                Budget: ${categoryBudget.toFixed(2)}
            </Typography>
            <Typography color={spendingStatus}>
                {month} {year}: ${spentThisMonth.toFixed(2)}
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
                                        <TableCell align="right">{row.amount.toFixed(2)}</TableCell>
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
                <Box sx={{display: 'flex', margin: 40, justifyContent:'center', alignItems:'center' }}>
                    <CircularProgress />
                </Box>
            </div>
        )
    }
    return (
        <div>
            <Navigation></Navigation>
            <h1 style={{display: 'flex', margin: '10px', justifyContent:'center', alignItems:'center'}}>Spending for {month} {year}</h1>
            
            <Stack style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}} className="mt-3" direction="row" width="100%" spacing={4}>
                {renderCard("Grocery", userBudget.grocery_lmt, openGrocery, handleGroceryOpen, handleGroceryClose)}
                {renderCard("Healthcare", userBudget.healthcare_lmt, openHealthcare, handleHealthcareOpen, handleHealthcareClose)}
                {renderCard("Dining", userBudget.dining_lmt, openDining, handleDiningOpen, handleDiningClose)}
            </Stack>
            <Stack style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}} className="mt-3" direction="row" width="100%" spacing={4}>
                {renderCard("Clothing", userBudget.clothing_lmt, openClothing, handleClothingOpen, handleClothingClose)}
                {renderCard("Transportation", userBudget.transportation_lmt, openTransportation, handleTransportationOpen, handleTransportationClose)}
                {renderCard("Entertainment", userBudget.entertainment_lmt, openEntertainment, handleEntertainmentOpen, handleEntertainmentClose)}
            </Stack>  
            <Stack style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}} className="mt-3" direction="row" width="100%" spacing={4}>
                {renderCard("Miscellaneous", userBudget.miscellaneous_lmt, openMisc, handleMiscOpen, handleMiscClose)}
                {renderCard("Housing", userBudget.housing_lmt, openHousing, handleHousingOpen, handleHousingClose)}
                {renderCard("Utility", userBudget.utility_lmt, openUtility, handleUtilityOpen, handleUtilityClose)}

            </Stack>  
        </div>
    )
}

export default MonthSpending;