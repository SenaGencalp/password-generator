const pwEl = document.getElementById("pw"); //pwEl: Şifrenin görüntüleneceği eleman.
const copyEl = document.getElementById("copy"); //copyEl: Şifreyi kopyalamak için buton.
const lenEl = document.getElementById("len"); //lenEl: Şifre uzunluğunu belirlemek için input alanı.
const upperEl = document.getElementById("upper"); //upperEl,lowerEl,numberEl,symbolEl:Büyük harf, küçük harf, rakam ve sembol içerecek mi sorusunu belirlemek için checkbox'lar.
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");
//Şifre oluşturmak için kullanılacak karakter kümeleri tanımlanıyor: upperLetters: Büyük harfler. lowerLetters: Küçük harfler. numbers: Rakamlar. symbols: Semboller.
const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

//Bu fonksiyonlar, belirli bir karakter kümesinden rastgele bir karakter seçer ve döner.
function getLowercase() {
  return lowerLetters[Math.floor(Math.random() * lowerLetters.length)];
}

function getUppercase() {
  return upperLetters[Math.floor(Math.random() * upperLetters.length)];
}

function getNumber() {
  return numbers[Math.floor(Math.random() * numbers.length)];
}

function getSymbol() {
  return symbols[Math.floor(Math.random() * symbols.length)];
}
//Bu fonksiyon şifreyi oluşturur: Kullanıcının belirlediği şifre uzunluğunu lenEl.value ile alır. Boş bir şifre değişkeni tanımlar. Seçilen karakter türlerine göre (büyük harf, küçük harf, rakam, sembol) en az bir karakter ekler. Şifrenin geri kalan kısmını tamamlamak için rastgele karakterler ekler (generateX fonksiyonu ile).
function generatePassword() {
  const len = lenEl.value;

  let password = "";

  if (upperEl.checked) {
    password += getUppercase();
  }

  if (lowerEl.checked) {
    password += getLowercase();
  }

  if (numberEl.checked) {
    password += getNumber();
  }

  if (symbolEl.checked) {
    password += getSymbol();
  }

  for (let i = password.length; i < len; i++) {
    const x = generateX();
    password += x;
  }

  pwEl.innerText = password;
}
//Bu fonksiyon, seçili karakter türlerinden rastgele birini döner.
function generateX() {
  const xs = [];
  if (upperEl.checked) {
    xs.push(getUppercase());
  }

  if (lowerEl.checked) {
    xs.push(getLowercase());
  }

  if (numberEl.checked) {
    xs.push(getNumber());
  }

  if (symbolEl.checked) {
    xs.push(getSymbol());
  }

  if (xs.length === 0) return "";

  return xs[Math.floor(Math.random() * xs.length)];
}
//generateEl butonuna tıklandığında generatePassword fonksiyonu çalışır ve şifre oluşturulur. copyEl butonuna tıklandığında oluşturulan şifre kopyalanır. Bunun için geçici bir textarea oluşturulur, şifre bu alana yazılır, seçilir ve kopyalanır, ardından textarea silinir ve kullanıcıya bir bildirim gösterilir.
generateEl.addEventListener("click", generatePassword);

copyEl.addEventListener("click", () => {
  const textarea = document.createElement("textarea");
  const password = pwEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
  alert("Password copied to clipboard");
});
