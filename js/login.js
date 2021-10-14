let v1 = false,
  v2 = false;
EDsubbtn();

function getInputVals(a1, a2, a3, a4) {
  var text = document.querySelector("form #" + a1).value;
  if (!a2.test(text)) {
    $("#" + a4).html(a3);
    $("#" + a4).addClass("alert-danger");
    $("#" + a1).addClass("addRed");
    $("#" + a1).removeClass("addGreen");
    if (a1 == "email") v1 = false;
    if (a1 == "password") v2 = false;
  } else {
    $("#" + a4).removeClass("alert-danger");
    $("#" + a4).empty();
    $("#" + a1).addClass("addGreen");
    $("#" + a1).removeClass("addRed");
    if (a1 == "email") v1 = true;
    if (a1 == "password") v2 = true;
  }
  EDsubbtn();
}
$("form #email").keyup(function () {
  var regx =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  getInputVals(
    "email",
    regx,
    "Email should be valid. EG: example@example.com",
    "er1"
  );
});

$("form #password").keyup(function () {
  var regx = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  getInputVals(
    "password",
    regx,
    "Password shuld be [7 to 15 characters which contain at least one numeric digit and a special character].",
    "er2"
  );
});

function EDsubbtn() {
  if (v1 == true && v2 == true) {
    document.querySelector("#LoginSub").disabled = false;
  } else {
    document.querySelector("#LoginSub").disabled = true;
  }
}

function sendlogin() {
  let email = document.getElementById("email").value;
  console.log(email);

  let pass = document.getElementById("password").value;
  console.log(pass);

  var admin = $("#myadmin:checked").val();
  console.log(admin);

  let dat = {
    login: 10,
    userid: email,
    password: pass,
  };

  $.ajax({
    url: "https://b135-106-208-18-231.ngrok.io/video/login.php",
    method: "POST",
    data: dat,
    success: function (data) {
      data = JSON.parse(data);
      let dt = data;
      console.log(dt);
      // console.log(dt[0].userID);

      // if (dt[0].userID == email) {
      if (dt == 1) {
        alert(" User not found!");
      } else if (dt == 2) {
        alert("Password is incorrect!");
      }
      else if (
        admin == "admin" &&
        email == "admin179@cool.com" &&
        pass == "Raaky#356" &&
        dt[0].userID == email
      ) {
        alert("Admin Login successfully");
        window.location.href = `../admin.html?admin-id=${email}&account-no=${dt[0].account_no}`;
      } else if (admin == undefined && dt[0].userID == email) {
        alert("Login successfully!");
        window.location.href = `../dashboard.html?user-id=${email}&account-no=${dt[0].account_no}`;
      } else if (
        admin == "admin" &&
        email != "admin179@cool.com"
      ) {
        alert(
          "You are not admin! please uncheck the admin box and try login with normal user..."
        );
      } else {
        alert(" Http request or Network Error!");
      }
    },
  });
}

$("#LoginSub").on("click", function () {
  sendlogin();
});
