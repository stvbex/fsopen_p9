import React from "react";
import ReactDOM from "react-dom";

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOneThree extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartOneThree {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartOneThree {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

interface CoursePartCustom extends CoursePartOneThree {
  name: 'Nemo';
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartCustom;

export interface CourseParts {
  courseParts: CoursePart[];
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};


const Part: React.FC<CoursePart> = (coursePart) => {
  switch (coursePart.name) {
    case 'Fundamentals':
      return (
        <p>
          {coursePart.name} {coursePart.description} {coursePart.exerciseCount}
        </p>
      )
    case 'Using props to pass data':
      return (
        <p>
          {coursePart.name} {coursePart.exerciseCount}
        </p>
      )
    case 'Deeper type usage':
      return (
        <p>
          {coursePart.name} {coursePart.description} {coursePart.exerciseCount}
        </p>
      )
    case 'Nemo':
      return (
        <p>
          {coursePart.name} {coursePart.description} {coursePart.exerciseCount}
        </p>
      )
    default:
      return assertNever(coursePart);
  }
}

interface HeaderProps {
  courseName: string
}

const Header: React.FC<HeaderProps> = ({ courseName }) => {
  return (
    <h1>{courseName}</h1>
  )
}

const Content: React.FC<CourseParts> = ({ courseParts }) => {
  return (
    <div>
      <Part {...courseParts[0]} />
      <Part {...courseParts[1]} />
      <Part {...courseParts[2]} />
    </div>
  )
}

const Total: React.FC<CourseParts> = ({ courseParts }) => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));