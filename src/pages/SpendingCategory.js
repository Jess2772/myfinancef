import Navigation from "../components/Navigation";
import client from "../apis/Client";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode"
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { PieChart, pieArcClasses, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Form } from 'react-bootstrap'
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox'
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import moment from 'moment';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
    'Grocery',
    'Housing',
    'Entertainment',
    'Utility',
    'Dining',
    'Healthcare',
    'Personal Care',
    'Clothing',
    'Miscellaneous'
  ];

function SpendingCategory() {
    const [dateFrom, setDateFrom] = useState();
    const [dateTo, setDateTo] = useState();
    const [categoryName, setCategoryName] = useState([]);
    const [pie, setPie] = useState([])
    const navigate = useNavigate();

    const handleChange = (event) => {
        const {
          target: { value },
        } = event;
        setCategoryName(
          typeof value === 'string' ? value.split(',') : value,
        );
    };

    useEffect(() => {        
        if (localStorage.getItem('access_token') === null){
            navigate('/login')
        } 
    }, []);

    const submitSpending = async e => {
        const user_id = jwt_decode(localStorage.getItem('access_token')).user_id
        e.preventDefault();
        return await client.post(
            "/api/user/spending/category",
            {   
                user_id: user_id,
                date_from: moment(dateFrom).format('YYYY-MM-DD') ,
                date_to: moment(dateTo).format('YYYY-MM-DD'),
                category_names: categoryName
            }, 
            { headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }, withCredentials: true, crossDomain: true}
        ).then((res) => {
            console.log(res.data)
            setPie(res.data.pie)
        })
    }

    return (
        <div>
            <Navigation></Navigation>
            <h2 style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}}>Spending by Category MAKE SURE FROM DATE IS LESS THAN TO DATE</h2>
            <h2 style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}}>Pie charts to show spending by category, bar char to show count of transactions/category</h2>
            <Grid container>
                <Grid item md={12}>
                <Form onSubmit={e => submitSpending(e)}>
                        <Box style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}}>
                            <FormGroup controlId="formBasicDate">
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <FormControl sx={{ m: 3, width: 300 }}>
                                        <DatePicker
                                                format="yyyy-MM-dd"
                                                label="From"
                                                value={dateFrom}
                                                onChange={(newValue) => {
                                                    setDateFrom(newValue);
                                                }}
                                                renderInput={(params) => <TextField placeholder="" {...params} />}
                                        />
                                    </FormControl>
                                </LocalizationProvider>
                            </FormGroup>
                            
                            <FormGroup controlId="formBasicDate">
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                    <FormControl sx={{ m: 3, width: 300 }}>
                                        <DatePicker
                                                format="yyyy-MM-dd"
                                                label="To"
                                                value={dateTo}
                                                onChange={(newValue) => {
                                                    setDateTo(newValue);
                                                }}
                                                renderInput={(params) => <TextField placeholder="" {...params} />}
                                        />
                                    </FormControl>
                                </LocalizationProvider>
                            </FormGroup>

                            <FormGroup>
                                <FormControl sx={{ m: 3, width: 300 }}>
                                    <InputLabel id="demo-multiple-checkbox-label">Categories</InputLabel>
                                    <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={categoryName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Categories" />}
                                    renderValue={(selected) => selected.join(', ')}
                                    MenuProps={MenuProps}
                                    >
                                    {categories.map((name) => (
                                        <MenuItem key={name} value={name}>
                                        <Checkbox checked={categoryName.indexOf(name) > -1} />
                                        <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                    </Select>
                                </FormControl>
                            </FormGroup>
                            <Button endIcon={<SearchIcon />} variant="contained" type="submit" className="center me-2"> Search </Button>
                        </Box>
                       
                    </Form>
                </Grid>

                <Grid item md={12}> 
                    <Box style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}} textAlign="center">
                    <PieChart
                        series={[
                            {
                            data: pie,
                            highlightScope: { faded: 'global', highlighted: 'item' },
                            faded: { innerRadius: 30, additionalRadius: -30 },
                            startAngle: -90,
                            endAngle: 270,
                            },
                        ]}
                        sx={{
                            [`& .${pieArcClasses.faded}`]: {
                              fill: 'gray',
                            },
                        }}
                        width={400}
                        height={200}
                    />
                    </Box>
                </Grid>
                
                <Grid item md={12}> 
                    <Box style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}} textAlign="center">
                        
                        <PieChart
                        series={[
                            {
                            arcLabel: (item) => ` $${item.value}`,
                            arcLabelMinAngle: 45,
                            data: pie,
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                            startAngle: -90,
                            endAngle: 270,
                            cx: 150,
                            cy: 150,
                            },
                        ]}
                        sx = {{
                            [`& .${pieArcLabelClasses.root}`]: {
                                fill: 'black',
                                fontWeight: 'bold',
                            },
                        }}
                        width={400}
                        height={300}
                        />
                        

                    </Box>
                </Grid>
 
            </Grid>
        </div>

    )
}

export default SpendingCategory;