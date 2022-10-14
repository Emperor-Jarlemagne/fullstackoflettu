import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>{text}</button>
)

const Winner = ({anecdotes, votes}) => {
  const mostVotes = Math.max(...votes)
  const voteIndex = votes.indexOf(mostVotes)
  const winner = anecdotes[voteIndex]
  if (mostVotes === 0) {
    return (
      <p>No Votes Yet!</p>
    )
  }
  return (
    <div>
      <p>{winner}</p>
      <p> has {mostVotes} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Theyre makin a monkey outta yew!',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([...anecdotes].fill(0))

  const NewQuote = () => {
    const randomNumber = Math.floor(Math.random() * Math.floor(anecdotes.length))
    setSelected(randomNumber)
  }

  const Vote = () => {
    const newVote = [...votes]
    newVote[selected] += 1
    setVotes(newVote)
  }

  return (
    <div>
      <h1>Anecdote Of The Day: </h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <div>
        
        <Button handleClick={Vote} text="Vote For This Quote" />
        <Button handleClick={NewQuote} text="Next Anecdote" />
      </div>
      <div>
        <h1>Anecdote With Most Votes:</h1>
        <Winner anecdotes={anecdotes} votes={votes} />
      </div>
    </div>
  )
}

export default App