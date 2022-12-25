import "./Christmaseventspage.css";
import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import Spline from "@splinetool/react-spline";
import { Engine, IOptions, RecursivePartial } from "tsparticles-engine";
import Navbar from "../../Components/Navbar/Navbar";

function ChristmaseventsPage() {
  const [location, setLocation] = useState("");
  const [christmasEventsArray, setChristmasEventsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // TSParticles Options for Snow
  // References: https://www.youtube.com/watch?v=m0zkNlFBzA4
  // References: https://www.npmjs.com/package/tsparticles-preset-snow
  const init = useCallback(async (engine: Engine) => {
    await loadFull(engine);
  }, []);

  const options: RecursivePartial<IOptions> = {
    particles: {
      color: {
        value: "#FFF",
      },
      number: {
        value: 30,
      },
      opacity: {
        value: { min: 0.4, max: 0.6 },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 3, max: 5 },
      },
      move: {
        direction: "bottom",
        enable: true,
        speed: { min: 3, max: 5 },
        straight: true,
      },
    },
  };

  const backend_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchData = () => {
    console.log(location);

    const christmasEventsPostOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        location: location,
      }),
    };

    fetch(`${backend_URL}/christmasevents`, christmasEventsPostOptions)
      .then((res) => res.json())
      .catch((error) => console.log(error))
      .then((data) => {
        console.log(data);
        setChristmasEventsArray(data.eventtext.split("\n\n"));
        setIsLoading(false);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Fetch Christmas Events");
    setIsLoading(true);
    fetchData();
  };

  return (
    <div className="App">
      <Navbar />
      <Particles options={options} init={init} />
      <h1>The Giving Tree</h1>
      <div className="gift_input_div">
        <h4>Welcome to The Giving Tree! You are on the Christmas Events page!</h4>
        <h4>Having trouble planning Christmas events?</h4>
        <h4>Optionally, enter your Location (City, State/Province) for more specific suggestions!
        </h4>
        <form className="event_input_box" onSubmit={handleSubmit}>
          <label>
            Location (optional):
            <br />
            <input
              type="text"
              name="location"
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <input id="submit" type="submit" value="Submit" />
        </form>
        {isLoading == true ? <p>Loading... please wait</p> : null}
      </div>
      <Spline
        className="spline"
        scene="https://prod.spline.design/qMW1BAm3aOgvI0fY/scene.splinecode"
      />
      {christmasEventsArray != undefined ? (
        <div className="event_wrapper">
          {christmasEventsArray.slice(1,5).map((item: string, index) => (
            <p className="individual_event" key={index}>{item}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default ChristmaseventsPage;
