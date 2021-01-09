interface ExersiseResults {
  periodLength: number
  trainingDays: number
  sucess: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (trainingHours: Array<number>, target: number): ExersiseResults => {
  const average = (trainingHours.reduce((a, b) => a + b, 0) / trainingHours.length) || 0;

  let rating = 2;
  let ratingDescription = 'Nice';
  if (average <= target / 2) {
    rating = 1;
    ratingDescription = 'Better next time!';
  }
  else if (average > 2 * target) {
    rating = 3;
    ratingDescription = 'Whoa';
  }

  return {
    periodLength: trainingHours.length,
    trainingDays: trainingHours.filter(hours => hours > 0).length,
    sucess: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

interface ParsedArguments {
  target: number
  hoursArray: Array<number>
}

const parseArgumentsExercise = (args: Array<string>): ParsedArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');

  // Parse target
  const target = Number(args[2]);
  if (isNaN(target)) {
    throw new Error('invalid target');
  }

  // Parse hours
  const hoursArray = [];
  for (let i = 3; i < args.length; i++) {
    if (isNaN(Number(args[i]))) {
      throw new Error('invalid hours');
    }
    hoursArray.push(Number(args[i]));
  }


  return {
    target,
    hoursArray
  };
};

try {
  const { target, hoursArray } = parseArgumentsExercise(process.argv);
  console.log(calculateExercises(hoursArray, target));
}
catch (error) {
  console.log((error as Error).message);
}

export default calculateExercises;