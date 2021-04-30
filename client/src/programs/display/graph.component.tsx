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

/* 
lifts = [
  {
    lift: "liftName",
    data: [
      {
        c1RM: number,
        timestamp: string,
      }
    ]
  },
  {},
  {},
]

*/
export default function Graph() {

  const classes = useStyles();
  const history = useHistory();
  const amrapData = useSelector((state: any) => state.amrapData.lifts)

  const getDataArrayOfObjects = (lift: any) => {
    let liftData = [];
    lift.data.forEach((dataPoint) => {
      liftData = [
        ...liftData,
        {
          c1RM: dataPoint.c1RM,
          date: dataPoint.timestamp,
        },
      ];
    })
    return liftData;
  };

  function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // TODO: hardcode a decent sized array (to account for custom lifts) for first many colors - for consistency and aesthetic. perhaps random after many?

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
            Calculated 1RM History
          </Typography>
        </Container>
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart>

        <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false}
            tickCount={2}
            type="number" 
            domain={['dataMin - 100', 'dataMax + 100']}
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

        {amrapData.map((value, index) => {
          return <Line 
            data={getDataArrayOfObjects(amrapData[index])} 
            dataKey="c1RM" 
            stroke={getRandomColor()}
          />
        })}

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
