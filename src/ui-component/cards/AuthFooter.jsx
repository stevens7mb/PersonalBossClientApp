// material-ui
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="subtitle2" component={Link} href="https://www.purecipher.com/personal-boss" target="_blank" underline="hover">
    https://www.purecipher.com/personal-boss
    </Typography>
  </Stack>
);

export default AuthFooter;
