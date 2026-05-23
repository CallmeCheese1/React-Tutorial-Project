import { useState } from "react"
import { HabitForm } from "./components/HabitForm"
import { HabitList, type Habit } from "./components/HabitList"
import { Header } from "./components/Header"
import { isSameDay } from "date-fns"

export default function App() {
  const [habits, setHabits] = useState<Habit[]>([])

  function addHabit(name: string) {
    //Note to future self: any state is IMMUTABLE. Only way is through setHabits.
    //as he said: anytime you use the existing value of state inside of the state updater, make sure you're actually changing how the codw works by referencing the "second version"?
    
    //so, for example, this one wouldn't work. habits is IMMUTABLE, so it will always only hold the state of what habits was when we first called this.
    //setHabits([...habits, {id: crypto.randomUUID(), name}])
    //setHabits([...habits, {id: crypto.randomUUID(), name}])

    //Instead, passing an arrow function that takes in an input goes into the React engine and tells it to use that input to make the state mutable, allowing us to continuously add to what it is in this moment, in case we wanted to keep adding.
    setHabits(currentHabits => [...currentHabits, {id: crypto.randomUUID(), name, completions: [new Date()] }])
  }

  function deleteHabit(id: string) {
    setHabits(currentHabits => currentHabits.filter(habit => habit.id !== id))
  }

  function toggleHabit(id: string, date: Date) {
    setHabits(currentHabits => (
      currentHabits.map(habit => {
        if (habit.id !== id) return habit
        
        const alreadyDone = habit.completions.some(c => isSameDay(c, date))

        const completions = alreadyDone ? habit.completions.filter(c => !isSameDay(c, date)) : [...habit.completions, date]

        return {...habit, completions}
      })
    ))
  }

  return (
    <div className="max-w-2x1 mx-auto p-4 flex flex-col gap-4">
      <Header />
      <HabitForm addHabit={addHabit}/>
      <HabitList deleteHabit={deleteHabit} toggleHabit={toggleHabit} habits = {habits}/>
    </div>
  )
}
