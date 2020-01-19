
function check(form){
 // var user=document.getElementById('username');
  //var pw=document.getElementById('pw');
  if (form.username.value=="admin" && form.password.value=="admin"){
window.location="../admin/home.html";
  }
  else{
 window.location="home.html";
  }
 
}