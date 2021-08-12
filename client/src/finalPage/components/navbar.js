import React, { memo } from 'react';
import { useSnackbar } from 'notistack';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Hidden,
  IconButton,
  withStyles,
  Dialog,
  TextField,
  DialogContent,
  Avatar,
  CssBaseline,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Container from '@material-ui/core/Container';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import { server } from '../../serverChoose';
import VoterContext from '../../VoterContext';
import { useHistory } from 'react-router';
const styles = (theme) => ({
  appBar: {
    boxShadow: theme.shadows[6],
    backgroundColor: theme.palette.common.white,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400,
  },
  noDecoration: {
    textDecoration: 'none !important',
  },
});

function NavBar(props) {
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const { voterDetails, setVoterDetails } = React.useContext(VoterContext);
  const { classes } = props;

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const submit = (e) => {
    e.preventDefault();
    const { aadhar, birth } = e.target.elements;

    history.push('/voting');
    axios
      .post(server + '/verifyaadhar', {
        uid: aadhar.value,
        bday: birth.value,
      })
      .then((res_) => {
        if (res_.status === 200) {
          console.log(res_.data);
          setVoterDetails(res_.data);
          enqueueSnackbar('Verification Success', {
            variant: 'success',
          });
          console.log(voterDetails);
        } else {
          throw new Error('Error occured');
        }
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error Occured', {
          variant: 'error',
        });
      });
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div>
            <Typography
              variant="h4"
              className={classes.brandText}
              display="inline"
              color="primary"
            >
              Crypto
            </Typography>
            <Typography
              variant="h4"
              className={classes.brandText}
              display="inline"
              color="secondary"
            >
              Vote
            </Typography>
          </div>
          <div>
            <Hidden mdUp>
              <IconButton
                className={classes.menuButton}
                aria-label="Open Navigation"
              >
                <MenuIcon color="primary" />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              <Button
                color="secondary"
                size="large"
                classes={{ text: classes.menuButtonText }}
              >
                Home
              </Button>
              <Button
                color="secondary"
                size="large"
                onClick={handleOpen}
                classes={{ text: classes.menuButtonText }}
              >
                Login
              </Button>
              <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                  <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                      <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                      </Avatar>
                      <Typography component="h1" variant="h5">
                        Sign in
                      </Typography>
                      <form className={classes.form} onSubmit={submit}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="adharCard"
                          label="Adhar Card No."
                          name="aadhar"
                          autoFocus
                        />
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="birth"
                          label="Birth-Date ( DD-MM-YYYY )"
                          id="birthDate"
                        />
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="secondary"
                          className={classes.submit}
                        >
                          Verify
                        </Button>
                      </form>
                    </div>
                  </Container>
                </DialogContent>
              </Dialog>
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(memo(NavBar));
