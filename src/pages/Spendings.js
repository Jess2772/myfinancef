import Navigation from "../components/Navigation";
import jwt_decode from "jwt-decode"
import client from "../apis/Client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const columns = [
    { field: 'merchant', headerName: 'Merchant', width: 300, headerClassName: 'style--header'},
    { field: 'category', headerName: 'Category', width: 300, headerClassName: 'style--header'},
    { field: 'amount', headerName: 'Amount ($)', type: 'number', valueGetter: ({ value }) => value && value.toFixed(2), width: 300, headerClassName: 'style--header'},
    { field: 'transaction_date', headerName: 'Date', width: 300, type: 'date', valueGetter: ({ value }) => value && new Date(value.split('-')), headerClassName: 'style--header'},
    { field: 'pymt_method_full', headerName: 'Payment Method', width: 300, headerClassName: 'style--header'},
]

function Spendings() {
    const [spending, setUserSpending] = useState([]);
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {        
        if (localStorage.getItem('access_token') === null){
            navigate('/login')
        } else {
            (async () => { 
                const user_id = jwt_decode(localStorage.getItem('access_token')).user_id
                return await client.post(
                    'api/user/spending',
                    {
                        user_id: user_id
                    }, 
                    { headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    }}, { withCredentials: true, crossDomain: true }   
                ).then((res) => {
                    setUserSpending(res.data)
                    setLoading(false)
                   
                }).catch((err)=> {
                    console.log(err)
                })

            })
        ()};     
    }, []);

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
        <div >
            <Navigation></Navigation>
            <h2 style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}}>Overall spending</h2>
            <div className="center mt-5 mb-5">
                    <Link style={{ textDecoration: 'none'}} to="/spendings/category">
                        <Button variant="contained" size="large" className="center me-2"> View monthly spending by category </Button>
                    </Link>
                    <Link style={{ textDecoration: 'none'}} to="/spendings/monthly">
                        <Button variant="contained" size="large" className="center me-2"> Month to day </Button>
                    </Link>
                    <Link style={{ textDecoration: 'none'}} to="/budget">
                        <Button variant="contained" size="large" className="center me-2"> Projections </Button>
                    </Link>
            </div>
            <TableContainer style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}} sx={{ maxWidth: 1500 }} component={Paper}>
                <DataGrid
                sx={{
                    minHeight: 635,
                    boxShadow: 2,
                    width: '100%',
                    '& .style--header': {
                        backgroundColor: 'rgba(154, 152, 231, 0.8)',
                        fontStyle: 'italic',
                        fontFamily: 'Monospace',
                        textTransform: 'uppercase'
                    },
                  }}
                    getRowId={(row) => row.transaction_id}
                    rows={spending}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    disableRowSelectionOnClick
                />
            </TableContainer>

        </div>
    )
}

export default Spendings;