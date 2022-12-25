import "./Christmasgiftpage.css";
import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

import Spline from "@splinetool/react-spline";
import { Engine, IOptions, RecursivePartial } from "tsparticles-engine";
import { Gift } from "../../Components/Gift/Gift";

function ChristmasgiftsPage() {
  const [gender, setGender] = useState("");
  const [profession, setProfession] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [christmasGiftsArray, setChristmasGiftsArray] = useState([]);

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
        value: 18,
      },
      opacity: {
        value: { min: 0.2, max: 0.8 },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 2, max: 4 },
      },
      move: {
        direction: "bottom",
        enable: true,
        speed: { min: 1, max: 2 },
        straight: true,
      },
    },
  };

  const backend_URL = "http://localhost:8080";

  const fetchData = () => {
    console.log(gender, profession, hobbies);

    const giftPostOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        gender: gender,
        profession: profession,
        hobbies: hobbies,
      }),
    };

    fetch(`${backend_URL}/christmasgifts`, giftPostOptions)
      .then((res) => res.json())
      .catch((error) => console.log(error))
      .then((data) => {
        console.log(data.giftstext);
        setChristmasGiftsArray(data.giftstext.split("\n\n"));
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Fetch Christmas Gifts");
    fetchData();
  };

  return (
    <div className="App">
      <Particles options={options} init={init} />
      <h1>The Giving Tree</h1>
      <div className="gift_input_div">
        <h4>Welcome to The Giving Tree! You are on the Christmas Gifts page!</h4>
        <h4>Having trouble finding the perfect Christmas gift?</h4>
        <h4>Enter the Gender, Profession, and Hobbies of the recipient as best you can, then hit submit. 
          Feel free to enter vague/neutral entries, but the best results are when they are specific!
        </h4>
        <form className="gift_input_box" onSubmit={handleSubmit}>
          <label>
            Gender:
            <br />
            <input
              type="text"
              name="gender"
              onChange={(e) => setGender(e.target.value)}
            />
          </label>
          <label>
            Profession:
            <br />
            <input
              type="text"
              name="profession"
              onChange={(e) => setProfession(e.target.value)}
            />
          </label>
          <label>
            Hobbies:
            <br />
            <input
              type="text"
              name="hobbies"
              onChange={(e) => setHobbies(e.target.value)}
            />
          </label>
          <input id="submit" type="submit" value="Submit" />
        </form>
      </div>
      <Spline
        className="spline"
        scene="https://prod.spline.design/qMW1BAm3aOgvI0fY/scene.splinecode"
      />
      {christmasGiftsArray != undefined ? (
        <div className="gift_wrapper">
          {christmasGiftsArray.slice(1, 6).map((item: string, index) => (
            <Gift item={item} key={index} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default ChristmasgiftsPage;
