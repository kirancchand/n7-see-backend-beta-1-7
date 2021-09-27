import React, { Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import makeStyles from '@material-ui/styles/makeStyles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { useSelector, useDispatch } from 'react-redux';
// import Skeleton from '@material-ui/lab/Skeleton';
import Skeleton from '@material-ui/core/Skeleton';
import axios from 'axios';
import { ToastContainer, toast } from 'material-react-toastify';
import BuyCard from '../../components/Card/BuyCard';
import FeatureCard from '../../components/Card/FeatureCard';
import HighlightCard from '../../components/Card/HighlightCard';
// import { increment, decrement, getCounter } from "./counterReducer";
// import { useSelector, useDispatch } from "react-redux";
import dashboardimg from '../../assets/images/dashboardimg.png';
import DividerComponent from '../../components/DividerComponent';

// import CarouselSlider from './components/CarouselSlider';

import SearchSection from '../../components/SearchSection';
import { fetchHomeData } from '../../redux/actions';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    marginLeft: '40px',
    // border:"1px solid #000"
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
    // border:"1px solid #000"
  },
  headerAvatar: {
    height: '10vh'
  },
  grid1Col1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid1Col1Img: {
    height: '100%',
    width: '600px'
  },
  grid1Col2: {
    backgroundColor: '#F9F9FB',
    marginRight: '10px',
    // border:"1px solid #000",
    borderRadius: '0px 5px 5px 0px',
    padding: '30px 40px 10px 40px',
  },
  grid1Col2Buyer: {
    backgroundColor: '#F9F9FB',
    marginRight: '10px',
    // border:"1px solid #000",
    borderRadius: '0px 5px 5px 0px',
    padding: '40px'
  },
  grid2Col1Bottom: {
    display: 'flex',
    marginTop: '20px',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  homeSearch: {
    margin: '0px 10px 20px 0px',
    // border:"1px solid #000"
  }
}));
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>
      {' '}
      {new Date().getFullYear()}
      .
    </Typography>
  );
}

export default function Home() {
  const classes = useStyles();
  // const counter = useSelector(getCounter);

  const dispatch = useDispatch();
  // let loading = useSelector(state=>state.fetchDataReducer.loading);
  // let data = useSelector(state=>state.fetchDataReducer.data);

  // let highlightedProduct=!loading?data.highlightedProduct:[];
  // console.log(loading);
  // console.log(!loading?data.banner:[]);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [loadingIndicator, setLoadingIndicator] = useState(true);
  const [data, setData] = useState(null);
  const [banner, setBanner] = useState([]);
  const [highlightedListing, setHighlightedListing] = useState([]);
  const [featuredListing, setFeaturedListing] = useState([]);
  const [latestListing, setLatestListing] = useState([]);
  useEffect(() => {
    // dispatch(fetchHomeData());
    const fetchData = async () => {
      setLoadingIndicator(true);
      // https://run.mocky.io/v3/e79f1d99-c66f-4713-9586-d495562b1b43
      await axios('http://localhost:4000/request').then((resp) => {
        console.log(resp);
        setLoadingIndicator(false);
        setData(resp.data.response);
        setBanner(resp.data.response.banner);
        setHighlightedListing(resp.data.response.highlightedlisting);
        setFeaturedListing(resp.data.response.featuredlisting);
        setLatestListing(resp.data.response.latestlisting);
        // console.log(resp.data.banner);
      }).catch((e) => {
        setLoadingIndicator(false);
        toast.error('Something Went Wrong', { autoClose: 3000, });
      });
      // setUser(result.data);
    };

    fetchData();
  }, []);
  return (
    <>
      <Grid className={classes.container}>
        <Grid container>
          <Grid item xs={12} md={7} lg={8}>
            <Box className={classes.homeSearch}>
              <SearchSection theme="light" />
            </Box>
            <Box style={{ marginRight: '10px' }}>
              {/* <CarouselSlider banner={banner} /> */}
            </Box>
            <Box style={{ paddingBottom: '20px', paddingTop: '20px' }}>
              <DividerComponent>Highlighted Listing</DividerComponent>
            </Box>
            <Box style={{ marginRight: '10px', marginTop: '20px' }}>
              <Grid container direction="row" justifyContent="space-between" spacing={2}>

                {
                  !loadingIndicator && data != null ? highlightedListing.slice(0, 3).map((highlightedproduct, i) => (
                    <Grid item md={4}>
                      <HighlightCard key={i} item={highlightedproduct} />
                    </Grid>
                  )) : <Skeleton animation="wave" />
                }
                {/* <FeatureCard/>
                <FeatureCard/>
                <FeatureCard/> */}

              </Grid>

            </Box>
            <Box style={{ paddingBottom: '20px', paddingTop: '40px' }}>
              <DividerComponent>Featured Listing</DividerComponent>
            </Box>

            <Box className={classes.grid2Col1Bottom} style={{ marginTop: '20px', marginRight: '10px' }}>
              <Grid container>
                {
                  !loadingIndicator && data != null ? featuredListing.slice(0, 4).map((featuredproduct, i) => (
                    <Grid item xs={12} md={6} lg={6}>
                      <FeatureCard key={i} item={featuredproduct} />
                    </Grid>
                  )) : <Skeleton animation="wave" />
                  }
              </Grid>
            </Box>

            {/* <Box className={classes.grid2Col1Bottom} style={{marginTop:"20px",marginRight:"10px"}}>
                <FeatureCard/>
                <FeatureCard/>
                </Box> */}
          </Grid>
          <Grid item xs={12} md={5} lg={4}>

            <Container className={classes.grid1Col2}>

              <Box style={{ paddingBottom: '30px' }}>
                <DividerComponent>Fresh Recommendations</DividerComponent>
              </Box>
              <Box>

                <Grid item>

                  {
                  !loadingIndicator && data != null ? latestListing.slice(0, 6).map((latestproduct, i) => (
                    <BuyCard key={i} item={latestproduct} />
                  )) : <Skeleton animation="wave" />
                }

                  {/*
                    <BuyCard/>
                    <BuyCard/>
                    <BuyCard/>
                    <BuyCard/>
                    <BuyCard/>
                    <BuyCard/> */}
                </Grid>
              </Box>
              <br />
              <Box />
            </Container>

          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={7} lg={8} />
          <Grid item xs={12} md={5} lg={4}>
            <Container className={classes.grid1Col2} />

          </Grid>
        </Grid>
      </Grid>
      <Grid item style={{ backgroundColor: '#F9F9FB' }}>
        <Box pt={4}>
          <Copyright />
        </Box>
      </Grid>
      <ToastContainer />
    </>
  );
}
