//component responsible for formatting a single course called Course

const Header = ({name}) => {
    return <h1>{name}</h1>
}
const Part = ({part,exercises}) => {
    return (
        <p>
            {part} {exercises}
        </p>
    )
}
const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part => 
                <Part key={part.id} part={part.name} exercises={part.exercises} />)}
        </div>
    )
}
const Total = ({parts}) => {

    const sumOfExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
    /* const sumOfExercises = parts.map(part => part.exercises).reduce((sum, part) => sum + part, 0) */

    return <p style={{fontWeight: 'bold'}}>total of {sumOfExercises} exercises</p>
  }
const Course = ({ course }) => {

    return (
        <div>
            <Header name={course.name} />           
            <Content parts={course.parts} />
            <Total parts={course.parts} /> 
        </div>
    )
}
export default Course