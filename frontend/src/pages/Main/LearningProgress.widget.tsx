import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../../components/Title';

// Generate Sales Data
function createData(date: string, amount?: number) {
  return { date, amount };
}

const data = [
  createData('21.09', 0),
  createData('22.09', 300),
  createData('23.09', 600),
  createData('24.09', 800),
  createData('25.09', 1500),
  createData('26.09', 2000),
  createData('27.09', 2400),
  createData('28.09', 2400),
  createData('29.09', undefined),
];

export default function LearningProgressWidget() {
  const theme = useTheme();

  return (
    <>
      <Title>Прогресс обучения (демонстрационный режим)</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="date"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            dataKey="amount"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Прогресс
            </Label>
          </YAxis>
          <Line
            isAnimationActive={true}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
