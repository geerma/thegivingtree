// Dotenv, Express, and Cors configurations
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
const app = express();

// OpenAI configurations
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    "GET - /": "Root Directory",
    "POST - /christmasgifts": "Christmas Gifts",
    "POST - /christmasevents": "Christmas Activities",
  });
});

app.post("/christmasgifts", async (req, res) => {
  try {

    const gender = req.body.gender
    const profession = req.body.profession
    const hobbies = req.body.hobbies

    const response = await openai.createCompletion({
      model: "text-curie-001",
      prompt: `5 detailed Christmas gift ideas for a ${gender} who is a ${profession} and has the following hobbies: ${hobbies}. Emphasis on Christmas. Give a detailed explanation for each gift`,
      temperature: 0.7,
      max_tokens: 300,
      top_p: 1,
      frequency_penalty: 0.04,
      presence_penalty: 0.02,
    });

    res.status(200).send({
        giftstext: response.data.choices[0].text
    })
  } catch (error) {
    res.status(500).send({error});
  }
});

app.post("/christmasevents", async (req, res) => {
  try {

    let location
    console.log(req.body.location)
    if (req.body.location != "") {
      console.log("Not Empty Location")
      location = "in " + req.body.location
    } else {
      console.log("Empty Location")
      location = ""
    }

    console.log(location)
    
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Suggest 4 Christmas events ideas with detailed explanation ${location}`,
      temperature: 0.7,
      max_tokens: 393,
      top_p: 1,
      frequency_penalty: 0.04,
      presence_penalty: 0.02,
    });

    res.status(200).send({
        eventtext: response.data.choices[0].text
    })
  } catch (error) {
    res.status(500).send({error});
  }
});

app.listen(8080, () => console.log("Server is running on Port 8080"))