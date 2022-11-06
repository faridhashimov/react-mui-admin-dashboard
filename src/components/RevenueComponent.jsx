import { Stack, Typography, styled, Box } from '@mui/material'
import Chart from './Chart'

const StatisticsContainer = styled(Box)(({ theme }) => ({
    padding: 20,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
}))

const RevenueContainer = styled(Box)(({ theme }) => ({
    padding: 20,
    boxShadow: theme.shadows[2],
    borderRadius: theme.shape.borderRadius,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
    return (
        <Stack mt={3} direction="row">
            <StatisticsContainer flex={2}>
                <StyledTypo mb={2} variant="h6" fontWeight={400}>
                    Last 6 Months (income)
                </StyledTypo>
                <Chart />
            </StatisticsContainer>
            <RevenueContainer ml={4} flex={1}>
                <StyledTypo variant="span">Total Revenue</StyledTypo>
                <Stack direction="column" sx={{ textAlign: 'center' }}>
                    <StyledTypo
                        variant="span"
                        sx={{ margin: '20px 0px', fontWeight: 500 }}
                    >
                        Total sales made today
                    </StyledTypo>
                    <StyledTypo variant="h4" sx={{ color: '#232323' }}>
                        $420
                    </StyledTypo>
                    <StyledTypo
                        variant="p"
                        margin="20px 0px"
                        sx={{ fontSize: 14 }}
                    >
                        Previous transactions processing. Last payments may not
                        be included.
                    </StyledTypo>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <SalesContainer>
                        <StyledTypo variant="span">Last Quarter</StyledTypo>
                        <SalesAmount variant="span" sx={{ color: '#d1515c' }}>
                            $ 7.5k
                        </SalesAmount>
                    </SalesContainer>
                    <SalesContainer>
                        <StyledTypo variant="span">Last Week</StyledTypo>
                        <SalesAmount variant="span" sx={{ color: '#64b484' }}>
                            $ 15.5k
                        </SalesAmount>
                    </SalesContainer>
                    <SalesContainer>
                        <StyledTypo variant="span">Last Month</StyledTypo>
                        <SalesAmount variant="span" sx={{ color: '#d1515c' }}>
                            $ 12.4k
                        </SalesAmount>
                    </SalesContainer>
                </Stack>
            </RevenueContainer>
        </Stack>
    )
}

export default RevenueComponent
