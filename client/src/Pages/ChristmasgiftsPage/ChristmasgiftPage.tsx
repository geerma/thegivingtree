import "./Christmasgiftpage.css";
import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

// References: https://www.npmjs.com/package/@splinetool/react-spline
import Spline from "@splinetool/react-spline";
import { Engine, IOptions, RecursivePartial } from "tsparticles-engine";
import { Gift } from "../../Components/Gift/Gift";
import Navbar from "../../Components/Navbar/Navbar";

/**
 * Page which suggests Christmas Gifts
 * @returns div for christmas gifts
 */
function ChristmasgiftsPage() {
  const [gender, setGender] = useState("");
  const [profession, setProfession] = useState("");
  const [hobbies, setHobbies] = useState("");
  const [christmasGiftsArray, setChristmasGiftsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [giftId, setGiftId] = useState(0);
  const [isLoadingSpecific, setIsLoadingSpecific] = useState(false);
  const [specificGiftText, setSpecificGiftText] = useState("");

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
        value: 40,
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

  const backend_URL = import.meta.env.VITE_BACKEND_URL;

  /**
   * Fetches gift suggestions from the backend server
   * @returns 
   */
  const fetchGifts = () => {
    setIsLoading(true); // Set Loading to True
    setSpecificGiftText("") // Clears Specific Gift Text

    // Prevent multiple loadings
    if (isLoading == true) {
      window.alert(
        "Please wait patiently. Refresh the page if there was an error."
      );
      return;
    }

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
        setIsLoading(false);
        setChristmasGiftsArray(data.giftstext.split("\n\n")); // Splits into Array, which is mapped
      });
  };

  /**
   * Function is called when submit button is clicked to obtain all gift suggestions
   * @param e 
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Fetch Christmas Gifts");
    setIsLoading(true);
    fetchGifts();
  };

  /**
   * OnClick function that is called when submit button is clicked after giftId is entered
   * Gets more information about one specific gift
   * @returns 
   */
  const requestMore = () => {
    if (giftId == 0) {
      window.alert("Please enter a gift number");
      return;
    }
    console.log("Fetching More Information for", giftId);
    fetchSpecificGift(); // Calls fetch API
  };

  /**
   * Fetches more information for a specific gift
   */
  const fetchSpecificGift = () => {
    setIsLoadingSpecific(true);

    const specificGiftPostOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        giftText: christmasGiftsArray[giftId],
      }),
    };

    fetch(`${backend_URL}/christmasgiftsspecific`, specificGiftPostOptions)
      .then((res) => res.json())
      .catch((error) => console.log(error))
      .then((data) => {
        console.log(data.specificgifttext);
        setSpecificGiftText(data.specificgifttext);
        setIsLoadingSpecific(false);
      });
  };

  return (
    <div className="App">
      <Navbar />
      <Particles options={options} init={init} />
      <h1>The Giving Tree</h1>
      <div className="gift_input_div">
        <h4>
          Welcome to The Giving Tree! You are on the Christmas Gifts page!
        </h4>
        <h4>Having trouble finding the perfect Christmas gift?</h4>
        <h4>
          Enter the Gender, Profession, and Hobbies of the recipient as best you
          can, then hit submit. Feel free to enter vague/neutral entries, but
          the best results are when they are specific!
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
            Profession (ex. computer science student, nurse):
            <br />
            <input
              type="text"
              name="profession"
              onChange={(e) => setProfession(e.target.value)}
            />
          </label>
          <label>
            Hobbies (ex. working out, games, music, cooking):
            <br />
            <input
              type="text"
              name="hobbies"
              onChange={(e) => setHobbies(e.target.value)}
            />
          </label>
          <input id="submit" type="submit" value="Submit" />
        </form>
        {isLoading == true ? <p>Loading... please wait patiently</p> : null}
      </div>
      <Spline
        className="spline"
        scene="https://prod.spline.design/qMW1BAm3aOgvI0fY/scene.splinecode"
      />
      {christmasGiftsArray.length != 0 ? (
        <div>
          <div className="gift_wrapper">
            {christmasGiftsArray.slice(1, 6).map((item: string, index) => (
              <Gift item={item} key={index} />
            ))}
          </div>
          <div className="request_more">
            <label>
              Request more info about Gift #:
              <input
                type="number"
                onChange={(e) => setGiftId(Number(e.target.value))}
              />
            </label>
            <button onClick={() => requestMore()}>Submit</button>
          </div>
          {isLoadingSpecific == true ? <p>Loading specific gift information...</p> : null}
          <p className="specific_text">{specificGiftText}</p>
        </div>
      ) : null}
    </div>
  );
}

export default ChristmasgiftsPage;
