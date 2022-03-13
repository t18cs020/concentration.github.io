
// グローバル

// div要素を格納
var cards = [];
// 開始時間
var startTime;
// 経過秒数用 タイマーID
var timer;
// カードめくり用 タイマーID
var backTimer;
// 1枚目かどうかのフラグ   1枚目: true   2枚目: false
var flgFirst = true;
// 1枚目のカードを格納
var cardFirst;
// そろえた枚数
var countUnit = 0;
//　ペア数
var pairs = 8;
// 試行回数
var countSelect = 0;

window.onload = function(){
    // 数字格納 一時配列
    var arr = [];

    for (var i = 0; i < pairs; i++){
        // ペアの数字を10組
        arr.push(i);
        arr.push(i);
    }
    
    // シャッフル
    shuffle(arr);
    
    var panel = document.getElementById('panel');
    
    // div要素作成
    for (i = 0; i < 2*pairs; i++){
        var div = document.createElement('div');
        div.className = 'card back';
        div.index = i;
        div.number = arr[i];
        div.innerHTML = '';
        div.onclick = turn;
        panel.appendChild(div);
        cards.push(div);
    }
    // 開始時刻を取得
    startTime = new Date();
    // タイマー開始
    startTimer();
    
}

// シャッフル用関数
function shuffle(arr) {
    var n = arr.length;
    var temp, i;

    while (n) {
        i = Math.floor(Math.random() * n--);
        temp = arr[n];
        arr[n] = arr[i];
        arr[i] = temp;
    }
    return arr;
}


// クリック時の処理
function turn(e){
    
    var div = e.target;
    var onsei;

    // カードのタイマー処理が動作中は return
    if (backTimer) return;

    // 裏向きのカードをクリックした場合は数字を表示する
    if (div.innerHTML == ''){
        div.className = 'card';
        div.innerHTML = "✔"; 
        switch (div.number) {
            case 0:
                onsei = new Audio("onsei/number0.mp3");
                break;
            case 1:
                onsei = new Audio("onsei/number1.mp3");
                break;
            case 2:
                onsei = new Audio("onsei/number2.mp3");
                break;
            case 3:
                onsei = new Audio("onsei/number3.mp3");
                break;
            case 4:
                onsei = new Audio("onsei/number4.mp3");
                break;
            case 5:
                onsei = new Audio("onsei/number5.mp3");
                break;
            case 6:
                onsei = new Audio("onsei/number6.mp3");
                break;
            case 7:
                onsei = new Audio("onsei/number7.mp3");
                break;
        }

    }else{
        // 数字が表示されているカードは return
        return;
    }
    
    onsei.play();  // 再生

    // 1枚目の処理
    if (flgFirst){
        // cardFirst は2枚目の処理のときに使う
        cardFirst = div;
        // フラグ変更
        flgFirst = false;
        
    // 2枚目の処理
    }else{
        countSelect++;
        // 数字が1枚目と一致する場合
        if (cardFirst.number == div.number){
            countUnit++;
            // 見えない状態にする
            backTimer = setTimeout(function(){
                div.className = 'card finish';
                cardFirst.className = 'card finish';
                backTimer = NaN;
                
                if (countUnit == 10){
                    clearInterval(timer);  // timer終了
                }
            }, 500)

        // 一致しない場合
        }else{  
            // カードを裏側に戻す
            backTimer = setTimeout(function(){
                div.className = 'card back';
                div.innerHTML = '';
                cardFirst.className = 'card back';
                cardFirst.innerHTML = '';
                cardFirst = null;
                backTimer = NaN;
            }, 500);
        }
        
        flgFirst = true;

    }  

    if(countUnit == pairs){
        var nowTime = new Date();
        var elapsedTime = Math.floor((nowTime - startTime) / 1000);
        var str = 'CLEAR! \nクリア時間は' + elapsedTime + '秒です。\n試行回数は'+ countSelect + '回です。\nもう一度プレイする場合は画面を更新してください。';
        var result = confirm(str);
        if(result) {
            //はいを選んだときの処理
            window.location.relord();
        } else {
            //いいえを選んだときの処理
        }

    }

}

// タイマー開始
function startTimer(){
    timer = setInterval(showSecond, 1000);
}

// 詳細表示
function showSecond(){
    //残り時間
    var nowTime = new Date();
    var elapsedTime = Math.floor((nowTime - startTime) / 1000);
    var str = '経過秒数: ' + elapsedTime + '秒';

    //試行回数
    var str2 = '試行回数: ' + countSelect + '回';

    //残りのペア数
    var remaining = pairs-countUnit
    var str3 = '残りペア数: ' + remaining + '個';
    var re = document.getElementById('result');
    re.innerHTML = str +'<br>'+ str2 +'<br>'+ str3;
}
