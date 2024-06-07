import StatisticLine from "./StatisticLine"

const Statistics = ({ good, neutral, bad}) => {

    const totalClicks = good + neutral + bad
	const averageScore = totalClicks === 0 ? 0 : (good - bad) / totalClicks
	const positivePercentage = totalClicks === 0 ? 0 : (good / totalClicks) * 100

    return (
        <div>
            {totalClicks === 0 
            ? 
            <p>No feedback given</p> 
            : 
            <table>
                <tbody>
                    <StatisticLine text="good" value ={good} />
                    <StatisticLine text="neutral" value ={neutral} />
                    <StatisticLine text="bad" value ={bad} />
                    <StatisticLine text="all" value ={totalClicks} />
                    <StatisticLine text="average" value ={averageScore} />
                    <StatisticLine text="positive" value ={positivePercentage} />
                </tbody>
            </table>}				
        </div>
    )
}
export default Statistics
