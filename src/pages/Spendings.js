import Navigation from "../components/Navigation";
import { Row, Col, Form, InputGroup } from 'react-bootstrap'
import jwt_decode from "jwt-decode"
import client from "../apis/Client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
    { field: 'transaction_id', headerName: 'transaction_id', width: 250, headerClassName: 'style--header'},
    { field: 'merchant', headerName: 'Merchant', width: 250, headerClassName: 'style--header'},
    { field: 'category', headerName: 'Category', width: 250, headerClassName: 'style--header'},
    { field: 'amount', headerName: 'Amount ($)', type: 'number', valueGetter: ({ value }) => value && value.toFixed(2), width: 250, headerClassName: 'style--header'},
    { field: 'transaction_date', headerName: 'Date', width: 250, type: 'date', valueGetter: ({ value }) => value && new Date(value.split('-')), headerClassName: 'style--header'},
    { field: 'pymt_method_full', headerName: 'Payment Method', width: 250, headerClassName: 'style--header'},
]

function Spendings() {
    const [spending, setUserSpending] = useState([]);
    const navigate = useNavigate();

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
                   
                }).catch((err)=> {
                    console.log(err)
                })

            })
        ()};     
    }, []);
    return (
        <div >
            <Navigation></Navigation>
            <h2 style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}}>Overall spending</h2>
            <div className="center mt-5 mb-5">
                    <Link style={{ textDecoration: 'none'}} to="/transactions">
                        <Button variant="contained" size="large" className="center me-2"> View monthly spending by category </Button>
                    </Link>
                    <Link style={{ textDecoration: 'none'}} to="/spendings">
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