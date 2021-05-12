import { Container, CssBaseline, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import dayjs from 'dayjs';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    padding: theme.spacing(4, 0, 0),
  },
}));

export default function Graph() {

  const classes = useStyles();
  const amrapData = useSelector((state: any) => state.amrapData.lifts)

  const getDataArray = (lift: any) => {
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

  let colors = [
    "#77AD78", //forest green crayola
    "#FFBD00", //mango
    "#6874E8", //neon blue
    "#F85E00", //orange
    "#FF3333", //tart orange
  ]


  return (
    <Container>
      <CssBaseline />

      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
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
            tick={{ fill: 'white', fontSize: 12 }}
            interval={0}
            type="number"
            padding={{right: 30}}
            angle={-35}
            domain={['auto', 'auto']}
            tickFormatter={(num) => {
              const date = dayjs(num)
              return dayjs(date).format('DD-MMM');
              //h:m:s aaa
              }
            }
          />

          <YAxis 
            dataKey="c1RM" 
            axisLine={false} 
            tickLine={false} 
            tickCount={8}
            tick={{ fill: 'white', fontSize: 12 }}
            label={{value: "Weight (lb)", fill: 'white', angle: -90, position: "insideLeft"}}
            // tickFormatter={(number) => `${number.toFixed(2)}`}
            // TODO: round numbers to something nice
          />

          <Legend verticalAlign="top" height={36}/>

        {amrapData.map((value, index) => {
          return <Line 
            name={amrapData[index].lift} 
            type="monotone"
            data={getDataArray(amrapData[index])} 
            dataKey="c1RM" 
            stroke={colors[index]} //TODO: add color array
          />
          // TODO: future, add delete action to remove a data point from amrap slice
        })}

          <Tooltip 
            // content={<CustomTooltip />}
          /> 

          <CartesianGrid opacity={0.2} vertical={false} />

        </LineChart>
      </ResponsiveContainer>
    </Container>
  );
}

// TODO: fix custom tooltip payload error
// function CustomTooltip({ active, payload, label }: any) {
//   if (active) {
//     return (
//       <div>
//         <h4>{dayjs(label).format('DD-MMM HH:mm:ss')}</h4>
//         <p>{payload[0].value} lbs</p>
//       </div>
//     );
//   }
//   return null;
// }
