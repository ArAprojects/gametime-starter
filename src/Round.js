import data from "../data";

class Round {
  constructor () {
    this.surveys = (this.pullSurveys());
  }
  pullSurveys() {
    const randomSurveys = []
    const randomSurveyID = Math.floor(Math.random() * (14 - 2 + 1)) + 2;
    let survey1 = data.surveys.find(survey => survey.id === randomSurveyID)
    let survey2 = data.surveys.find(survey => survey.id === randomSurveyID - 1)
    let survey3 = data.surveys.find(survey => survey.id === randomSurveyID + 1)
    randomSurveys.push(survey1, survey2, survey3);
    return randomSurveys
  }
}

export default Round