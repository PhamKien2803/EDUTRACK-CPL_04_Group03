import { Box, Stack } from "@mui/material"
import Header from "../../../components/staff_components/ComponentsPage/layouts/Header"
import MainGrid from "../../../components/staff_components/ComponentsPage/layouts/MainGrid"
import { alpha } from '@mui/material/styles';

function DashboardStaff() {
    return (
        <Box
            component="main"
            sx={(theme) => ({
                flexGrow: 1,
                backgroundColor: alpha(theme.palette.background.default, 1),
                overflow: 'auto',
            })}
        >
            <Stack
                spacing={2}
                sx={{
                    alignItems: 'center',
                    mx: 3,
                    pb: 5,
                    mt: { xs: 8, md: 0 },
                }}
            >
                <Header />
                <MainGrid />
            </Stack>
        </Box>
    )
}

export default DashboardStaff
