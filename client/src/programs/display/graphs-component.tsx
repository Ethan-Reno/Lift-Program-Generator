import React from 'react';

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

const data = [];
for (let num = 30; num >= 0; num ++) {
  data.push({
    date: subDays(new Date(), num).toISOString().substring(0, 10),
    value: 1 + Math.random(),
  });
}

export default function Graph() {
  return <ResponsiveContainer width="100%" height={400}>
    <AreaChart data={data}>
      {/* <defs>
        <LinearGradient id="color" x1="0" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
          <stop offset="0%" stopColor="#2451B7" stopOpacity={0.1} />
        </LinearGradient>
      </defs> */}

      <Area 
        dataKey="value" 
        stroke="#2451B7"
        // fill="url(#color)"
      />

      <XAxis 
        dataKey="date" 
        axisLine={false} 
        tickLine={false}
        tickFormatter={string => {
          const date = parseISO(string);
          // is it a 7, 14, 21 date?
          if (date.getDate() % 7 === 0) {
            // return the date as format:
            return format(date, "MMM, d")
          }
          // if not, return an empty string as the tick
          return ""
        }}
      />

      <YAxis 
        dataKey="value" 
        axisLine={false} 
        tickLine={false} 
        tickCount={8}
        tickFormatter={(number) => `$${number.toFixed(2)}`}
      />

      <Tooltip 
        content={<CustomTooltip />}
      /> 

      <CartesianGrid opacity={0.1} vertical={false} />

    </AreaChart>
  </ResponsiveContainer>;
}

// label = x value
function CustomTooltip(active, payload, label) {
  if (active) {
    return <div>
      <h4>{label}</h4>
    </div>
  }
  return null;
}
