import Navigation from "../components/Navigation";
import client from "../apis/Client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { PieChart, pieArcClasses } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
function SpendingCategory() {
    return (
        <div>
            <Navigation></Navigation>
            <h2 style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}}>Spending by Category</h2>
            <h2 style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}}>Pie charts to show spending by category, bar char to show count of transactions/category</h2>
            <Grid container>
                <Grid item md={12}> 
                    <Box style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}} textAlign="center">
                    <PieChart
                        series={[
                            {
                            data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },
                            ],
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
                            data: [
                                { id: 0, value: 10, label: 'series A' },
                                { id: 1, value: 15, label: 'series B' },
                                { id: 2, value: 20, label: 'series C' },
                            ],
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
                        width={400}
                        height={300}
                    />
                    </Box>
                </Grid>
                <Grid item md={12}> 
                    <Box style={{display: 'flex', margin: 'auto', justifyContent:'center', alignItems:'center'}} textAlign="center">
                    <BarChart
                        xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                        series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                        width={500}
                        height={300}
                    />
                    </Box>
                </Grid>
            </Grid>

        </div>

    )
}

export default SpendingCategory;