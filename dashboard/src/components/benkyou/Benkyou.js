import React, { Fragment, useContext, useEffect, useState } from "react";

import VocyaApiContext from "../../context/vocya_api/VocyaApiContext";
import Checkbox from "../utils/Checkbox";
import RouteLeavingGuard from "../prompt/RouteLeavingGuard";
import { useHistory } from "react-router-dom";

const Benkyou = () => {
  const vocyaApiContext = useContext(VocyaApiContext);
  const history = useHistory();
  const { words } = vocyaApiContext;

  const allWordsToBenkyou = words;
  const [wordsLeftToBenkyou, setWordsLeftToBenkyou] = useState(words);

  const [japaneseToDutch, setJapaneseToDutch] = useState(true);
  const [showHiragana, setShowHiragana] = useState(true);
  const [randomizeWords, setRandomizeWords] = useState(false);
  const [showAnswersImmediately, setShowAnswersImmediately] = useState(true);

  const [questionWord, setQuestionWord] = useState({});
  const [answerWords, setAnswerWords] = useState([]);
  const [showAnswers, setShowAnswers] = useState(false);
  const [started, setStarted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [done, setDone] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  const generateNewQuestion = () => {
    // remove the question from the words left to benkyou
    // this triggers the generation of a new question and answers
    setWordsLeftToBenkyou(wordsLeftToBenkyou.filter((e) => e !== questionWord));
    setCorrect(false);
  };

  // const generateQuestionAndAnswers = () => {
  useEffect(() => {
    if (!started) return;

    if (wordsLeftToBenkyou.length === 0) {
      setDone(true);
      return;
    }

    // generate the index of the next question (in wordsLeftToBenkyou)
    let newQuestionIndex = 0;
    if (randomizeWords)
      newQuestionIndex = Math.floor(Math.random() * wordsLeftToBenkyou.length);
    const questionWordId = wordsLeftToBenkyou[newQuestionIndex].id;
    setQuestionWord(wordsLeftToBenkyou[newQuestionIndex]);

    // generate the indexes of the answers (in allWordsToBenkyou)
    let newAnswerWords = [wordsLeftToBenkyou[newQuestionIndex]];
    // create a list of potential answers, where the question is filtered out
    let potentialAnswers = allWordsToBenkyou.filter(
      (word) => word.id !== questionWordId
    );
    while (newAnswerWords.length < 4) {
      // bla
      const index = Math.floor(Math.random() * potentialAnswers.length);
      newAnswerWords.push(potentialAnswers[index]);
      potentialAnswers.splice(index, 1); // removes index from the array
    }
    setAnswerWords(
      newAnswerWords
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value)
    );
  }, [allWordsToBenkyou, wordsLeftToBenkyou, randomizeWords, started]);

  const getQuestionCard = () => {
    return (
      <div className="card text-left">
        {japaneseToDutch && <p>日本語：{questionWord.nihongo}</p>}
        {japaneseToDutch && showHiragana && (
          <p>ひらがな：{questionWord.hiragana}</p>
        )}
        {!japaneseToDutch && <p>Dutch: {questionWord.dutch}</p>}
      </div>
    );
  };

  const getAnswerCards = () => {
    let words = [];
    answerWords.forEach((word) => {
      words.push({
        id: word.id,
        card: (
          <div
            className="card text-left"
            style={{ marginBottom: "1em" }}
            onClick={() => onAnswerClicked(word.id)}
          >
            {!japaneseToDutch && <p>日本語：{word.nihongo}</p>}
            {!japaneseToDutch && showHiragana && (
              <p>ひらがな：{word.hiragana}</p>
            )}
            {japaneseToDutch && <p>Dutch: {word.dutch}</p>}
          </div>
        ),
      });
    });
    return words;
  };

  const onAnswerClicked = (wordId) => {
    if (wordId === questionWord.id) {
      setShowAnswers(false);
      setCorrect(true);
    } else {
      setMistakes(mistakes + 1);
      setAnswerWords(answerWords.filter((word) => word.id !== wordId));
    }
  };

  const renderNoWordsToBenkyou = () => {
    return (
      <div>
        No words currently selected to benkyou shimasu (study).
        <br />
        Search for words on one of the courses/chapters/words pages, or show the
        words of a single course/chapter you want to study; and go back to this
        benkyou page.
      </div>
    );
  };

  const renderStarted = () => {
    return (
      <Fragment>
        <RouteLeavingGuard
          when={started}
          navigate={(path) => history.push(path)}
          shouldBlockNavigation={() => started}
          content="Are you sure you want to leave 勉強(study)?"
        />
        <div>
          Words left to benkyou shimasu: [ {wordsLeftToBenkyou.length} /{" "}
          {allWordsToBenkyou.length} ]
        </div>
        {done ? (
          <div>
            Studied {allWordsToBenkyou.length} words while making {mistakes}{" "}
            mistakes.
          </div>
        ) : correct ? (
          <div
            className="btn btn-block text-center"
            onClick={() => generateNewQuestion()}
          >
            Correct! Next question
          </div>
        ) : (
          <Fragment>
            <div>Question:</div>
            <div>{getQuestionCard()}</div>
            <div>Answers:</div>
            {showAnswersImmediately || showAnswers ? (
              <div>
                {getAnswerCards().map((word) => (
                  <div key={word.id}>{word.card}</div>
                ))}
              </div>
            ) : (
              <div
                className="btn btn-block text-center"
                onClick={() => setShowAnswers(true)}
              >
                Show answers
              </div>
            )}
          </Fragment>
        )}
      </Fragment>
    );
  };

  const renderStart = () => {
    return (
      <Fragment>
        <div>Words to benkyou shimasu: {wordsLeftToBenkyou.length}</div>
        <div
          className="btn btn-block text-center"
          onClick={() => setStarted(true)}
        >
          Start benkyou shimasu!
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div className="object-grid grid-fit">
        <div
          className="btn btn-block"
          onClick={() => setJapaneseToDutch(!japaneseToDutch)}
        >
          {japaneseToDutch ? "Japanese -> Dutch" : "Dutch -> Japanese"}
        </div>
        <Checkbox
          text="Show hiragana"
          update={(checked) => setShowHiragana(checked)}
          defaultValue={showHiragana}
        />
        <Checkbox
          text="Show answers immediately"
          update={(checked) => setShowAnswersImmediately(checked)}
          defaultValue={showAnswersImmediately}
        />
        <Checkbox
          text="Randomize words"
          update={(checked) => setRandomizeWords(checked)}
          defaultValue={randomizeWords}
        />
      </div>
      {allWordsToBenkyou.length === 0
        ? renderNoWordsToBenkyou()
        : started
        ? renderStarted()
        : renderStart()}
    </Fragment>
  );
};

export default Benkyou;
