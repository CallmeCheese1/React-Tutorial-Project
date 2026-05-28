/* eslint-disable react-refresh/only-export-components */
//ending the file with Provider/Context is usually the convention
//context is how we can wrap a bunch of components and give them access to the same state data anywhere

import { isSameDay } from "date-fns";
import { HabitContext, type Habit } from "./useHabits";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { ReactNode } from "react";

type HabitProviderProps = {
    children: ReactNode
}

export function HabitProvider({ children}: HabitProviderProps) {
    const [habits, setHabits] = useLocalStorage<Habit[]>("Habits", [])

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

    //A very fundamental and often used function, toggling that particular day on or off.
    function toggleHabit(id: string, date: Date) {

        //Taking the current array of our habits...
        setHabits(currentHabits => (
            //Mapping a function through every habit...
            currentHabits.map(habit => {
                //if this isn't the ID that we care about, move on
                if (habit.id !== id) return habit
                
                //Based on all the days that this habit has been done, are ANY of them the day we just clicked? Has this day been done? True, or false?
                const alreadyDone = habit.completions.some(c => isSameDay(c, date))

                //Using a ternary operator, if that day is already done, we FILTER OUT that day from the completions array, A.K.A. removing it. If that day is NOT done, then we set completions to everything already in completions...plus our day.
                const completions = alreadyDone ? habit.completions.filter(c => !isSameDay(c, date)) : [...habit.completions, date]
                
                //Return everything else about the habit, exactly as it was, but change the completions to our new one with the specified date turned on or off.
                return {...habit, completions}
                //note: this return translates to actually updating the habit because this is all ultimately being passed into setHabits, which Magic's away updating the habits and that particular habit.
            })
        ))
    }

    return <HabitContext value={{ habits, addHabit, toggleHabit, deleteHabit}}>
        {children}
    </HabitContext>
}