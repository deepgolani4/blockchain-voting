import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useSnackbar } from 'notistack';
import {
  Typography,
  Button,
  withStyles,
  TextField,
  CssBaseline,
  withWidth,
} from '@material-ui/core';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { server } from '../../serverChoose';
import VoterContext from '../../VoterContext';
import { useHistory } from 'react-router';

const styles = (theme) => ({
  extraLargeButtonLabel: {
    fontSize: theme.typography.body1.fontSize,
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up('xs')]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  card: {
    boxShadow: theme.shadows[4],
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('xs')]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(5.5),
      paddingBottom: theme.spacing(5.5),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.up('lg')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down('lg')]: {
      width: 'auto',
    },
  },
  wrapper: {
    position: 'relative',
    backgroundColor: theme.palette.secondary.main,
    paddingBottom: theme.spacing(2),
  },
  image: {
    maxWidth: '100%',
    verticalAlign: 'middle',
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },
  container: {
    marginTop: theme.spacing(6),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(3),
    },
  },
  containerFix: {
    [theme.breakpoints.up('md')]: {
      maxWidth: 'none !important',
    },
  },
  waveBorder: {
    paddingTop: theme.spacing(4),
  },
});

function HeadSection(props) {
  const { classes } = props;
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { voterDetails, setVoterDetails } = React.useContext(VoterContext);

  const submit = (e) => {
    e.preventDefault();
    const { aadhar, birth } = e.target.elements;

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
          history.push('/voting');
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
    <Fragment>
      <div className={classNames('lg-p-top')}>
        <div>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
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
        </div>
      </div>
      {/* <WaveBorder
        upperColor={theme.palette.secondary.main}
        lowerColor="#FFFFFF"
        className={classes.waveBorder}
        animationNegativeDelay={10}
      /> */}
    </Fragment>
  );
}

HeadSection.propTypes = {
  classes: PropTypes.object,
  width: PropTypes.string,
  theme: PropTypes.object,
};

export default withWidth()(
  withStyles(styles, { withTheme: true })(HeadSection)
);
