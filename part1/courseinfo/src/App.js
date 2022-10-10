const App = () => {
  const course = {
    name: 'Half Stack Application Development',
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      }, 
      {
        name: "Using Props to Pass Data",
        exercises: 7,
      },
      {
        name: "State of a Component",
        exercises: 14,
      },
    ],
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return(
    <p>
      {props.part} : {props.exercise}
    </p>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.parts[0].name} exercise={props.parts[0].exercises}/>
      <Part part={props.parts[1].name} exercise={props.parts[1].exercises}/>
      <Part part={props.parts[2].name} exercise={props.parts[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>
      Number of Exercises: {" "} 
      {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
    </p>
  )
}

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App