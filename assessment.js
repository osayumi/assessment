'use strict';
const userNameInput = document.getElementById('user-name');//入力欄
const assessmentButton = document.getElementById('assessment');//診断するボタン
const resultDivided = document.getElementById('result-area');//診断結果を表示
const tweetDivided = document.getElementById('tweet-area');//ツイート機能

userNameInput.onkeydown = event => {
  if (event.key === 'Enter') {
    assessmentButton.onclick();
  }
};

    assessmentButton.onclick = () => {
        const userName = userNameInput.value;
        if (userName.length === 0) { // 名前が空の時は処理を終了する
            return;
        }

  //診断結果を作成して
  //HTMLに表示する
  resultDivided.innerText = '';
  const headerDiv = document.createElement('div');
  headerDiv.setAttribute('class', 'card-header');
  headerDiv.innerText = '診断結果';

  // bodyDivided の作成
  const bodyDivided = document.createElement('div');
  bodyDivided.setAttribute('class', 'card-body');

  const paragraph = document.createElement('p');
  paragraph.setAttribute('class', 'card-text');
  const result = assessment(userName);
  paragraph.innerText = result;
  bodyDivided.appendChild(paragraph);

  // resultDivided に Bootstrap のスタイルを適用する
  resultDivided.setAttribute('class', 'card');
  resultDivided.setAttribute('style', 'max-width: 700px;')

  // headerDiv と bodyDivided を resultDivided に差し込む
  resultDivided.appendChild(headerDiv);
  resultDivided.appendChild(bodyDivided);

  //ツイートボタンを作成し、表示する
  tweetDivided.innerText = '';
  const anchor = document.createElement('a');
  anchor.setAttribute('href', 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('アンタのヨカトコ診断') + '&ref_src=twsrc%5Etfw');
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = 'Tweet #アンタのヨカトコ診断';
  tweetDivided.appendChild(anchor);

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script);
}

const answers = [
  '{userName}のヨカトコはまなざしたい。{userName}に見つめられた人は、気になって仕方がなかばい。',
  '{userName}のヨカトコは声たい。{userName}の特徴的な声は皆を惹きつけ、心に残るとばい。',
  '{userName}のヨカトコは情熱たい。{userName}の情熱に周りの人は感化されるったい。',
  '{userName}のヨカトコは厳しさたい。{userName}の厳しさがものごとをいつも成功に導くばい。',
  '{userName}のヨカトコは知識たい。博識な{userName}を多くの人が頼りにしとるよ。',
  '{userName}のヨカトコはユニークさたい。{userName}だけのその特徴が皆を楽しくするばい。',
  '{userName}のヨカトコは用心深さたい。{userName}の洞察に、多くの人が助けられとるよ。',
  '{userName}のヨカトコは見た目たい。内側から溢れ出る{userName}の良さに皆が気を惹かれとるばい。',
  '{userName}のヨカトコは決断力たい。{userName}がする決断にいつも助けられる人がおるばい。',
  '{userName}のヨカトコは思いやりたい。{userName}に気をかけてもらった多くの人が感謝しとるよ。',
  '{userName}のヨカトコは感受性たい。{userName}が感じたことに皆が共感し、わかりあうことができるたい。',
  '{userName}のヨカトコは節度たい。強引すぎない{userName}の考えに皆が感謝しよるよ。',
  '{userName}のヨカトコは好奇心たい。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映るばい。',
  '{userName}のヨカトコは気配りたい。{userName}の配慮が多くの人を救いよるよ。',
  '{userName}のヨカトコはその全てたい。ありのままの{userName}自身がヨカトコばい。',
  '{userName}のヨカトコは自制心たい。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されとるよ。',
  '{userName}のヨカトコは優しさたい。{userName}の優しい雰囲気や立ち振る舞いに多くの人が癒やされとるよ。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }
  //0から15の範囲までに納める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];
  result = result.replaceAll('{userName}', userName);
  return result;
}
