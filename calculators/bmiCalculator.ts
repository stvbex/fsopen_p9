const calculateBmi = (height: number, weight: number): string => {
  const bmi = weight / (0.0001 * height ** 2);
  
  if (bmi < 15) {
    return 'Very severely underweight';
  }
  else if (bmi < 16) {
    return 'Severely underweight';
  }
  else if (bmi < 18.5) {
    return 'Underweight';
  }
  else if (bmi < 25) {
    return 'Normal (healthy weight)';
  }
  else if (bmi < 30) {
    return 'Overweight';
  }
  else if (bmi < 35) {
    return 'Obese Class I (Moderately obese)';
  }
  else if (bmi < 40) {
    return 'Obese Class II (Severely obese)';
  }
  else {
    return 'Obese Class III (Very severely obese)';
  }
};

interface Person {
  height: number
  weight: number
}

const parseArgumentsBmi = (args: Array<string>): Person => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (isNaN(Number(args[2])) || isNaN(Number(args[3]))) {
    throw new Error('Provided values were not numbers');
  }

  return {
    height: Number(args[2]),
    weight: Number(args[3])
  };
};

try {
  const { height, weight } = parseArgumentsBmi(process.argv);
  console.log(calculateBmi(height, weight));
}
catch (error) {
  console.log((error as Error).message);
}

export default calculateBmi;