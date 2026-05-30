let money = 1000;

let hasItem = false;
let level = 0;

let protectTicket = 0;
let protectOn = false;

let potion15 = 0;
let potion2 = 0;
let potion3 = 0;

let activePotion = 1;

function getChance(){

    let chance = 100 - (level * 5);

    chance *= activePotion;

    if(chance > 100){
        chance = 100;
    }

    if(chance < 1){
        chance = 1;
    }

    return Math.floor(chance);
}

function getCost(){
    return 50 + (level * 250);
}

function getSellPrice(){
    return 750 + (level * 500);
}

function buyItem(){

    if(hasItem){
        setMessage("이미 아이템이 있습니다.");
        return;
    }

    if(money < 500){
        setMessage("돈 부족");
        return;
    }

    money -= 500;

    hasItem = true;
    level = 0;

    setMessage("목검 구매 완료");

    updateScreen();
}

function upgrade(){

    if(!hasItem){
        setMessage("아이템 없음");
        return;
    }

    let cost = getCost();

    if(money < cost){
        setMessage("돈 부족");
        return;
    }

    money -= cost;

    let random = Math.random() * 100;

    if(random < getChance()){

        level++;

        setMessage("강화 성공!");

    }else{

        if(protectOn && protectTicket > 0){

            protectTicket--;

            setMessage("실패 방지권 사용!");

        }else{

            if(level > 0){
                level--;
            }

            setMessage("강화 실패!");
        }
    }

    activePotion = 1;

    updateScreen();
}

function sellItem(){

    if(!hasItem){
        return;
    }

    money += getSellPrice();

    hasItem = false;
    level = 0;

    setMessage("판매 완료");

    updateScreen();
}

function buyProtect(amount,price){

    if(money < price){
        setMessage("돈 부족");
        return;
    }

    money -= price;

    protectTicket += amount;

    updateScreen();
}

function toggleProtect(){

    protectOn = !protectOn;

    updateScreen();
}

function buyPotion(multiplier,price){

    if(money < price){
        setMessage("돈 부족");
        return;
    }

    money -= price;

    if(multiplier == 1.5){
        potion15++;
    }

    if(multiplier == 2){
        potion2++;
    }

    if(multiplier == 3){
        potion3++;
    }

    updateScreen();
}

function usePotion(multiplier){

    if(activePotion != 1){
        setMessage("포션 중첩 불가");
        return;
    }

    if(multiplier == 1.5 && potion15 > 0){
        potion15--;
        activePotion = 1.5;
    }

    if(multiplier == 2 && potion2 > 0){
        potion2--;
        activePotion = 2;
    }

    if(multiplier == 3 && potion3 > 0){
        potion3--;
        activePotion = 3;
    }

    updateScreen();
}

function setMessage(text){
    document.getElementById("message").innerText = text;
}

function updateScreen(){

    document.getElementById("money").innerText =
    "돈: " + money + "원";

    if(hasItem){

        document.getElementById("item").innerText =
        "아이템: 낡은 목검";

        document.getElementById("level").innerText =
        "강화 수치: +" + level;

        document.getElementById("chance").innerText =
        "성공 확률: " + getChance() + "%";

        document.getElementById("cost").innerText =
        "강화 비용: " + getCost() + "원";

        document.getElementById("sellPrice").innerText =
        "판매가: " + getSellPrice() + "원";

    }else{

        document.getElementById("item").innerText =
        "아이템: 없음";

        document.getElementById("level").innerText =
        "강화 수치: 없음";

        document.getElementById("chance").innerText =
        "성공 확률: 없음";

        document.getElementById("cost").innerText =
        "강화 비용: 없음";

        document.getElementById("sellPrice").innerText =
        "판매가: 없음";
    }

    document.getElementById("protectCount").innerText =
    "실패 방지권: " + protectTicket + "개";

    document.getElementById("potions").innerText =
    "1.5배:" + potion15 +
    " | 2배:" + potion2 +
    " | 3배:" + potion3;

    document.getElementById("activePotion").innerText =
    activePotion == 1
    ? "적용중인 포션: 없음"
    : "적용중인 포션: " + activePotion + "배";
}

updateScreen();

document.addEventListener("keydown", function(event) {
    if (event.key === "F4") {
        event.preventDefault();

        money += 50000;

        setMessage("치트 발동! 50000원을 획득했습니다.");
        updateScreen();
    }
});