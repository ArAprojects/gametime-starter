import chai from 'chai';
import Turn from '../src/Turn';
import Round from '../src/Round';
import Player from '../src/Player'
import spies from 'chai-spies'
import domUpdates from '../src/domUpdates'
const expect = chai.expect;
chai.use(spies)
chai.spy.on(domUpdates, 'switchPlayer', () => true)

describe('Turn', function () {
  let round;
  let turn;
  let player
  let player2
  beforeEach(function () {
    round = new Round(2)
    turn = new Turn(round)
    player = new Player(1, 'Patrick', 'Wrap It')
    player2 = new Player(2, 'Aidan', 'What up')
  })

  it('should be a function', function () {
    expect(Turn).to.be.a('function');
  });

  it('should instantiate Turn', function () {
    expect(turn).to.be.an.instanceOf(Turn)
  })

  it('should find the answers', function () {
    expect(turn.answers).to.be.an('array').and.have.length(3)
    expect(round.turn.answers[0].surveyId).to.equal(round.surveys[0].id)
  })

  it('should check the guess and increase the score if correct', function() {
    turn.checkGuess(player)
    expect(player.score).to.equal(61)
    turn.checkGuess(player2)
    expect(player2.score).to.equal(0)
  })

  it('should check the guess, and switch the player if incorrect', function () {
    expect(turn.currentPlayer).to.equal(1)
    let player1 = new Player(1, 'Alek', 'hippo')
    turn.checkGuess(player1)
    expect(turn.currentPlayer).to.equal(2)
    turn.checkGuess(player2)
    expect(turn.currentPlayer).to.equal(1)
  })

  it('should slice out the answer if guess correct', function () {
    expect(turn.answers).to.have.length(3)
    turn.checkGuess(player)
    expect(turn.answers).to.have.length(2).and.eql([{ answer: 'Remove Price Tag', respondents: 27, surveyId: 2 },
      { answer: 'Buy It', respondents: 4, surveyId: 2 }])
  })

});