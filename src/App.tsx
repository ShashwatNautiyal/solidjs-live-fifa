import { Component, Show, createEffect, createSignal, onMount } from "solid-js";
import { BsDot } from "solid-icons/bs";

const App: Component = () => {
  const [score, setScore] = createSignal({
    argentina: 0,
    brazil: 0,
  });
  onMount(() => {
    const event = new EventSource("http://0.0.0.0:8000/sse");
    event.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setScore({
        argentina: data.argentina,
        brazil: data.brazil,
      });
    };
  });

  return (
    <div class="bg-gradient-to-r from-gray-700 to-gray-800 min-h-screen">
      <div class="grid place-items-center min-h-screen text-white">
        <div class="bg-slate-950 h-fit max-h-[80vh] w-[90vw] max-w-[700px] rounded-lg shadow-md p-6">
          <div class="flex justify-between">
            <h1 class="flex-1 flex justify-center text-xl">FIFA 2026</h1>
          </div>

          <div class="text-center my-16 flex justify-center items-center gap-4">
            <div class="text-lg">
              <img
                class="object-contain w-[160px]"
                src="https://api.fifa.com/api/v3/picture/flags-sq-4/ARG"
                alt="ARG"
              />
              Argentina
            </div>
            <span class="whitespace-nowrap text-7xl">{`${score().argentina} : ${
              score().brazil
            }
            `}</span>

            <div class="text-lg">
              <img
                class="object-contain w-[160px]"
                src="https://api.fifa.com/api/v3/picture/flags-sq-4/BRA"
                alt="BRA"
              />
              Brazil
            </div>
          </div>

          <div class="bg-red-700/[0.5] py-1 rounded-full w-fit flex items-center text-center px-4 mx-auto">
            <BsDot size={50} class="-m-4" color="red" />
            Live Now
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
