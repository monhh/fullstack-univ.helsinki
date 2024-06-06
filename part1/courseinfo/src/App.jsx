//Header takes care of rendering the name of the course
const Header = (props) => {
	return (
		<h1>{props.course.name}</h1>
	)
}

//Content renders the parts and their number of exercises
//Refactor the Content component so that it does not render any names of parts 
//	or their number of exercises by itself.
//Instead, it only renders three Part components 
//	of which each renders the name and number of exercises of one part.
const Content = (props) => { 

	const parts1 = props.parts[0].name;
	const exercises1 = props.parts[0].exercises;

	const parts2 = props.parts[1].name;
	const exercises2 = props.parts[1].exercises;

	const parts3 = props.parts[2].name;
	const exercises3 = props.parts[2].exercises;

	return (
	<div>
		<Part part={parts1} exercises={exercises1}/>
		<Part part={parts2} exercises={exercises2} />
		<Part part={parts3} exercises={exercises3} />
	</div>    
	)
}
//Part renders the name and number of exercises
const Part = (props) => {
	return (
		<p>{props.part} {props.exercises}</p>
	)
}

// Total renders the total number of exercises
const Total = (props) => {
	return (
		<p>Number of exercises {''}
			{props.parts[0].exercises + 
			props.parts[1].exercises + 
			props.parts[2].exercises}
		</p>
	)
}

const App = () => {

	const course = {
		name: 'Half Stack application development',
		parts: [
			{
			name: 'Fundamentals of React',
			exercises: 10
			},
			{
			name: 'Using props to pass data',
			exercises: 7
			},
			{
			name: 'State of a component',
			exercises: 14
			}
		]
	}

	return (
		<div>
			<Header course={course} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}
export default App