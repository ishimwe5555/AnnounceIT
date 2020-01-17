function check(form)/*function to check userid & password*/
{
 /*the following code checkes whether the entered userid and password are matching*/
 if(form.username.value == "admin" && form.password.value == "admin")
  {
    window.open('admin/admin-view.html')/*opens the target page while Id & password matches*/
  }
 else
 {
   alert("Error Password or Username")/*displays error message*/
  }
}