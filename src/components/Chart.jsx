import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

import { LoadingContainer, ErrorMsg } from '../components'
import { CircularProgress } from '@mui/material'

const Chart = ({ chartDataLoading, chartDataError, chartData }) => {
    return (
        <>
            {chartDataLoading ? (
                <LoadingContainer>
                    <CircularProgress />
                </LoadingContainer>
            ) : chartDataError ? (
                <ErrorMsg />
            ) : (
                <ResponsiveContainer width="100%" aspect={2 / 1}>
                    <AreaChart
                        // width={730}
                        // height={250}
                        data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id="colorUv"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#8884d8"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#8884d8"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area
                            type="monotone"
                            dataKey="total"
                            stroke="#8884d8"
                            fillOpacity={1}
                            fill="url(#colorUv)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </>
    )
}

export default Chart
