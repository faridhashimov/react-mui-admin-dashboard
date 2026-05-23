import Stack from '@mui/material/Stack'
import { CircularProgress, styled } from '@mui/material'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Chart from './Chart'
import {
    useGetIncomeQuery,
    useGetSalesByIntervalsQuery,
} from '../redux/adminApi/adminApi'
import ErrorMsg from './ErrorMsg'
import LoadingContainer from './LoadingContainer'

const StatisticsContainer = styled(Box)(({ theme }) => ({
    padding: 20,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    minHeight: '355px',
    maxWidth: '599px',
    minWidth: '599px',
}))

const RevenueContainer = styled(Box)(({ theme }) => ({
    padding: 20,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    // minWidth: '320px',
    [theme.breakpoints.down('md')]: {
        marginTop: '20px',
    },
}))

const StyledTypo = styled(Typography)({
    color: '#9a9a9a',
    lineHeight: 1,
})

const SalesContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontWeight: 500,
    fontSize: 15,
})

const SalesAmount = styled(StyledTypo)({
    marginTop: 10,
})

const RevenueComponent = () => {
    const { isLoading, isError, data } = useGetSalesByIntervalsQuery()

    const {
        isError: chartDataError,
        isLoading: chartDataLoading,
        data: chartData,
    } = useGetIncomeQuery()

    return (
        <Stack mt={3} direction={{ xs: 'column', md: 'row' }}>
            <StatisticsContainer flex={2}>
                <StyledTypo mb={2} variant="h6" fontWeight={400}>
                    Last 6 Months (income)
                </StyledTypo>
                <Chart
                    chartDataError={chartDataError}
                    chartDataLoading={chartDataLoading}
                    chartData={chartData}
                />
            </StatisticsContainer>
            <RevenueContainer ml={{ xs: 0, md: 4 }} flex={1}>
                <StyledTypo variant="span">Total Revenue</StyledTypo>
                {isLoading ? (
                    <LoadingContainer>
                        <CircularProgress />
                    </LoadingContainer>
                ) : isError ? (
                    <ErrorMsg />
                ) : (
                    <>
                        <Stack direction="column" sx={{ textAlign: 'center' }}>
                            <StyledTypo
                                variant="span"
                                sx={{ margin: '20px 0px', fontWeight: 500 }}
                            >
                                Total sales made today
                            </StyledTypo>
                            <StyledTypo variant="h4" sx={{ color: '#232323' }}>
                                ${data[0]}
                            </StyledTypo>
                            <StyledTypo
                                variant="p"
                                margin="20px 0px"
                                sx={{ fontSize: 14 }}
                            >
                                Previous transactions processing. Last payments
                                may not be included.
                            </StyledTypo>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <SalesContainer>
                                <StyledTypo variant="span">
                                    Last Quarter
                                </StyledTypo>
                                <SalesAmount
                                    variant="span"
                                    sx={{ color: '#d1515c' }}
                                >
                                    $ {data[3]}
                                </SalesAmount>
                            </SalesContainer>
                            <SalesContainer>
                                <StyledTypo variant="span">
                                    Last Week
                                </StyledTypo>
                                <SalesAmount
                                    variant="span"
                                    sx={{ color: '#64b484' }}
                                >
                                    $ {data[1]}
                                </SalesAmount>
                            </SalesContainer>
                            <SalesContainer>
                                <StyledTypo variant="span">
                                    Last Month
                                </StyledTypo>
                                <SalesAmount
                                    variant="span"
                                    sx={{ color: '#d1515c' }}
                                >
                                    $ {data[2]}
                                </SalesAmount>
                            </SalesContainer>
                        </Stack>
                    </>
                )}
            </RevenueContainer>
        </Stack>
    )
}

export default RevenueComponent
