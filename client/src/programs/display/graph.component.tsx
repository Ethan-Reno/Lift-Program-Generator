import React from 'react';
import { Button, Container, CssBaseline, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  CartesianGrid,
} from "recharts";

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
  let data = amrapData;

  const lifts = amrapData.map(data => data.lift);
  const liftsSet = new Set(lifts);
  const uniqueLifts = [...liftsSet];

  console.log(uniqueLifts);

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
        <LineChart>

          <Line 
            data={data} 
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

        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

// function CustomTooltip({ active, payload, label }: any) {
//   if (active) {
//     return (
//       <div className="tooltip">
//         <h4>{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
//         <p>${payload[0].value.toFixed(2)} CAD</p>
//         <p>${payload[1].value.toFixed(2)} USD</p>
//       </div>
//     );
//   }
//   return null;
// }
