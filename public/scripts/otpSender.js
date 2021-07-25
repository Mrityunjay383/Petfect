const otpBtn = $("#otpBtn");
const regBtn = $("#regBtn");
let otp;

otpBtn.on("click", () => {

  const emailId = $("#username").val();
  if(emailId != ""){
    let url = "/auth/sendOtp/"+emailId;

    $.ajax({
      type : 'GET',
      url : url,
      success: function (data) {
        otp = data.otp;
			}
		});


    const alertMessage = "Check OTP on your email Id: "+emailId;
    alert(alertMessage);
    otpBtn.css("display", "none");
  }else{
    alert("Please Fill all the fields");
  }
});

regBtn.on("click", (e) => {
  const otpVal = $("#otp").val();
  console.log(otp);
  if(otpVal != otp){
    e.preventDefault();
    alert("OTP is not correct, try again!!");
    otpBtn.css("display", "inline-block");
  }
});
