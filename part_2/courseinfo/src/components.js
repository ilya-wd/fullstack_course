import React from 'react';

const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => (
  <p>
    <b>total of {sum} exercises</b>
  </p>
);

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ part }) => (
  <>
    <Part part={part} />
  </>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      {course.parts.map((part) => (
        <Content key={part.id} part={part} />
      ))}
      <Total
        sum={course.parts.reduce(
          (initial, second) => initial + second.exercises,
          0
        )}
      />
    </div>
  );
};

export default Course;
