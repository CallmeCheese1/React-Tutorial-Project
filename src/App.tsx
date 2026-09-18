import { useEffect, useState } from "react";
import { HabitForm } from "./components/HabitForm";
import { HabitList } from "./components/HabitList";
import { Header } from "./components/Header";
import { HabitProvider } from "./context/HabitProvider";
import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

export default function App() {
  const [weekOffset, setWeekOffset] = useState(0);

  const week = addWeeks(new Date(), weekOffset);
  const visibleDates = eachDayOfInterval({
    start: startOfWeek(week, { weekStartsOn: 1 }),
    end: endOfWeek(week, { weekStartsOn: 1 }),
  });

  useEffect(() => {
    function handler() {
      console.log(weekOffset);
    }

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [weekOffset]);

  return (
    <div className="max-w-2x1 mx-auto p-4 flex flex-col gap-4">
      <HabitProvider>
        <Header
          visibleDates={visibleDates}
          onNext={() => setWeekOffset((o) => o + 1)}
          onPrev={() => setWeekOffset((o) => o - 1)}
        />
        <HabitForm />
        <HabitList visibleDates={visibleDates} />
      </HabitProvider>

      {/*this is a line*/}
      <hr className="border-t border-gray-300 my-2" />

      <span className="text-zinc-400 text-sm">
        Note: None of the below is functional or connected to anything above.
        This is purely to fulfill the assignment requirements.
      </span>

      <fieldset className="flex items-center gap-6">
        <legend className="text-sm font-medium text-zinc-400 mb-2">
          Select View
        </legend>

        <label className="flex items-center gap-2 cursor-pointer text-zinc-400 text-sm">
          <input
            type="radio"
            name="habit-filter"
            value="all"
            defaultChecked
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          All
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-zinc-400 text-sm">
          <input
            type="radio"
            name="habit-filter"
            value="completed"
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          Completed
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-zinc-400 text-sm">
          <input
            type="radio"
            name="habit-filter"
            value="pending"
            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
          />
          Pending
        </label>
      </fieldset>
    </div>
  );
}
