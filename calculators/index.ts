import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();
app.use(express.json());

const PORT = 3002;

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const bmi = calculateBmi(height, weight);

  return res.status(200).json({
    height,
    weight,
    bmi
  });
});

interface ReqBody {
  daily_exercises: Array<number>
  target: number
}

interface CustomRequest<T> {
  body: T
}

app.post('/exercise', (req: CustomRequest<ReqBody>, res) => {
  const exerciseHours = req.body.daily_exercises;
  const target = req.body.target;

  if (!exerciseHours || !target) {
    return res.status(400).json({
      error: 'parameters missing'
    });
  }

  if (isNaN(target)
    || !Array.isArray(exerciseHours)
    || exerciseHours.some(x => isNaN(x))
  ) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const result = calculateExercises(exerciseHours, target);
  return res.json(result);
});

app.listen(PORT, () => {
  console.log(`App listening to port ${PORT}`);
});