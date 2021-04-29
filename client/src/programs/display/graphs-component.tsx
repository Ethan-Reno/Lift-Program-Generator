import React from 'react';
import { Button, Container, CssBaseline, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { format, parseISO, subDays } from "date-fns";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 0),
  },
  button: {
    margin: theme.spacing(1, 0, 2),
  },
}));

export default function Graph() {

  const classes = useStyles();
  const history = useHistory();
  const amrapData = useSelector((state: any) => state.amrapData.lifts)

  console.log(amrapData);
  
  const data = amrapData;

/*
Psuedo for populating data array

*/

  // for (let num = 30; num >= 0; num --) {
  //   data.push({
  //     date: subDays(new Date(), num).toISOString().substr(0, 10),
  //     value: 1 + Math.random(),
  //     value2: 1 - Math.random(),
  //   });
  // }

  return (
    <Container>
      <CssBaseline />

      <div>
        <Button
          variant="outlined"
          color="secondary"
          className={classes.button}
          onClick={() => history.push({pathname: "/dashboard"})}
        >
          Back
        </Button>
      </div>

      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
            Calculated One-Rep-Max History
          </Typography>
        </Container>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data}>
          {/* <defs>
            <LinearGradient id="color" x1="0" y1="0" x2="0" y2="0">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.1} />
            </LinearGradient>
          </defs> */}

          <Area 
            dataKey="c1RM" 
            stroke="#2451B7"
            // fill="url(#color)"
          />

          {/* <Area 
            dataKey="value2"
            stroke="ad31B7"
          /> */}

          <XAxis 
            dataKey="timestamp" 
            axisLine={false} 
            tickLine={false}
            tickCount={5}
            // tickFormatter={string => {
            //   const date = parseISO(string);
            //   // is it a 7, 14, 21 date?
            //   if (date.getDate() % 7 === 0) {
            //     // return the date as format:
            //     return format(date, "MMM, d")
            //   }
            //   // if not, return an empty string as the tick
            //   return ""
            // }}
          />

          <YAxis 
            dataKey="c1RM" 
            axisLine={false} 
            tickLine={false} 
            tickCount={8}
            // tickFormatter={(number) => `${number.toFixed(2)}`}
          />

          <Tooltip 
            // content={<CustomTooltip />}
          /> 

          <CartesianGrid opacity={0.1} vertical={false} />

        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (active) {
    return (
      <div className="tooltip">
        <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
        <p>${payload[0].value.toFixed(2)} CAD</p>
        <p>${payload[1].value.toFixed(2)} USD</p>
      </div>
    );
  }
  return null;
}
